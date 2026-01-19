using System.ComponentModel.DataAnnotations;           // for [Key]
using System.ComponentModel.DataAnnotations.Schema;    // for [Table]

namespace DOTNETAPI.Models
{
    [Table("Application_License_Document_Master")]
    public class ApplicationLicenseDocumentMaster
    {
        [Key]
        [Column("Doc_Id")]
        public string DocId { get; set; }

        [Required]
        [Column("Doc_Desc")]
        public string DocDesc { get; set; }

        // A = Active
        [Column("Doc_Status")]
        [MaxLength(1)]
        public string DocStatus { get; set; }

        // N = Not Deleted
        [Column("Delete_Status")]
        [MaxLength(1)]
        public string DeleteStatus { get; set; }

        // Can be NULL
        [Column("IsValid")]
        public bool? IsValid { get; set; }
    }
}

