namespace backend.Core.Entities
{
    public class MM_US_MT
    {
       
        public string User_Id { get; set; } = string.Empty;
        public string User_Pass { get; set; } = string.Empty;
        public string? Hash_Pass { get; set; }
    }
}