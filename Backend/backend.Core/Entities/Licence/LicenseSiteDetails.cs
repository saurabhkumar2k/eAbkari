using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    [Table("LicenseSiteDetails")]
    public class LicenseSiteDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(20)]
        public string? Regnumber { get; set; }

        [Key]
        [Required]
        [StringLength(30)]
        public string ApplicationIdNo { get; set; } = string.Empty;

        [StringLength(9)]
        [Column(TypeName = "char(9)")]
        public string? FinYear { get; set; }

        [StringLength(2)]
        [Column(TypeName = "char(2)")]
        public string? CatCode { get; set; }

        [StringLength(250)]
        public string? SiteName { get; set; }

        [Column(TypeName = "varchar(max)")]
        public string? SiteAddress { get; set; }

        [StringLength(500)]
        public string? SiteAddress2 { get; set; }

        [StringLength(50)]
        public string? State { get; set; }

        [StringLength(4)]
        [Column(TypeName = "varchar(4)")]
        public string? DistrictCode { get; set; }

        [StringLength(4)]
        [Column(TypeName = "varchar(4)")]
        public string? SubDivisionCode { get; set; }

        [StringLength(4)]
        [Column(TypeName = "varchar(4)")]
        public string? PoliceStationCode { get; set; }

        [StringLength(10)]
        public string? SitePin { get; set; }

        [StringLength(5)]
        public string? SiteAssembly { get; set; }

        [StringLength(150)]
        public string? SiteWard { get; set; }

        [StringLength(150)]
        public string? SiteEmail { get; set; }

        [StringLength(20)]
        public string? SiteMobile { get; set; }

        [StringLength(20)]
        public string? SiteLandline { get; set; }

        [StringLength(20)]
        public string? SiteFax { get; set; }

        [StringLength(50)]
        public string? SitePan { get; set; }

        [StringLength(1)]
        public string? LicenseValidFor { get; set; }

        [StringLength(1)]
        public string? IsCommercialActivity { get; set; }

        public DateTime CreatedDate { get; set; }

        [StringLength(50)]
        public string? SiteSize { get; set; }
    }
}