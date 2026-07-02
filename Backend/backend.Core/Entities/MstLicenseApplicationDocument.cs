using System.ComponentModel.DataAnnotations;           // for [Key]
using System.ComponentModel.DataAnnotations.Schema;    // for [Table]

namespace backend.Core.Entities
{
    [Table("MstLicenseApplicationDocument")]
    public class MstLicenseApplicationDocument
    {
        [Key]
        [Column("DocId")]
        public string? DocId { get; set; }

        [Required]
        [Column("DocDesc")]
        public string? DocDesc { get; set; }

        // A = Active
        [Column("DocStatus")]
        [MaxLength(1)]
        public string? DocStatus { get; set; }

        // N = Not Deleted
        [Column("DeleteStatus")]
        [MaxLength(1)]
        public string? DeleteStatus { get; set; }

        // Can be NULL
        [Column("IsValid")]
        public bool? IsValid { get; set; }
    }
}

