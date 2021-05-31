using System;
using System.Collections.Generic;

namespace data_migration
{
    public class PersonMigration
    {
        private readonly PersonMigrationResult result;

        public PersonMigration()
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
                    sql += line + ", ";
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
                var skinColor = li[11].ReadString().PreValidateSkinColor();
                if (!skinColor.ValidateSkinColor(row)) return "";

                var gender = li[12].ReadString();
                if (!gender.ValidateGender(row)) return "";

                var maritalStatus = li[25].ReadString().PreValidateMaritalStatus();
                if (!maritalStatus.ValidateMaritalStatus(row)) return "";

                var schoolTraining = li[26].ReadString().PreValidateSchoolTraining();
                if (!schoolTraining.ValidateSchoolTraining(row)) return "";

                var cardNumber = li[3].ReadString();
                if (!cardNumber.ValidateList(CardNumbers, row, "Número Cadastro"))
                {
                    result.RepeatedNumbers++;
                    return "-1";
                }

                var name = li[4].ReadString();

                if (name == "null" || name.Length <= 5)
                {
                    result.EmptyLines++;
                    Console.WriteLine($"Linha {row} - Nome vazio");
                    return "-1";
                }

                if (!name.ValidateList(Names, row, "Nome"))
                {
                    result.RepeatedNames++;
                    return "-1";
                }

                CardNumbers.Add(cardNumber);
                Names.Add(name);

                string homelessSince = "null";
                int homelessDays = li[15].ReadString().CalculateHomelessDays();
                if (homelessDays != -1)
                {
                    homelessSince = "'" + DateTime.Now.Date.AddDays(-homelessDays).ToString("yyyy-MM-dd") + "'";
                }

                return "(" +
                    $"{li[2].ReadBool()}," + // Preferential
                    $"{cardNumber}," + // CardNumber
                    $"{name}," + // Name
                    $"{li[5].ReadString()}," + // SocialName
                    $"{li[6].ReadDate()}," + // BirthDate
                    $"{li[9].ReadString()}," + // MotherName
                    $"{li[10].ReadString()}," + // BirthPlace
                    (skinColor.Replace("'", "").Equals("null") ? "null," : $"(select id from skin_colors where SkinColor = {skinColor}),") + // skin_color
                    (gender.Replace("'", "").Equals("null") ? "null," : $"(select id from genders where Gender = {gender}),") + // gender
                    $"{li[13].ReadInt()}," + // Childrens
                    $"{li[14].ReadBool()}," + // HasHabitation
                    $"{li[15].ReadString()}," + // HomelessTime
                    $"{homelessSince}," + // HomelessSince
                    $"{li[16].ReadBool()}," + // HasEmergencyAid
                    $"{li[17].ReadBool()}," + // HasPbhBasket
                    $"{li[18].ReadBool()}," + // HasUniqueRegister
                    $"{li[19].ReadBool()}," + // HasGeneralRegister
                    $"{li[20].ReadString()}," + // GeneralRegister
                    $"{li[21].ReadBool()}," + // HasCpf
                    $"{li[22].ReadString()}," + // Cpf
                    $"{li[23].ReadBool()}," + // HasCtps
                    $"{li[24].ReadBool()}," + // HasBirthCertificate
                    (maritalStatus.Replace("'", "").Equals("null") ? "null," : $"(select id from marital_statuses where MaritalStatus = {maritalStatus}),") + // marital_status
                    (schoolTraining.Replace("'", "").Equals("null") ? "null," : $"(select id from school_trainings where SchoolTraining = {schoolTraining}),") + // school_training
                    $"{li[30].ReadLongString()}," + // ReferenceLocation
                    $"{li[31].ReadString()}," + // Occupation
                    $"{li[32].ReadString()}," + // Profession
                    $"{li[33].ReadString()}," + // ContactPhone
                    $"{li[34].ReadString()}," + // ReferenceAddress
                    $"{li[35].ReadLongString()}" + // Observation
                ")";
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
