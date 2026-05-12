using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;           // for [Key]
using System.ComponentModel.DataAnnotations.Schema;    // for [Table]

namespace DOTNETAPI.Models
{

    [Table("ApplyLicense_L1_L31")]
    public class ApplyLicense_L1_L31
    {
            [Key]
            public int ApplyLicenseId { get; set; }

            // Applicant
            [MaxLength(255)]
            [Required]
            public string ApplicantName { get; set; }

            [MaxLength(255)]
            [Required]
            public string CompanyName { get; set; }

            public DateTime? Dob { get; set; }

            [MaxLength(255)]
            [Required]
            public string FatherName { get; set; }

            [MaxLength(255)]
            [Required]
            public string Occupation { get; set; }

            [MaxLength(500)]
            [Required]
            public string Address1 { get; set; }

            [MaxLength(500)]
            [Required]
            public string Address2 { get; set; }

            [MaxLength(255)]
            [Required]
            public string Name { get; set; }

            [MaxLength(500)]
            [Required]
            public string Address { get; set; }

            [MaxLength(100)]
            public string State { get; set; }

            [MaxLength(100)]
            public string District { get; set; }

            [MaxLength(20)]
            public string Pin { get; set; }

            [MaxLength(50)]
            public string Contact { get; set; }

            [MaxLength(100)]
            public string SubDivision { get; set; }

            [MaxLength(100)]
            public string PoliceStation { get; set; }

            [MaxLength(255)]
            public string Email { get; set; }

            [MaxLength(50)]
            public string Mobile { get; set; }

            [MaxLength(50)]
            public string Landline { get; set; }

            [MaxLength(50)]
            public string Fax { get; set; }

            [MaxLength(50)]
            public string PanNo { get; set; }

            [MaxLength(50)]
            public string Size { get; set; }

            [MaxLength(255)]
            public string LicensePremise { get; set; }

            [MaxLength(50)]
            public string RegistrationNo { get; set; }

            public DateTime? RegistrationDate { get; set; }
            public DateTime? ExpirationDate { get; set; }

            [MaxLength(50)]
            public string CaRegNo { get; set; }

            public DateTime? CaValidUpto { get; set; }

            [MaxLength(100)]
            public string SuperArea { get; set; }

            [MaxLength(100)]
            public string CarpetArea { get; set; }

            [MaxLength(50)]
            public string DistanceFromCP { get; set; }

            [MaxLength(50)]
            public string HoursOfSale { get; set; }

            [MaxLength(50)]
            public string ConstitutionType { get; set; }

            [MaxLength(50)]
            public string CinNo { get; set; }

            // License
            [MaxLength(100)]
            public string LicenseType { get; set; }

            public int CategoryCode { get; set; }
            public int StateCode { get; set; }

            // FSSAI
            [MaxLength(50)]
            public string FssaiLicenseNo { get; set; }

            public DateTime? FssaiStartDate { get; set; }
            public DateTime? FssaiEndDate { get; set; }

            // VAT
            [MaxLength(50)]
            public string VatCertificateNo { get; set; }

            public DateTime? VatEndDate { get; set; }

            // Distillery
            [MaxLength(50)]
            public string DistilleryLicenceNo { get; set; }

            public DateTime? DistilleryEndDate { get; set; }

            // Solvency
            [MaxLength(50)]
            public string SolvencyCertificateNo { get; set; }

            public DateTime? SolvencyEndDate { get; set; }

            // Nominee
            [MaxLength(10)]
            public string NomineeIsExciseNominee { get; set; }

            [MaxLength(255)]
            public string NomineeName { get; set; }

            [MaxLength(500)]
            public string NomineeAddress { get; set; }

            [MaxLength(255)]
            public string NomineeEmail { get; set; }

            [MaxLength(50)]
            public string NomineeMobile { get; set; }

            [MaxLength(50)]
            public string NomineePanNo { get; set; }

            // Navigation Property
           // public ICollection<Directors_L1_L31> Directors_L1_L31 { get; set; } = new List<Directors_L1_L31>();

        public ICollection<Directors_L1_L31> Directors { get; set; }

    }
    

    [Table("License_Directors_L1_L31")]
    public class Directors_L1_L31
    {
        [Key]
        public int DirectorId { get; set; }

        [ForeignKey("ApplyLicense_L1_L31")]
        public int ApplyLicenseId { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Share { get; set; }

        [MaxLength(50)]
        public string PanNo { get; set; }

        [MaxLength(10)]
        public string ExciseNominee { get; set; }

        [MaxLength(50)]
        public string DinNo { get; set; }

        // Navigation Property
        //public ApplyLicense_L1_L31 ApplyLicense_L1_L31 { get; set; }
    }

}