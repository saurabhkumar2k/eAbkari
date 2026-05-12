using System.ComponentModel.DataAnnotations;           // for [Key]
using System.ComponentModel.DataAnnotations.Schema;    // for [Table]

namespace DOTNETAPI.Models
{
    [Table("Licensee_Category")]  // matches your SQL table name
    public class Licensee_Category
    {
        [Key] // Marks this as the primary key
        [Column("licensee_cat_code")] // optional if the property name matches the column
        public string licensee_cat_code { get; set; } = string.Empty;

        [Column("licensee_cat_desc")]
        public string licensee_cat_desc { get; set; } = string.Empty;
    }
}

