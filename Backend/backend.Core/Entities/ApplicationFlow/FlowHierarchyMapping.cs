using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace backend.Core.Entities.ApplicationFlow
{
    using System.ComponentModel.DataAnnotations;

    public class FlowHierarchyMapping
    {
        [Required]
        public int SlNo { get; set; }

        [Required]
        [StringLength(2)]
        public string FlowUpto { get; set; } = string.Empty;

        [Required]
        public long HierarchyID { get; set; }

        [Required]
        [StringLength(50)]
        public string UserID { get; set; } = string.Empty;

        [StringLength(2)]
        public string? UserTypeCode { get; set; }

        [StringLength(50)]
        public string? CategoryType { get; set; }

        [StringLength(1)]
        public string? Active { get; set; }

        public DateTime? ActionDate { get; set; }
    }
}