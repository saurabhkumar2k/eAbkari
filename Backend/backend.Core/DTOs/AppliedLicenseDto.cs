using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.DTOs
{
    public class AppliedLicenseDto
    {
        public string? ApplicationIdNo { get; set; }

        public DateTime? ApplicationDate { get; set; }

        public string? ApplicationStatus { get; set; }

        public string? LicenseeCatDesc { get; set; }

        


    }
}
