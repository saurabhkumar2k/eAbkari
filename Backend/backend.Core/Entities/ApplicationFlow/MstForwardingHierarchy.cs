using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace backend.Core.Entities.ApplicationFlow
{
    public class MstForwardingHierarchy
    {

        [Required]
        [StringLength(2)]
        public string ImplementingStateCode { get; set; } = string.Empty;

        [Required]
        [StringLength(2)]
        public string FlowUpto { get; set; } = string.Empty;

        [Required]
        public int SLNo { get; set; }

        [StringLength(1)]
        public string? ForwardingUserFlag { get; set; }

        [Required]
        [StringLength(2)]
        public string ForwardingUserType { get; set; } = string.Empty;

        [StringLength(50)]
        public string? ForwardingUserId { get; set; }

        public long? ParentId { get; set; }

        [Required]
        public long ForwardingLevel { get; set; }

        [StringLength(1)]
        public string? AllowtoassignOfficerforVerification { get; set; }

        [StringLength(1)]
        public string? AllowForScrutiny { get; set; }

        [StringLength(1)]
        public string? AllowForSiteEnquiry { get; set; }

        [StringLength(1)]
        public string? ALlowForReEnquiry { get; set; }

        [StringLength(1)]
        public string? AllowForPublicObjection { get; set; }

        [StringLength(1)]
        public string? ViewPublicObjection { get; set; }

        [StringLength(1)]
        public string? RejectionPermission { get; set; }

        [StringLength(1)]
        public string? AllowtoSendBack { get; set; }

        [StringLength(1)]
        public string? ViewEnquiryReport { get; set; }

        [StringLength(1)]
        public string? SendbackViewClarificationByOfficer { get; set; }

        [StringLength(1)]
        public string? ViewReplyBack { get; set; }

        [StringLength(1)]
        public string? ViewReplyForward { get; set; }

        [StringLength(1)]
        public string? GiveSpecificOpinion { get; set; }

        [StringLength(1)]
        public string? ViewSpecificOpinion { get; set; }

        [StringLength(1)]
        public string? DistrictLevelPermission { get; set; }

        [StringLength(1)]
        public string? DirectorateLevelPermission { get; set; }

        [StringLength(1)]
        public string? LicenseGeneratePermission { get; set; }

        [StringLength(1)]
        public string? DeleteStatus { get; set; }

        public DateTime? OprDate { get; set; }

        [StringLength(1)]
        public string? ViewNoteSheet { get; set; }

        [StringLength(1)]
        public string? GenerateApprovalLetter { get; set; }

        [StringLength(1)]
        public string? ViewApprovalLetter { get; set; }

        [StringLength(1)]
        public string? SendApplicantforPayment { get; set; }

        [StringLength(1)]
        public string? EnquiryReportObjection { get; set; }

        [StringLength(1)]
        public string? AllowGovtDecession { get; set; }

        [StringLength(1)]
        public string? ApprovedPremiseapp { get; set; }

        [StringLength(1)]
        public string? viewpremise { get; set; }
    }
}