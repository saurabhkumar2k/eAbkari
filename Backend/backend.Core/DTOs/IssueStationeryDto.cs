namespace backend.Core.DTOs
{
    public class IssueStationeryDto
    {
        public string CatCode { get; set; }

        public string LicenseeId { get; set; }

        public string EntityType { get; set; }

        public string PermitType { get; set; }

        public string WholesaleVend { get; set; }

        public string VendAddress { get; set; }

        public string VendType { get; set; }

        public string SerialFrom { get; set; }

        public string SerialTo { get; set; }

        public int NoofStationary { get; set; }
    }
}