using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class FlowHierarchyMappingDto
    {
        public int SlNo { get; set; }

        public string FlowUpto { get; set; } = string.Empty;

        public long HierarchyID { get; set; }

        public string UserID { get; set; } = string.Empty;

        public string? UserTypeCode { get; set; }

        public string? CategoryType { get; set; }

        public string? Active { get; set; }

        public DateTime? ActionDate { get; set; }
    }
}