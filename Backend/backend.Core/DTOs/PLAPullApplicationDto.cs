using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.DTOs
{
   


    public class PLAPullApplicationDto
    {
        public string? ApplicationIdNo { get; set; }

        public string? FlowUptoCode { get; set; }

        public long? HierarchyID { get; set; }

        public string? CompanyName { get; set; }

        public string? LicenseeCatDesc { get; set; }

        public string? UserId { get; set; }

        public DateTime? ApplicationDate { get; set; }

        
            public string? SiteName { get; set; }

        public string? SiteEmail { get; set; }
    }


    public class GetApplicationsRequest
    {
        public string Category { get; set; }
        public string UserId { get; set; }
    }


    public class PullApplicationRequest
    {
        public string UserId { get; set; }
        public string Category { get; set; }
        public string PermitType { get; set; }

        public List<PullApplicationItemDto> Applications { get; set; }
            = new List<PullApplicationItemDto>();
    }

    public class PullApplicationItemDto
    {
        public string ApplicationIdNo { get; set; }

        //public string AppID { get; set; }

        public long HierarchyID { get; set; }

        public string FlowUpto { get; set; }
    }


    public class PullApplicationResponse
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public List<string> PulledApplications { get; set; }
            = new List<string>();

        public List<string> FailedApplications { get; set; }
            = new List<string>();
    }





}
