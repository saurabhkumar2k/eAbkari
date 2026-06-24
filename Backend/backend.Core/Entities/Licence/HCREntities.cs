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
  
}