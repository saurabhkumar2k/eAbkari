using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DOTNETAPI.Models
{
    [Table("MstDistrict")]
    public class MstDistrict
    {
        [Key]
        [StringLength(50)]
        public string DistCode { get; set; }

        [Required]
        [StringLength(200)]
        public string DistName { get; set; }

        [Required]
        [StringLength(2)]
        public string StateCode { get; set; }   // FK


        public string EntType { get; set; }

        [ForeignKey("StateCode")]
        public MstState State { get; set; }
    }
}
