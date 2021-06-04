using System;
using System.Collections.Generic;

namespace data_migration
{
    public class ServiceMigration
    {

        private ServiceMigrationResult result;

        public ServiceMigration()
        {
            result = new ServiceMigrationResult();
        }

        private static string header =
            "insert into service_attendances (service, Date, Attendances) ";

        private static string sub_query(string name) =>
            $"(select id from services where service = '{name}')";

        private static string barreira_sanitaria = sub_query("Barreira Sanitária");
        private static string guarda_volume = sub_query("Guarda Volume");
        private static string banheiro_f_b = sub_query("Banheiro Feminino Banho");
        private static string banheiro_f_s = sub_query("Banheiro Feminino Sanitário");
        private static string banheiro_m_b = sub_query("Banheiro Masculino Banho");
        private static string banheiro_m_s = sub_query("Banheiro Masculino Sanitário");
        private static string enfermagem = sub_query("Enfermagem");
        private static string lavanderia = sub_query("Lavanderia");
        private static string lanche = sub_query("Lanche");

        public ServiceMigrationResult Do(List<List<string>> m)
        {
            var sql = header + " values ";
            var row = 0;
            foreach (var p in m)
            {
                if (!ValidateLine(p))
                {
                    result.EmptyLines++;
                    Console.WriteLine($"Linha {row} - Vazia");
                }
                else
                {
                    result.ImportedLines++;
                    if (p[1].IsInt()) sql += $"({barreira_sanitaria}, '{p[0]}', {p[1]}), ";
                    if (p[2].IsInt()) sql += $"({guarda_volume}, '{p[0]}', {p[2]}), ";
                    if (p[3].IsInt()) sql += $"({banheiro_f_b}, '{p[0]}', {p[3]}), ";
                    if (p[4].IsInt()) sql += $"({banheiro_f_s}, '{p[0]}', {p[4]}), ";
                    if (p[5].IsInt()) sql += $"({banheiro_m_b}, '{p[0]}', {p[5]}), ";
                    if (p[6].IsInt()) sql += $"({banheiro_m_s}, '{p[0]}', {p[6]}), ";
                    if (p[7].IsInt()) sql += $"({enfermagem}, '{p[0]}', {p[7]}), ";
                    if (p[8].IsInt()) sql += $"({lavanderia}, '{p[0]}', {p[8]}), ";
                    if (p[9].IsInt()) sql += $"({lanche}, '{p[0]}', {p[9]}), ";
                }
                row++;
            }

            sql = (sql.Substring(0, sql.Length - (sql.EndsWith("values ") ? 0 : 2)) + ";").Sanitize();
            sql += " update service_attendances set published_at = now(), created_at = now(), updated_at = now();";
            result.Query = sql;
            return result;
        }

        private bool ValidateLine(List<string> p) =>
            (p[1] != "" && p[1] != "-") ||
            (p[2] != "" && p[2] != "-") ||
            (p[3] != "" && p[3] != "-") ||
            (p[4] != "" && p[4] != "-") ||
            (p[5] != "" && p[5] != "-") ||
            (p[6] != "" && p[6] != "-") ||
            (p[7] != "" && p[7] != "-") ||
            (p[8] != "" && p[8] != "-") ||
            (p[9] != "" && p[9] != "-");
    }
}