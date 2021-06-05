using System;
using System.Collections.Generic;

namespace data_migration
{
    public class EntranceMigration
    {
        private List<string> dates;
        private EntranceMigrationResult result;

        private int nameColumn = 2;

        private static string header = "insert into person_entrances (person, datetime)";

        public EntranceMigration(int nameColumn)
        {
            result = new EntranceMigrationResult()
            {
                EmptyLines = 0,
                ImportedLines = 0,
                Query = ""
            };
            dates = new List<string>();
            this.nameColumn = nameColumn;
        }

        public EntranceMigrationResult Do(List<List<string>> m)
        {
            ReadHeader(m);

            var sql = "";

            for (int i = 1; i < m.Count; i++)
            {
                if (m[i][nameColumn] == "")
                {
                    result.EmptyLines++;
                    Console.WriteLine($"Linha {i} - Nome vazio");
                }
                else
                {
                    var temp = DoLine(m[i]);
                    if (string.IsNullOrWhiteSpace(temp))
                    {
                        result.EmptyLines++;
                        Console.WriteLine($"Linha {i} - Nenhuma entrada");
                    }
                    else
                    {
                        result.ImportedLines++;
                        sql += header + " values " + (temp.Substring(0, temp.Length - 2) + ";").Sanitize();
                    }
                }
            }

            sql = (sql.Substring(0, sql.Length - (sql.EndsWith("values ") ? 0 : 2)) + ";").Sanitize();
            sql += " update person_entrances set published_at = now(), created_at = now(), updated_at = now() where published_at is null;";
            result.Query = sql;
            return result;
        }

        public string DoLine(List<string> li)
        {
            string sql = "";
            for (int i = nameColumn + 1; i < li.Count; i++)
            {
                if (li[i] != "")
                    sql += $"((select id from people where name like {li[nameColumn].ReadString()} order by id limit 1), '{dates[i - (nameColumn + 1)]}'), ";
            }
            return sql;
        }

        private void ReadHeader(List<List<string>> m)
        {
            int i = nameColumn + 1;
            while (i < m[0].Count)
                dates.Add(m[0][i++]);
        }
    }
}