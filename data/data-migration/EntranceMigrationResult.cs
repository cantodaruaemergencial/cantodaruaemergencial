namespace data_migration
{
    public class EntranceMigrationResult
    {
        public int EmptyLines { get; set; }
        public int ImportedLines { get; set; }
        public string Query { get; set; }
    }
}