using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace data_migration
{
    public static class Validation
    {

        public static string PreValidateSkinColor(this string s)
        {
            s = s.Replace("'", "").SpellingCheck(new List<(string, string)>(){
                ("pardo", "parda"),
            });
            return $"'{s}'";
        }

        public static bool ValidateSkinColor(this string s, int row) =>
            s.Validate(row, "cor/raça", new string[] { "null", "branca", "preta", "parda", "indígena", "outras" });

        public static bool ValidateGender(this string s, int row) =>
            s.Validate(row, "sexo", new string[]
            { "null", "feminino", "masculino", "outros" });

        public static string PreValidateMaritalStatus(this string s)
        {
            s = s.Replace("'", "").ToMasculineVersion().SpellingCheck(new List<(string, string)>(){
                ("viuvo", "viúvo"),
                ("estavel", "estável"),
                ("soleiro", "solteiro"),
                ("soteiro", "solteiro"),
                ("csado", "casado"),
            });

            if (s.IsNullExpression()) return "null";

            return $"'{s}'";
        }

        public static bool ValidateMaritalStatus(this string s, int row) =>
            s.Validate(row, "estado civil", new string[]
            { "null", "solteiro", "casado", "viúvo", "divorciado", "separado", "união estável", "amasiado" });

        public static string PreValidateSchoolTraining(this string s)
        {
            s = s.Replace("'", "").RemoveExtraInformation().SpellingCheck(new List<(string, string)>(){
                ("fundamnetal", "fundamental"),
                ("fundametal", "fundamental"),
                ("fundameltal", "fundamental"),
                ("fudamental", "fundamental"),
                ("medio", "médio"),
                ("superio", "superior"),
                ("não assina", "analfabeto"),
                ("fundamentlincompleto", "fundamental incompleto"),
                ("fundental", "fundamental"),
                ("fundamntal", "fundamental"),
                ("inconpleto", "incompleto")
            });

            if (s.ToLower().StartsWith("ensino "))
                s = Regex.Replace(s, "ensino ", "", RegexOptions.IgnoreCase);

            if (s.ToLower().Equals("fundamental"))
                s = "Fundamental Completo";

            if (s.IsNullExpression()) return "null";
            return $"'{s}'";
        }

        public static bool ValidateSchoolTraining(this string s, int row) =>
            s.Validate(row, "formação escolar", new string[]
            { "null", "analfabeto", "assina o nome", "fundamental incompleto", "fundamental completo",
            "médio incompleto", "médio completo", "superior incompleto", "superior completo", "outros"});

        public static bool ValidateList(this string s, List<string> list, int row, string field)
        {
            if (list.Any(s1 => s1.ToLower() == s.ToLower()))
            {
                var row1 = list.IndexOf(list.FirstOrDefault(s1 => s1.ToLower() == s.ToLower())) + 1;
                Console.WriteLine($"Linha {row} - {field} ({s}) repetido nas linhas {row} e {row1}");
                return false;
            }
            return true;
        }

        private static bool Validate(this string s, int row, string field, string[] avaibles)
        {
            if (!avaibles.Any(s1 => s1.ToLower() == s.ToLower().Replace("'", "")))
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"Linha {row} - {field} inválido: {s.ToLower()}");
                return false;
            }
            return true;
        }
    }
}