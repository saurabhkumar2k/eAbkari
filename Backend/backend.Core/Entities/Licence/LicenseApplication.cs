
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class LicenseApplication
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(10)]
        public string MobileNo { get; set; }

        [StringLength(50)]
        public string IPAddress { get; set; }

        [StringLength(50)]
        public string Regnumber { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        public DateTime? ApplicationDate { get; set; }

        [StringLength(9)]
        public string FinYear { get; set; }

        [StringLength(2)]
        public string ApplicationStatus { get; set; }

        [StringLength(2)]
        public string CatCode { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(4)]
        public string DistrictCode { get; set; }

        [StringLength(250)]
        public string SiteName { get; set; }

        [StringLength(50)]
        public string SiteAssembly { get; set; }

        [StringLength(50)]
        public string SiteWard { get; set; }

        [StringLength(150)]
        public string SiteEmail { get; set; }

        [StringLength(50)]
        public string SiteMobile { get; set; }

        [StringLength(50)]
        public string SiteLandline { get; set; }

        [StringLength(50)]
        public string SiteFax { get; set; }

        [StringLength(50)]
        public string SitePin { get; set; }

        public char? SiteType { get; set; }

        public string SiteAddress { get; set; }

        [StringLength(500)]
        public string SiteAddress2 { get; set; }

        public char? AdditionalBar { get; set; }

        public int? NoAdditionalBar { get; set; }

        public string NameAdditionalBar { get; set; }

        [StringLength(10)]
        public string SiteDist { get; set; }

        public char? LicenseType { get; set; }

        public char? Whetherappcomplt { get; set; }

        public char? SiteEnquiryReportSubmitted { get; set; }

        public DateTime? EnquiryReportSentDate { get; set; }

        public char? ApplicationFlag { get; set; }

        public string? RejectExcomRemarks { get; set; }

        public DateTime? RejectExcomDate { get; set; }

        public char? GenerateLicenseeID { get; set; }

        public DateTime? GenerateLicenseeIDDate { get; set; }

        public DateTime? LicenseGenerateDate { get; set; }

        public char? LicenseGenerate { get; set; }

        public char? ScrutinyStatus { get; set; }

        [StringLength(2)]
        public string FlowUpto { get; set; }

        public DateTime? PublicNoticeIssueDate { get; set; }

        [StringLength(250)]
        public string CompanyName { get; set; }

        [StringLength(50)]
        public string SiteAdditionalLicenceValidity { get; set; }

        [StringLength(50)]
        public string SiteSize { get; set; }

        [StringLength(10)]
        public string SubDivisionCode { get; set; }

        [StringLength(10)]
        public string PoliceStationCode { get; set; }

        public char? LicenseGenerateFinalYN { get; set; }

        public char? LicenseApplicationSubmitYN { get; set; }

        public int? HoursofSale { get; set; }

        public char? ApproveDocumentYN { get; set; }

        [StringLength(50)]
        public string LicenceIdAppliedagainst { get; set; }

        public char? IsApproveYN { get; set; }

        public char? AddtionWarehouseYN { get; set; }
    }
}