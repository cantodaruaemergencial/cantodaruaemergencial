using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace data_migration
{
    public static class Util
    {
        public static List<List<string>> ReadCsv(string path, char separator, int skip)
        {
            var ls = File.ReadAllLines(path);
            var csv = (from li in ls select (li.Split(separator).ToList())).Skip(skip).ToList();
            return csv;
        }

        public static string Sanitize(this string s) =>
            s.Replace(Environment.NewLine, string.Empty);

        public static string ReadDate(this string s)
        {
            if (string.IsNullOrEmpty(s) || s.IndexOf("/") == -1) return "null";
            var d = s.Split("/").Select(o => int.Parse(o)).ToArray();
            if (d.Length != 3) return "null";
            try
            {
                var dt = new DateTime(d[2], d[1], d[0]);
                return $"'{d[2]}-{d[1]}-{d[0]}'";
            }
            catch
            {
                try
                {
                    var dt = new DateTime(d[2], d[0], d[1]);
                    return $"'{d[2]}-{d[0]}-{d[1]}'";
                }
                catch
                {
                    return "null";
                }
            }
        }

        public static string ReadString(this string s)
        {
            if (s.Length > 0 && s[s.Length - 1] == ';')
                s = s.Substring(0, s.Length - 1);
            if (s.Length > 0 && s[s.Length - 1] == '.')
                s = s.Substring(0, s.Length - 1);
            s = s.Replace("'", "\\'");
            return string.IsNullOrWhiteSpace(s) ? "null" : $"'{s.Trim()}'";
        }

        public static string ReadLongString(this string s) =>
            string.IsNullOrWhiteSpace(s) ? "null" : $"'{s.Replace("'", "\\'")}'";

        public static string ReadBool(this string s) =>
            s.ToLower() == "s" ? "1" : "0";

        public static string ReadInt(this string s)
        {
            if (int.TryParse(s, out int r))
                return r.ToString();
            return "null";
        }

        public static bool IsInt(this string s) => int.TryParse(s, out int r);

        public static string SpellingCheck(this string s, List<(string, string)> cs)
        {
            foreach (var c in cs)
                s = Regex.Replace(s, @$"\b{c.Item1}\b", c.Item2, RegexOptions.IgnoreCase);

            return s;
        }

        public static string RemoveExtraInformation(this string s)
        {
            var i = s.IndexOf(" - ");
            if (i > -1)
                s = s.Substring(0, i);
            return s;
        }

        public static string ToMasculineVersion(this string s)
        {
            if (s.EndsWith("a"))
                s = s.Substring(0, s.Length - 1) + "o";
            else if (s.EndsWith("A"))
                s = s.Substring(0, s.Length - 1) + "O";
            return s;
        }

        public static bool IsNullExpression(this string s) =>
            s.ToLower().Equals("s/i") ||
            s.ToLower().Equals("não informou") ||
            s.ToLower().Equals("não");

        public static int CalculateHomelessDays(this string s)
        {
            s = s.Replace("'", "").ToLower().TrimEnd();

            int d = s.CalculateHomelessDays(1, "dias", "dia");
            if (d != -1) return d;

            d = s.CalculateHomelessDays(7, "semanas", "semana");
            if (d != -1) return d;

            d = s.CalculateHomelessDays(30, "meses", "mes", "mês");
            if (d != -1) return d;

            d = s.CalculateHomelessDays(365, "anos", "ano");
            if (d != -1) return d;

            return -1;
        }

        private static int CalculateHomelessDays(this string s, int factor, params string[] ends)
        {
            foreach (var e in ends)
            {
                if (s.EndsWith(e))
                {
                    s = s.Replace(e, "");
                    return int.TryParse(s, out int i) ? i * factor : -1;
                }
            }
            return -1;
        }
    }
}