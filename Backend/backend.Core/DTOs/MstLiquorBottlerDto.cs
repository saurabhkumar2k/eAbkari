namespace backend.Application.DTOs
{
    public class MstLiquorBottlerDto
    {
        public string LiquorBottlerOrigin { get; set; }

        public string LiquorBottlerCode { get; set; }

        public string LiquorBottlerCountry { get; set; }

        public string LiquorBottlerState { get; set; }

        public string LiquorBottlerName { get; set; }

        public string LiquorBottlerAddress { get; set; }

        public string LiquorBottlerPinCode { get; set; }

        public string? LicenseeIdNo { get; set; }

        public string EntryFlag { get; set; }

        public string DeleteStatus { get; set; }

        public string? OldBottlerId { get; set; }
    }
    public class BottlerGridDto
    {
        public string OriginStateCountry { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Bottler { get; set; } = string.Empty;
        public string Origin { get; set; } = string.Empty;
    }
    
}