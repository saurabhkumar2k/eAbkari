using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class SubmitApplicationDTO
    {
        [Required]
        public string ApplicationIdNo { get; set; } 
        [Required]
        public string ApplicationStatus { get; set; }

    }
}