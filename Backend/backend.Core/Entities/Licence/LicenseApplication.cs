
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    
    [Table("LicenseApplication")]
    public class LicenseApplication
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(10)]
        [Column(TypeName = "CHAR(10)")]
        public string? MobileNo { get; set; }

        [StringLength(50)]
        [Column(TypeName = "VARCHAR(50)")]
        public string? IPAddress { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? Regnumber { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string ApplicationIdNo { get; set; } = string.Empty;

        public DateTime? ApplicationDate { get; set; }

        [StringLength(9)]
        [Column(TypeName = "CHAR(9)")]
        public string? FinYear { get; set; }

        [StringLength(2)]
        [Column(TypeName = "CHAR(2)")]
        public string? ApplicationStatus { get; set; }

        [StringLength(2)]
        [Column(TypeName = "CHAR(2)")]
        public string? CatCode { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? State { get; set; }

        [StringLength(4)]
        [Column(TypeName = "VARCHAR(4)")]
        public string? DistrictCode { get; set; }

        [StringLength(250)]
        [Column(TypeName = "NVARCHAR(250)")]
        public string? SiteName { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? SiteAssembly { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? SiteWard { get; set; }

        [StringLength(150)]
        [Column(TypeName = "NVARCHAR(150)")]
        public string? SiteEmail { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? SiteMobile { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? SiteLandline { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? SiteFax { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? SitePin { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? SiteType { get; set; }

        [Column(TypeName = "VARCHAR(MAX)")]
        public string? SiteAddress { get; set; }

        [StringLength(500)]
        [Column(TypeName = "NVARCHAR(500)")]
        public string? SiteAddress2 { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? AdditionalBar { get; set; }

        public int? NoAdditionalBar { get; set; }

        [Column(TypeName = "VARCHAR(MAX)")]
        public string? NameAdditionalBar { get; set; }

        [StringLength(10)]
        [Column(TypeName = "CHAR(10)")]
        public string? SiteDist { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? LicenseType { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? Whetherappcomplt { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? SiteEnquiryReportSubmitted { get; set; }

        public DateTime? EnquiryReportSentDate { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? ApplicationFlag { get; set; }

        [Column(TypeName = "VARCHAR(MAX)")]
        public string? RejectExcomRemarks { get; set; }

        public DateTime? RejectExcomDate { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? GenerateLicenseeID { get; set; }

        public DateTime? GenerateLicenseeIDDate { get; set; }

        public DateTime? LicenseGenerateDate { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? LicenseGenerate { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? ScrutinyStatus { get; set; }

        [StringLength(2)]
        [Column(TypeName = "CHAR(2)")]
        public string? FlowUpto { get; set; }

        public DateTime? PublicNoticeIssueDate { get; set; }

        [StringLength(250)]
        [Column(TypeName = "VARCHAR(250)")]
        public string? CompanyName { get; set; }

        [StringLength(50)]
        [Column(TypeName = "VARCHAR(50)")]
        public string? SiteAdditionalLicenceValidity { get; set; }

        [StringLength(50)]
        [Column(TypeName = "VARCHAR(50)")]
        public string? SiteSize { get; set; }

        [StringLength(10)]
        [Column(TypeName = "VARCHAR(10)")]
        public string? SubDivisionCode { get; set; }

        [StringLength(10)]
        [Column(TypeName = "VARCHAR(10)")]
        public string? PoliceStationCode { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? LicenseGenerateFinalYN { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? LicenseApplicationSubmitYN { get; set; }

        public int? HoursofSale { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? ApproveDocumentYN { get; set; }

        [StringLength(50)]
        [Column(TypeName = "VARCHAR(50)")]
        public string? LicenceIdAppliedagainst { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? IsApproveYN { get; set; }

        [StringLength(1)]
        [Column(TypeName = "CHAR(1)")]
        public string? AddtionWarehouseYN { get; set; }
    }
}