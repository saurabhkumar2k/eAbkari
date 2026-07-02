using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
public class LicenseCompanyDetails
{
    [Key]
 public long FirmId { get; set; }

    public string ApplicationIdNo { get; set; } = string.Empty;


    public string? ConstitutionType { get; set; }


    public string? CINNO { get; set; }


    public string? RegistrationNo { get; set; }

    public DateTime? RegDate { get; set; }


    public string? CompanyPAN { get; set; }


    public string? VATNO { get; set; }


    public string? ExciseNomineeName { get; set; }


    public string? ExciseNomineeAddress { get; set; }


    public string? ExciseNomineeEmailID { get; set; }


    public string? ExciseNomineeMobileNo { get; set; }


    public string? ExciseNomineePAN { get; set; }


    public string? ExciseNomineePanImage { get; set; }


    public string? IsExciseNominee { get; set; }


    public string? FSSAILicenceNo { get; set; }


    public DateTime? FSSAILicenceStartDate { get; set; }


    public DateTime? FSSAILicenceEndDate { get; set; }


    public string? VATGSTCertNo { get; set; }

    public DateTime? VATGSTCertEnddate { get; set; }


    public string? DistilleryLicNo { get; set; }

    public DateTime? DistilleryLicEnddate { get; set; }

    public DateTime? BWHInsuranceEndDate { get; set; }


    public DateTime? BWHRentAgreementEndDate { get; set; }


    public string? LastYearIncomeTaxReturnOrAssessmentOrder { get; set; }


    public string? PowerOfAttorney { get; set; }


    public string? MobileNo { get; set; }

    public int? LitreAppyingFor { get; set; }


    [ForeignKey(nameof(ApplicationIdNo))]
    public List<AdditionalCompanyPartnersDetails>? CompanyPartnersDetails { get; set; } = [];

}


public class AdditionalCompanyPartnersDetails
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? ID { get; set; }

    public string ApplicationIdNo { get; set; } = string.Empty;
    public string? PName { get; set; }

    public decimal? PPerShare { get; set; }

    public string? PPanNo { get; set; }

    public string? PExciseNominee { get; set; }

    public string? DINNo { get; set; }

    public string? PhotoURLPanNo { get; set; }

    public string? PhotoURLAddressProof { get; set; }

   
}



