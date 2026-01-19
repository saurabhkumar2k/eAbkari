
using System;
using System.Collections.Generic;

namespace DOTNETAPI.DTOs
{

        public class ApplyLicenseDto
        {
       
        // Applicant
        public string ApplicantName { get; set; }
        public string CompanyName { get; set; }
        public DateTime? Dob { get; set; }
        public string FatherName { get; set; }
        public string Occupation { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string? Name { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Pin { get; set; }
        public string Contact { get; set; }
        public string SubDivision { get; set; }
        public string PoliceStation { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Landline { get; set; }
        public string Fax { get; set; }
        public string PanNo { get; set; }
        public string Size { get; set; }
        public string LicensePremise { get; set; }
        public string RegistrationNo { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string CaRegNo { get; set; }
        public DateTime? CaValidUpto { get; set; }
        public string SuperArea { get; set; }
        public string CarpetArea { get; set; }
        public string DistanceFromCP { get; set; }
        public string HoursOfSale { get; set; }
        public string? ConstitutionType { get; set; }
        public string CinNo { get; set; }

        // Directors
        public List<DirectorDto> Directors { get; set; }

        // License + FSSAI + VAT etc. can go here as flattened properties as before

        // License
        public string LicenseType { get; set; }
        public int CategoryCode { get; set; }
        public int StateCode { get; set; }

        // FSSAI
        public string? FssaiLicenseNo { get; set; }
        public DateTime? FssaiStartDate { get; set; }
        public DateTime? FssaiEndDate { get; set; }

        // VAT
        public string? VatCertificateNo { get; set; }
        public DateTime? VatEndDate { get; set; }

        // Distillery
        public string? DistilleryLicenceNo { get; set; }
        public DateTime? DistilleryEndDate { get; set; }

        // Solvency
        public string? SolvencyCertificateNo { get; set; }
        public DateTime? SolvencyEndDate { get; set; }

        // Nominee
        public string? NomineeIsExciseNominee { get; set; }
        public string? NomineeName { get; set; }
        public string? NomineeAddress { get; set; }
        public string? NomineeEmail { get; set; }
        public string? NomineeMobile { get; set; }
        public string ?NomineePanNo { get; set; }
    }

    public class DirectorDto
    {
        public string? Name { get; set; }
        public string? Share { get; set; }
        public string? PanNo { get; set; }
        public string? ExciseNominee { get; set; }
        public string? DinNo { get; set; }
    // Files should be uploaded separately
}

            
       
    


}
