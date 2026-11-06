using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class ApplicationScruitinyStatusDto
    {

        public string ApplicationIdNo { get; set; }

        public string UserId { get; set; }

        public string UserTypeCode { get; set; }

        public string DocId { get; set; }

        public string DocumentName { get; set; } = string.Empty;

        public string UploadStatus { get; set; } = string.Empty;

        public string DocumentType { get; set; } = string.Empty;

        public string? DocumentUrl { get; set; }

        public string? IsValid { get; set; }

        public string? Remarks { get; set; }

        public DateTime? RemarkDate { get; set; }
    }
}