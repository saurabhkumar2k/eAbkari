using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities
{
    [Table("MstLiquorState")]
    public class MstLiquorState
    {
        [Key]
        [Column("StateCode")]
        [StringLength(2)]
        public string? StateCode { get; set; }

        [Column("StateDesc")]
        [StringLength(50)]
        public string? StateDesc { get; set; }

        [Column("StateAbbr")]
        [StringLength(5)]
        public string? StateAbbr { get; set; }

        [Column("DeleteStatus")]
        [StringLength(1)]
        public string? DeleteStatus { get; set; }

        [Column("StateType")]
        [StringLength(1)]
        public string? StateType { get; set; }
    }
}