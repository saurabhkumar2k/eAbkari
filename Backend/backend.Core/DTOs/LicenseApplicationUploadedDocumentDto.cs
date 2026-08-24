using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.DTOs
{
    public class LicenseApplicationUploadedDocumentDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;

        public string? MobileNo { get; set; }

        public string? ApplicantSl { get; set; }

        public string? DocId { get; set; }

        public string? DocSl { get; set; }



        public string? DocStatus { get; set; }

        public string? MobileNoReleaseStatus { get; set; }

        public string? IsValid { get; set; }

        public string? Remarks { get; set; }

        public DateTime? DateOfValidity { get; set; }

        public string? DocumentvalidationYN { get; set; }

        public string? LicenseeIdNo { get; set; }

       // public IFormFile? DocUrl { get; set; }


        public string? DocUrl { get; set; }       // ✅ GET filename
        public IFormFile? DocumentFile { get; set; } // ✅ POST upload


        // public IFormFile? DocUrl { get; set; }





        public string? SubmitDate { get; set; }
    }


    public class ApplicationDocumentUploadDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;

        public string? MobileNo { get; set; }

        public List<LicenseApplicationUploadedDocumentDto> Documents { get; set; } = new();
    }
}
