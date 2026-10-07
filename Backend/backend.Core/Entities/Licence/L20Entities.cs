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
        [StringLength(50)]
        public string? NumberOfSeatCovers { get; set; }
        [StringLength(50)]
        public string? NumberOfDispensingCounter { get; set; }
        [StringLength(50)]
        public string? NumberOfManagers { get; set; }
        [StringLength(50)]
        public string? NumberOfKitchenStaff { get; set; }
        [StringLength(50)]
        public string? NumberOfUtlityEmployees { get; set; }
        [StringLength(50)]
        public string? NumberOfBarAttendent { get; set; }
        [StringLength(5)]
        public string? NumberOfcompartments { get; set; }

    }
    public class AddtionalTrainRouteDetails
    {

        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

        [Required]
        [StringLength(1000)]
        public string RouteDescription { get; set; }

        [StringLength(3)]
        public string SLNo { get; set; }
    }
   

}