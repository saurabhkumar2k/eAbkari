namespace backend.Core.DTOs
{
    public class PermitPassValidityUpsertDto
    {
        public string? StateCode { get; set; }
        public int DaysIpValidity { get; set; }
        public int DaysIpValidityEoIssue { get; set; }
        public int DaysIpValidityIpRecv { get; set; }
        public string? EoRequired { get; set; }
    }

    public class PermitPassValidityGridDto
    {
        public string StateCode { get; set; } = string.Empty;
        public string StateName { get; set; } = string.Empty;
        public int DaysIpValidity { get; set; }
        public int DaysIpValidityEoIssue { get; set; }
        public int DaysIpValidityIpRecv { get; set; }
        public string EoRequired { get; set; } = "Y";
    }
}