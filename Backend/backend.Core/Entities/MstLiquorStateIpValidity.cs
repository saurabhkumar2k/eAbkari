using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities
{
    [Table("MstLiquorStateIPValidity")]
    public class MstLiquorStateIpValidity
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("StateCode")]
        [StringLength(2)]
        public string StateCode { get; set; } = string.Empty;

        [Column("DaysIPValidity")]
        public short? DaysIpValidity { get; set; }

        [Column("DaysIPValidityEOissue")]
        public short? DaysIpValidityEoIssue { get; set; }

        [Column("DaysIPValidityIPrecv")]
        public short? DaysIpValidityIpRecv { get; set; }

        [Column("EOReq")]
        [StringLength(1)]
        public string EoRequired { get; set; } = "Y";

        [Column("UserID")]
        public string? UserId { get; set; }

        [Column("OpDate")]
        public DateTime? OpDate { get; set; }
    }
}