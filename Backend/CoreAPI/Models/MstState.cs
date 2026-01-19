using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DOTNETAPI.Models
{
    [Table("MstState")]
    public class MstState
    {
        [Key]
        public int StateId { get; set; }   // PK

        [Required]
        [StringLength(2)]
        public string StateCode { get; set; }   // Alternate Key

        [Required]
        [StringLength(100)]
        public string StateName { get; set; }

        public string EntType { get; set; }

        public ICollection<MstDistrict> Districts { get; set; }
    }
}
