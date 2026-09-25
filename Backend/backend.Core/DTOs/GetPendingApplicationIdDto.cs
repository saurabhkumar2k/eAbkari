using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    
    public class GetApplicationIdRequestDto
    {
        public string CatCode { get; set; } 
        public int RegID { get; set; }
        // public string FinYear { get; set; } 
    }

    public class ApplicationIdResponseDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;
    }
}