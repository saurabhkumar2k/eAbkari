using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DOTNETAPI.Models
{
     [Table("Site_PS")]
     public class SitePoliceStation
     {
        [Key]
        [StringLength(50)]
        public string district_code { get; set; }

        
        [StringLength(200)]
        public string ps_code { get; set; }

    
        [StringLength(50)]
       public string ps_name { get; set; }   // FK


       public string circle_name { get; set; }

       public string Excise_Dist_Code { get; set; }

     public string DPR_District_Code { get; set; }

      public string Excise_Dist_Code_Old { get; set; }

     public string delete_status { get; set; }

       public string MOBILE { get; set; }

      public string EMAIL{ get; set; } 


       // [ForeignKey("district_code")]
       // public SITE_SUBDIVISION SITE { get; set; }
    }


}