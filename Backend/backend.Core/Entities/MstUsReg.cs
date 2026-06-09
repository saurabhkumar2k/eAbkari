

using System.ComponentModel.DataAnnotations;

public class MstUsReg
{
    public long RegId { get; set; }
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    [Required]
    public string? FatherHusbandName { get; set; }
    [Required]
    public DateTime? DateOfBirth { get; set; }
    [Required]
    public string? Gender { get; set; }
    [Required]
    public string? Occupation { get; set; }
    [Required]
    public string? AddressLine1 { get; set; }
   
    public string? AddressLine2 { get; set; }
    [Required]
    public string? City { get; set; }
    [Required]
    public string? StateUT { get; set; }
    [Required]
    public string? District { get; set; }
    [Required]
    [StringLength(6, MinimumLength = 6, ErrorMessage = "PIN must be 6 digits")]
    public string? PIN { get; set; }
    [Required]
    [Phone]
    [StringLength(10, MinimumLength = 10, ErrorMessage = "Mobile number must be 10 digits")]
    public string? Mobile { get; set; }
    public string? Fax { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(256, ErrorMessage = "Email address is too long")]
    public string? Email { get; set; }
    public int? SecretQuestionId { get; set; }

   
    public string? SecretAnswer { get; set; }
    public string? RegBy { get; set; }
    public string? RegIP { get; set; }

    public string? UserId { get; set; }= string.Empty;

    // public byte[]? Photo { get; set; }

     public string? Photo { get; set; }

     public string? Token { get; set; }
     public DateTime? Token_Generated_At { get; set; }
     public string? RefreshToken { get; set; }
     public DateTime? RefreshTokenExpiry { get; set; }
public string? Password { get; set; }

    public bool? IsPunishableOffence { get; set; }

    [Required]
    public string? SubDivision { get; set; }
    [Required]
    [RegularExpression(@"^[A-Z]{5}[0-9]{4}[A-Z]{1}$", ErrorMessage = "Invalid PAN number format.")]
    public string? PanNo { get; set; }
}

