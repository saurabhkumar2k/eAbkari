using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class GetApplicantDocRequestDto
    {
        public string CatCode { get; set; }
        public string DocType { get; set; }
    }

    public class GetApplicantDocResponseDto
    {
        public string DocDesc { get; set; }
        public string DocID { get; set; }
        public string IsMandatory { get; set; }
        public bool IsValid { get; set; }
    }

    public class GetApplicantDocumentRequestDto
    {
        public string ApplicationIdNo { get; set; }
        public string DocType { get; set; }
    }

    public class SaveAndUpdateApplicantDocumentsDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;

        public string? MobileNo { get; set; }

        //public string? ApplicantSl { get; set; }

        public string? DocId { get; set; }

        public string? DocSl { get; set; }

        //public string? DocStatus { get; set; }

        //public string? MobileNoReleaseStatus { get; set; }

        public string? IsValid { get; set; }

        //public string? Remarks { get; set; }

        public DateTime? DateOfValidity { get; set; }

        //public string? DocumentvalidationYN { get; set; } 

        //public string? LicenseeIdNo { get; set; }

        // public IFormFile? DocUrl { get; set; }

        public string? DocUrl { get; set; }       
        //public IFormFile? DocumentFile { get; set; } // ✅ POST upload

        //public string? SubmitDate { get; set; } 
        public string? DocType { get; set; } //added by Rahul for HCR
    }
}