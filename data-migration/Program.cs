using System;
using System.IO;

namespace data_migration
{
    public class Program
    {
        static void Main(string[] args)
        {
            char separator = args[1].EndsWith("tsv") ? '\t' : ',';

            /*if (args[0] == "person" && args[1] == "repeated")
            {
                separator = args[2].EndsWith("tsv") ? '\t' : ',';
                var m = Util.ReadCsv(args[2], separator, 1);
                var s = new RepeatedPersonMigration().Do(m);

                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine($"Importados - {s.ImportedLines}");
                Console.WriteLine($"Nomes vazios - {s.EmptyLines}");
                Console.WriteLine($"Nomes repetidos - {s.RepeatedNames}");
                Console.WriteLine($"Números repetidos - {s.RepeatedNumbers}");
                File.WriteAllText(args[2].Replace("tsv", "sql").Replace("csv", "sql"), s.Query);
            }*/
            if (args[0] == "person" && args[1] == "update")
            {
                separator = args[2].EndsWith("tsv") ? '\t' : ',';
                var m = Util.ReadCsv(args[2], separator, 1);
                var s = new UpdatePersonMigration().Do(m);

                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine($"Importados - {s.ImportedLines}");
                Console.WriteLine($"Nomes vazios - {s.EmptyLines}");
                Console.WriteLine($"Nomes repetidos - {s.RepeatedNames}");
                Console.WriteLine($"Números repetidos - {s.RepeatedNumbers}");
                File.WriteAllText(args[2].Replace("tsv", "sql").Replace("csv", "sql"), s.Query);
            }
            else if (args[0] == "person")
            {
                var m = Util.ReadCsv(args[1], separator, 1);
                var s = new PersonMigration().Do(m);

                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine($"Importados - {s.ImportedLines}");
                Console.WriteLine($"Nomes vazios - {s.EmptyLines}");
                Console.WriteLine($"Nomes repetidos - {s.RepeatedNames}");
                Console.WriteLine($"Números repetidos - {s.RepeatedNumbers}");
                File.WriteAllText(args[1].Replace("tsv", "sql").Replace("csv", "sql"), s.Query);
            }
            else if (args[0] == "entrance")
            {
                var m = Util.ReadCsv(args[1], separator, 0);
                int c = int.Parse(args[2]);
                var s = new EntranceMigration(c).Do(m);

                Console.ForegroundColor = ConsoleColor.White;

                Console.WriteLine($"Importados - {s.ImportedLines}");
                Console.WriteLine($"Linhas vazias - {s.EmptyLines}");

                File.WriteAllText(args[1].Replace("tsv", "sql").Replace("csv", "sql"), s.Query);
            }
            else if (args[0] == "service")
            {
                var m = Util.ReadCsv(args[1], separator, 1);

                var s = new ServiceMigration().Do(m);

                Console.ForegroundColor = ConsoleColor.White;

                Console.WriteLine($"Importados - {s.ImportedLines}");
                Console.WriteLine($"Linhas vazias - {s.EmptyLines}");

                File.WriteAllText(args[1].Replace("tsv", "sql").Replace("csv", "sql"), s.Query);
            }
        }
    }
}
