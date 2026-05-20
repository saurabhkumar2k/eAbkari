namespace backend.Core.Entities
{
    public class MM_US_MT
    {
       
        public string User_Id { get; set; } = string.Empty;
        public string User_Pass { get; set; } = string.Empty;
        public string? Hash_Pass { get; set; }
        public string? Token { get; set; }
        public DateTime? Token_Generated_At { get; set; }
         public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}