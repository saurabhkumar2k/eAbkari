

using System.ComponentModel.DataAnnotations;

public class LicenseApplicationUserDetails
{
    [Key]
    public long Id { get; set; }

    public string? RegNumber { get; set; }

    public string? MobileNo { get; set; }
    public string ApplicantName { get; set; } = string.Empty;
    //public string CompanyName { get; set; } = string.Empty;
    public DateTime? Dob { get; set; }
     public string ApplicationIdNo { get; set; } = string.Empty;
      public DateTime? OprDate { get; set; }

    public string FatherHusbandName { get; set; } = string.Empty;
    public string Occupation { get; set; } = string.Empty;
    public string PresentAddress { get; set; } = string.Empty;
    public string PermanentAddress { get; set; } = string.Empty;
    public string StateUT { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string PIN { get; set; } = string.Empty;
   
    public string PoliceStation { get; set; } = string.Empty;
    public string EmailId { get; set; } = string.Empty;
    public string LandLine { get; set; } = string.Empty;

    public string Fax { get; set; } = string.Empty;

    public string PanNo { get; set; } = string.Empty;

    public string SubDivision { get; set; } = string.Empty;

    public string ApplicantDesig { get; set; } = string.Empty;



}