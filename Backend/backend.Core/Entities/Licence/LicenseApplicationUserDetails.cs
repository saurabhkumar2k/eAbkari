using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class LicenseApplicationUserDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(150)]
        [Column(TypeName = "NVARCHAR(150)")]
        public string? Regid { get; set; }

        [StringLength(10)]
        [Column(TypeName = "CHAR(10)")]
        public string? MobileNo { get; set; }

      

        [StringLength(5)]
        [Column(TypeName = "CHAR(5)")]
        public string? SlNo { get; set; }

        [StringLength(100)]
        [Column(TypeName = "VARCHAR(100)")]
        public string? ApplicantName { get; set; }

        public DateTime? DOB { get; set; }

        [StringLength(200)]
        [Column(TypeName = "VARCHAR(200)")]
        public string? EmailId { get; set; }

        [StringLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string? PresentAddress { get; set; }

        [StringLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string? PermanentAddress { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? StateUT { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? District { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? PIN { get; set; }

        [StringLength(50)]
        [Column(TypeName = "NVARCHAR(50)")]
        public string? LandLine { get; set; }

      

        public DateTime? OprDate { get; set; }

        [StringLength(150)]
        [Column(TypeName = "NVARCHAR(150)")]
        public string? FatherHusbandName { get; set; }

        [StringLength(150)]
        [Column(TypeName = "NVARCHAR(150)")]
        public string? Occupation { get; set; }

        [StringLength(50)]
        [Column(TypeName = "VARCHAR(50)")]
        public string? PanNo { get; set; }

        [StringLength(50)]
        [Column(TypeName = "VARCHAR(50)")]
        public string? SubDivision { get; set; }

 

        
    }



    
}
