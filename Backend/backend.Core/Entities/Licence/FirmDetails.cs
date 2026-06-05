using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class FirmDetails
    {
        [Key]
        [Required]
        [StringLength(50)]
        public string Application_Id_No { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long FirmId { get; set; }

        [StringLength(20)]
        public string? Registration_No { get; set; }

        public DateTime? RegDate { get; set; }

        [Required]
        [StringLength(4)]
        public string? Constitution_Type { get; set; }

        [StringLength(50)]
        public string? VolumeNo { get; set; }

        [Required]
        [StringLength(50)]
        public string Company_PAN { get; set; }

        [Required]
        [StringLength(50)]
        public string VAT_No { get; set; }

        [StringLength(10)]
        public string? ExciseNomineeMobileNo { get; set; }

        [StringLength(5)]
        public string? IsExciseNomineeAnyOtherThanDirectoryOfCompany { get; set; }

        [StringLength(20)]
        public string? FSSAI_Licence_No { get; set; }

        public DateTime? FSSAI_Licence_Start_Date { get; set; }
        public DateTime? FSSAI_Licence_End_Date { get; set; }

        [StringLength(50)]
        public string? ExciseNomineePAN { get; set; }

        [StringLength(50)]
        public string? LastYearIncomeTaxReturnOrAssessmentOrder { get; set; }

        [StringLength(50)]
        public string? PowerOfAttorney { get; set; }

        [Required]
        [StringLength(10)]
        public string Mobile_No { get; set; }

        [StringLength(150)]
        public string? ExciseNomineeName { get; set; }

        [StringLength(500)]
        public string? ExciseNomineeAddress { get; set; }

        [StringLength(250)]
        public string? ExciseNomineePanImage { get; set; }

        public int? LitreAppyingFor { get; set; }

        public DateTime? BWHInsuranceEndDate { get; set; }
        public DateTime? BWHRentAgreementEndDate { get; set; }

        [StringLength(50)]
        public string? VATGSTCertNo { get; set; }

        public DateTime? VATGSTCertEndDate { get; set; }

        [StringLength(20)]
        public string? DistilleryLicNo { get; set; }

        public DateTime? DistilleryLicEndDate { get; set; }
        
    }
}