namespace backend.Core.Entities
{
    public class MstDistrict
    {
        public int DID { get; set; }

        public string DistrictCode { get; set; } = string.Empty;

        public string DistrictName { get; set; } = string.Empty;

         public string StateCode { get; set; } = string.Empty;
    }
}