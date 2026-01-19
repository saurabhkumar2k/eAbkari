using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DOTNETAPI.Models
{
    [Table("SITE_SUBDIVISION")]
    public class SiteSubdivision
    {
        [Key]
        [StringLength(50)]
        public string district_code { get; set; }

        
        [StringLength(200)]
        public string sd_code { get; set; }

    
        [StringLength(50)]
        public string sd_name { get; set; }   // FK


        public string delete_status { get; set; }

        
    }






}
