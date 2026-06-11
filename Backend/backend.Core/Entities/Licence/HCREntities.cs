using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    [Table("TrainDetails")]
    public class TrainDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        [StringLength(250)]
        public string? TrainName { get; set; }

        [StringLength(50)]
        public string? TrainNumber { get; set; }

        [StringLength(500)]
        public string? OriginateFrom { get; set; }

        [StringLength(500)]
        public string? TempAddress { get; set; }

        [StringLength(500)]
        public string? CompanyName { get; set; }
    }

    [Table("AddtionalTrainRouteDetails")]
    public class AddtionalTrainRouteDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        [Required]
        [StringLength(1000)]
        public string RouteDescription { get; set; }
    }

    [Table("ApplicantLicensePartnersDetails")]
    public class ApplicantLicensePartnersDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; } 

        [Required]
        [StringLength(150)]
        public string PName { get; set; } 

        [Required]
        [StringLength(50)]
        public string PPerShare { get; set; } 

        [Required]
        [StringLength(50)]
        public string PPanNo { get; set; } 

        [Required]
        public int PExciseNominee { get; set; }

        [Required]
        [StringLength(50)]
        public string DocSlNo { get; set; } 

        [Required]
        [StringLength(250)]
        public string PhotoURLPanNo { get; set; }

        [Required]
        [StringLength(250)]
        public string PhotoURLAddressProof { get; set; }

        [StringLength(50)]
        public string? DINNo { get; set; }
    }

    [Table("AdditionalHCRDetails")]
    public class AdditionalHCRDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        public int? NumberOfClubMember { get; set; }

        [StringLength(50)]
        public string? NumberOfSeatCovers { get; set; }

        [StringLength(50)]
        public string? NumberOfDispensingCounter { get; set; }

        public bool? AdditionalArea { get; set; }

        [StringLength(50)]
        public string? NumberOfManagers { get; set; }

        [StringLength(50)]
        public string? NumberOfKitchenStaff { get; set; }

        [StringLength(50)]
        public string? NumberOfUtlityEmployees { get; set; }

        [StringLength(50)]
        public string? TotalRoom { get; set; }

        [StringLength(50)]
        public string? StaffStrength { get; set; }

        [StringLength(50)]
        public string? StarCategory { get; set; }

        [StringLength(50)]
        public string? ServiceCounter { get; set; }

        [StringLength(50)]
        public string? TotalArea { get; set; }

        [StringLength(100)]
        public string? EducationalInsDist { get; set; }

        [StringLength(100)]
        public string? ReligiousPlaceDist { get; set; }

        [StringLength(50)]
        public string? IsSuitableGagdget { get; set; }

        [StringLength(50)]
        public string? IsLocalAuthorityApproved { get; set; }

        [StringLength(50)]
        public string? IsIndicatingLiquor { get; set; }

        [StringLength(50)]
        public string? NumberOfBarAttendent { get; set; }

        [StringLength(50)]
        public string? StarCategoryRating { get; set; }

        [StringLength(50)]
        public string? RestaurantArea { get; set; }
    }
}