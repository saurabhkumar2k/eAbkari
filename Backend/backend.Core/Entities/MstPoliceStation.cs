
namespace backend.Core.Entities
{
    public class MstPoliceStation
    {
        public string DistrictCode { get; set; }
        public string PsCode { get; set; }
        public string? PsName { get; set; }
        public string? CircleName { get; set; }
        public string? ExciseDistCode { get; set; }
        public string? DprDistrictCode { get; set; }
        public string? ExciseDistCodeOld { get; set; }
        public string? FunctionalStatus { get; set; }
        public string? DeleteStatus { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
    }
}
