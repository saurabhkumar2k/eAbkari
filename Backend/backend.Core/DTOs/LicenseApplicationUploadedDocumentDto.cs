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
        //public string ApplicationIdNo { get; set; } = string.Empty;

        //public string? MobileNo { get; set; }

        public string? ApplicantSl { get; set; }

        public string? DocId { get; set; }

        public string? DocSl { get; set; }

        public IFormFile? DocumentFile { get; set; }

        public string? DocStatus { get; set; }

        public string? MobileNoReleaseStatus { get; set; }

        public bool? IsValid { get; set; }

        public string? Remarks { get; set; }

        public DateTime? DateOfValidity { get; set; }

        public string? DocumentvalidationYN { get; set; }

        public string? LicenseeIdNo { get; set; }






        public string? SubmitDate { get; set; }
    }


    public class ApplicationDocumentUploadDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;

        public string? MobileNo { get; set; }

        public List<LicenseApplicationUploadedDocumentDto> Documents { get; set; } = new();
    }
}
