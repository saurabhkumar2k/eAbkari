using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class LicenseSiteDetailsDto
    {
        
        public  string Regnumber { get; set; }

        public  string ApplicationIdNo { get; set; } 

        public   string FinYear { get; set; }

        public  string CatCode { get; set; }

        
        public string SiteName { get; set; } 

        
        public string SiteAddress { get; set; }  

        public string? SiteAddress2 { get; set; }

        
        public string State { get; set; } 

        
        public string DistrictCode { get; set; } 

        
        public string SubDivisionCode { get; set; } 

        
        public string PoliceStationCode { get; set; } 

        
        public string SitePin { get; set; } 

        
        public string SiteAssembly { get; set; } 

        public string? SiteWard { get; set; }

        
        public string SiteEmail { get; set; } 

        
        public string SiteMobile { get; set; } 

        public string? SiteLandline { get; set; }

        public string? SiteFax { get; set; }

        public string? SitePan { get; set; }
    }
}