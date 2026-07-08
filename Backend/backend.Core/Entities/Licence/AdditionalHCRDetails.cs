using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    [Table("AdditionalHCRDetails")]
    public class AdditionalHCRDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; } = string.Empty;

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