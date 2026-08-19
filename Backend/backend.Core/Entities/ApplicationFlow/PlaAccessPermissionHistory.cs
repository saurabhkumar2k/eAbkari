using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace backend.Core.Entities.ApplicationFlow
{
    public class PlaAccessPermissionHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? ApplicationIdNo { get; set; }

        [Required]
        [StringLength(2)]
        public string? FlowUpto { get; set; }

        
        public long TransactionSiNo { get; set; } 

        public DateTime? TransactionDate { get; set; }

        [Required]
        [StringLength(2)]
        public string SenderUserTypeCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? SenderUserID { get; set; }

        [Required]
        public long SenderForwardingLevel { get; set; }

        [StringLength(2)]
        public string ReceiverUserTypeCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? ReceiverUserID { get; set; } = string.Empty;

        [StringLength(2)]
        public string? ReceiverForwardingLevel { get; set; } = string.Empty;

        [StringLength(1)]
        public string? PreScrutinyStatus { get; set; } = string.Empty;

        [StringLength(1)]
        public string? FixDateEnquiry { get; set; } = string.Empty;

        [StringLength(1500)]
        public string? TransactionRemarks { get; set; } = string.Empty;

        [StringLength(2)]
        public string? TransactionStatusCode { get; set; } = string.Empty;

        public DateTime? OprDate { get; set; } 

        [StringLength(50)]
        public string? UserId { get; set; } = string.Empty;

        [StringLength(1)]
        public string? DistrictLevelAccessPermission { get; set; } = string.Empty;

        [StringLength(1)]
        public string? DirectorateLevelAccessPermission { get; set; } = string.Empty;

        [StringLength(1)]
        public string? SendBack { get; set; } = string.Empty;

        [StringLength(1500)]
        public string? SendBackQuery { get; set; } = string.Empty;

        [StringLength(1500)]
        public string? SendBackClarification { get; set; } = string.Empty;

        [StringLength(1)]
        public string? GovtDecession { get; set; } = string.Empty;

        [StringLength(1)]
        public string? LyingWithApplicantFlag { get; set; } = string.Empty;
    }


}