using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreAPI.Models
{
    [Table("MM_Liquor_Category")]
    public class LiquorCategory
    {
        [Key]
        [Column("Liquor_Cat_code")]
        public string LiquorCatCode { get; set; } = string.Empty;

        [Column("Liquor_Cat_Desc")]
        public string LiquorCatDesc { get; set; } = string.Empty;
    }
}