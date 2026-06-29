namespace backend.Core.Entities
{
    public class MM_US_MT
    {
       
        public string User_Id { get; set; } = string.Empty;
        public string Hash_Pass { get; set; } = string.Empty;
        public string User_Type_Code { get; set; } = string.Empty;
        
        public string? Token { get; set; }
        public DateTime? Token_Generated_At { get; set; }
         public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
    public class DepartmentUsers
    {
       
        public string UserId { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string? Token { get; set; }
        public DateTime? Token_Generated_At { get; set; }
         public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}