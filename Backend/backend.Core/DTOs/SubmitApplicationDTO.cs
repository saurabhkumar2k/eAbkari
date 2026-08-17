using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class SubmitApplicationDTO
    {
        [Required]
        public string ApplicationIdNo { get; set; } = string.Empty;


        [Required]
        public string ApplicationStatus { get; set; } = string.Empty;

    }






}