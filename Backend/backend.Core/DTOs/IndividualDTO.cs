using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class IndividualDTO
    {
        public string Regnumber { get; set; } = string.Empty;

        [Required]
        public string ApplicationIdNo { get; set; } = string.Empty;

        public string FinYear { get; set; } = string.Empty;
        public string CatCode { get; set; } = string.Empty;

        public string SiteName { get; set; } = string.Empty;
        public string SiteAddress { get; set; } = string.Empty;
        public string? SiteAddress2 { get; set; }

        public string State { get; set; } = string.Empty;
        public string DistrictCode { get; set; } = string.Empty;
        public string SubDivisionCode { get; set; } = string.Empty;
        public string PoliceStationCode { get; set; } = string.Empty;

        public string SitePin { get; set; } = string.Empty;
        public string SiteAssembly { get; set; } = string.Empty;
        public string? SiteWard { get; set; }

        [EmailAddress]
        public string SiteEmail { get; set; } = string.Empty;

        public string SiteMobile { get; set; } = string.Empty;
        public string? SiteLandline { get; set; }
        public string? SiteFax { get; set; }
        public string? SitePan { get; set; }

        // Allowed values: "3" or "5"
        public string? LicenseValidFor { get; set; }

        // Allowed values: "Y" or "N"
        public string? IsCommercialActivity { get; set; }
    }
}