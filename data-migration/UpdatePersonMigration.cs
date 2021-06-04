using System;
using System.Collections.Generic;

namespace data_migration
{
    public class UpdatePersonMigration
    {
        private readonly PersonMigrationResult result;

        public UpdatePersonMigration()
        {
            result = new PersonMigrationResult()
            {
                EmptyLines = 0,
                ImportedLines = 0,
                Query = "",
                RepeatedNames = 0,
                RepeatedNumbers = 0
            };
        }

        private static string header =
            "insert into people (" +
                "Preferential, " +
                "CardNumber, " +
                "Name, " +
                "SocialName, " +
                "BirthDate, " +
                "MotherName, " +
                "BirthPlace, " +
                "skin_color, " +
                "gender, " +
                "Childrens, " +
                "HasHabitation, " +
                "HomelessTime, " +
                "HomelessSince, " +
                "HasEmergencyAid, " +
                "HasPbhBasket, " +
                "HasUniqueRegister, " +
                "HasGeneralRegister, " +
                "GeneralRegister, " +
                "HasCpf, " +
                "Cpf, " +
                "HasCtps, " +
                "HasBirthCertificate, " +
                "marital_status, " +
                "school_training, " +
                "ReferenceLocation, " +
                "Occupation, " +
                "Profession, " +
                "ContactPhone, " +
                "ReferenceAddress, " +
                "Observation" +
            ")";

        private List<string> CardNumbers;
        private List<string> Names;

        public PersonMigrationResult Do(List<List<string>> m)
        {
            var sql = header + " values ";
            var row = 0;
            Names = new List<string>();
            CardNumbers = new List<string>();
            foreach (var p in m)
            {
                var line = DoLine(p, ++row);
                if (line == "-1") continue;
                else if (!string.IsNullOrWhiteSpace(line))
                {
                    result.ImportedLines++;
                    sql += line + "; ";
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("FALHA AO IMPORTAR");
                    result.Query = "FAILED";
                    return result;
                }
                if (row > 0 && row % 500 == 0)
                {
                    sql = (sql.Substring(0, sql.Length - 2) + ";").Sanitize();
                    sql += header + " values ";
                }
            }
            sql = (sql.Substring(0, sql.Length - (sql.EndsWith("values ") ? 0 : 2)) + ";").Sanitize();
            sql += "update people set published_at = now(), created_at = now(), updated_at = now();";
            result.Query = sql;
            return result;
        }

        private string DoLine(List<string> li, int row)
        {
            try
            {
                if (li.Count < 11)
                    Console.WriteLine($"Linha {row}: - {li.Count}");

                var skinColor = li[11].ReadString().PreValidateSkinColor();
                if (!skinColor.ValidateSkinColor(row)) return "";

                var gender = li[12].ReadString();
                if (!gender.ValidateGender(row)) return "";

                var maritalStatus = li[25].ReadString().PreValidateMaritalStatus();
                if (!maritalStatus.ValidateMaritalStatus(row)) return "";

                var schoolTraining = li[26].ReadString().PreValidateSchoolTraining();
                if (!schoolTraining.ValidateSchoolTraining(row)) return "";

                var cardNumber = li[3].ReadString();
                var isRepeated = false;
                if (!cardNumber.ValidateList(CardNumbers, row, "Número Cadastro"))
                {
                    result.RepeatedNumbers++;
                    isRepeated = true;
                }

                var name = li[4].ReadString();

                if (name == "null" || name.Length <= 5)
                {
                    result.EmptyLines++;
                    Console.WriteLine($"Linha {row} - Nome vazio ({name}) - {string.Join(";", li)}");
                    return "-1";
                }

                var s = "-1";

                if (!name.ValidateList(Names, row, "Nome"))
                {
                    result.RepeatedNames++;
                    s = $"update people set CardNumber = {cardNumber} where name like {name} ";
                }
                
                CardNumbers.Add(cardNumber);
                Names.Add(name);

                return s;
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"Linha {row} - Exception: {ex.Message} - {ex.StackTrace}");
                return "";
            }
        }
    }
}
