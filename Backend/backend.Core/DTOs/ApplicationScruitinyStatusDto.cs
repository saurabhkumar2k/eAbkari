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

        public string? IsValid { get; set; }

        public string? Remarks { get; set; }

        public DateTime? RemarkDate { get; set; }
    }

    public class ApplicationScruitinyStatusGetResultDto
    {
        public string ApplicationIdNo { get; set; }

        public string DocId { get; set; }

        public string? DocDesc { get; set; }

        public string? UploadStatus { get; set; }

        public string? Document { get; set; }

        public string? DocUrl { get; set; }

        public string? IsValid { get; set; }

        public string? Remarks { get; set; }

        public DateTime? RemarkDate { get; set; }
    }

    public class LifeCycleDto
    {
        public long Slno { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string? SenderUserID { get; set; }
        public string? ReceiverUserID { get; set; }
        public string? TransactionRemarks { get; set; }

    }
}