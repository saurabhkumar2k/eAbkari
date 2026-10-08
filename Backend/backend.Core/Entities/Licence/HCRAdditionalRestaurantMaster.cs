using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{   
    public class HCRAdditionalRestaurantMaster
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string ApplicationIdNo { get; set; } = string.Empty;

        [Required]
        public string NameOfAdditionalRestaurant { get; set; } = string.Empty;

        public int? NumberOfSeatCovers { get; set; }

        public int? NumberOfCounter { get; set; }

        public string? AddtionalArea { get; set; }

        public string? HoursofSale { get; set; }

        public string? HoursofSaleAddtionalArea { get; set; }

        public string? ForeignLiquor { get; set; }

        public string? AreaSqMtr { get; set; }

        public int? slNo {get; set;}
    }

    [Table("ApplicantLicenseAdditionalBarMaster")]
    public class ApplicantLicenseAdditionalBarMaster
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        [StringLength(250)]
        public string? NameOfAdditionalBar { get; set; }

        [StringLength(1)]
        public string? AddtionalArea { get; set; }

        public int? NumberOfCounter { get; set; }

        public int? SlNo { get; set; }
    }
}