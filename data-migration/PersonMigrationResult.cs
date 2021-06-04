namespace data_migration
{
    public class PersonMigrationResult
    {
        public int EmptyLines { get; set; }
        public int RepeatedNames { get; set; }
        public int RepeatedNumbers { get; set; }
        public int ImportedLines { get; set; }
        public string Query { get; set; }
    }
}