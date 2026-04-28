using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreApi.Models
{
    [Table("MM_Liquor_Category")]
    public class MM_Liquor_Category
    {
        [Key]
        [Column("Liquor_Cat_Code")]
        public string LiquorCatCode { get; set; } = string.Empty;

        [Column("Liquor_Cat_Desc")]
        public string LiquorCatDesc { get; set; } = string.Empty;

        [Column("Liquor_Cat_Abbr")]
        public string LiquorCatAbbr { get; set; } = string.Empty;

        [Column("Delete_Status")]
        public string DeleteStatus { get; set; } = string.Empty;
    }
}