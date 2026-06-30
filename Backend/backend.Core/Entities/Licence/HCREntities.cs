using System.ComponentModel.DataAnnotations;

namespace backend.Core.Entities.Licence
{
    public class TrainDetails
    {
        [Key]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        [StringLength(1000)]
        public string? TrainName { get; set; }

        [StringLength(1000)]
        public string? TrainNumber { get; set; }

        [StringLength(1000)]
        public string? OriginateFrom { get; set; }

        [StringLength(1000)]
        public string? TempAddress { get; set; }

        [StringLength(500)]
        public string? CompanyName { get; set; }
    }
    public class AddtionalTrainRouteDetails
    {
        [Key]
        [Required]
        [StringLength (50)]
        public string ApplicationIdNo {get; set;}

        [Required]
        [StringLength(1000)]
        public string RouteDescription {get; set;}
    }
    //public class ApplicantLicensePartnersDetails
    //{
    //    [Key]
    //    [Required]
    //    [StringLength(50)]
    //    public string Application_Id_No { get; set; }

    //    [Required]
    //    [StringLength(150)]
    //    public string PName { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string PPerShare { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string PPanNo { get; set; }

    //    [Required]
    //    public int PExciseNominee { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string Doc_SlNo { get; set; }

    //    [Required]
    //    [StringLength(250)]
    //    public string Photo_URL_PanNo { get; set; }

    //    [Required]
    //    [StringLength(250)]
    //    public string Photo_URL_AddressProof { get; set; }

    //    [StringLength(50)]
    //    public string? DINNo { get; set; }
    //}
  
}