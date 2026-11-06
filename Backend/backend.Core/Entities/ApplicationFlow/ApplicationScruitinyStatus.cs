using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace backend.Core.Entities.ApplicationFlow
{
    public class ApplicationScruitinyStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        [Required]
        [StringLength(50)]
        public string UserId { get; set; } 

        [Required]
        [StringLength(2)]
        public string UserTypeCode { get; set; } 

        [Required]
        [StringLength(50)]
        public string DocId { get; set; } 

        [StringLength(10)]
        public string? IsValid { get; set; } 

        [StringLength(200)]
        public string? Remarks { get; set; } 

        public DateTime? RemarkDate { get; set; } 

    }
    
}