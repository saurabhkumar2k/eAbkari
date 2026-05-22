namespace backend.Core.Entities
{
    public class MstUsReg1
    {
       
       public string UserId { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
       
        public string? Token { get; set; }
        public DateTime? Token_Generated_At { get; set; }
         public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}