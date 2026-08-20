using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class PlaAccessPermissionHistoryDto
    {
        public string? ApplicationIdNo { get; set; }

        public string? FlowUpto { get; set; }

        public long TransactionSiNo { get; set; }

        public DateTime? TransactionDate { get; set; }

        public string SenderUserTypeCode { get; set; } = string.Empty;

        public string? SenderUserID { get; set; }

        public long SenderForwardingLevel { get; set; }

        public string ReceiverUserTypeCode { get; set; } = string.Empty;

        public string? ReceiverUserID { get; set; } = string.Empty;

        public string? ReceiverForwardingLevel { get; set; } = string.Empty;

        public string? PreScrutinyStatus { get; set; } = string.Empty;

        public string? FixDateEnquiry { get; set; } = string.Empty;

        public string? TransactionRemarks { get; set; } = string.Empty;

        public string? TransactionStatusCode { get; set; } = string.Empty;

        public DateTime? OprDate { get; set; }
    }
}