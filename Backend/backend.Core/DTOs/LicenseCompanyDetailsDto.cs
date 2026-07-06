
using Microsoft.AspNetCore.Http;

public class LicenseCompanyDetailsDto
{

 public long FirmId { get; set; }

    public string ApplicationIdNo { get; set; } = string.Empty;

    public string? CompanyName { get; set; }
    public string? ConstitutionType { get; set; }


    public string? CINNO { get; set; }


    public string? RegistrationNo { get; set; }

    public DateTime? RegDate { get; set; }


    public string? CompanyPAN { get; set; }


    public string? VATNO { get; set; }

public string? IsExciseNominee { get; set; }


    public string? ExciseNomineeName { get; set; }


    public string? ExciseNomineeAddress { get; set; }


    public string? ExciseNomineeEmailID { get; set; }


    public string? ExciseNomineeMobileNo { get; set; }


    public string? ExciseNomineePAN { get; set; }


    public string? ExciseNomineePanImage { get; set; }


    


    public string? FSSAILicenceNo { get; set; }


    public DateTime? FSSAILicenceStartDate { get; set; }


    public DateTime? FSSAILicenceEndDate { get; set; }


    public string? VATGSTCertNo { get; set; }

    public DateTime? VATGSTCertEnddate { get; set; }


    public string? DistilleryLicNo { get; set; }

    public DateTime? DistilleryLicEnddate { get; set; }

    public DateTime? BWHInsuranceEndDate { get; set; }


    public DateTime? BWHRentAgreementEndDate { get; set; }


    public string? BWHInsuranceNo { get; set; }


    public string? BWHLeaseRentAgreementNo { get; set; }


    public string? MobileNo { get; set; }

    public int? LitreAppyingFor { get; set; }

    public List<AdditionalCompanyPartnersDetailsDto>? CompanyPartnersDetails { get; set; } = [];


}



public class AdditionalCompanyPartnersDetailsDto
{
    

         public int? ID { get; set; }

    public string ApplicationIdNo { get; set; } = string.Empty;
    public string? PName { get; set; }

    public decimal? PPerShare { get; set; }

    public string? PPanNo { get; set; }

    public string? PExciseNominee { get; set; }

    public string? DINNo { get; set; }

    public string? PhotoURLPanNo { get; set; }

    public IFormFile? PanFile { get; set; }

    public IFormFile? addressFile { get; set; }
}


