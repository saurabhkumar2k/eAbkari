using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.DTOs
{
    public class ReportDto
    {
        public string? ApplicationIdNo { get; set; }

        public DateTime? ApplicationDate { get; set; }

        public string? ApplicationCategory { get; set; }

        public string? ApplicationFlag { get; set; }

        public string? CatCode { get; set; }

        public string? CategoryDescription { get; set; }

        

        public string?   ApplicantName { get; set; }

        public string? AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public string? FatherName { get; set; }

        public string? Mobile { get; set; }

        public string?   Email { get; set; }

        public string?   Address { get; set; }

        public string StateUT { get; set; } = string.Empty;
        public string? District { get; set; }

        public string SubDivision { get; set; } = string.Empty;

        public string? State { get; set; }

        public string? PIN { get; set; }

        public string? PanNo { get; set; }

        public string? CompanyName { get; set; }

        
        public string? LicenseName { get; set; }




        //compantdetails dto 


  

      public LicenseCompanyDetailsDto? LicenseCompanyDetails { get; set; }




        public List<AdditionalCompanyPartnersDetailsDto> Directors { get; set; } = new();

        public List<DocumentDto> Documents { get; set; } = new();

        public WarehouseDetailsDto? WarehouseDetails { get; set; }

    }


}

