using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Entities.Licence
{
    public class LicenseApplicationUploadedDocument
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? ID { get; set; }

        public string ApplicationIdNo { get; set; } = string.Empty;

        public string? MobileNo { get; set; }

        public string? ApplicantSl { get; set; }

        public string? DocId { get; set; }

        public string? DocSl { get; set; }

        public string? DocUrl { get; set; }

        public string? DocStatus { get; set; }

        public string? MobileNoReleaseStatus { get; set; }

        public bool? IsValid { get; set; }

        public string? Remarks { get; set; }

        public DateTime? DateOfValidity { get; set; }

        public string? DocumentvalidationYN { get; set; }

        public string? LicenseeIdNo { get; set; }

        public DateTime? SubmitDate { get; set; }
    }



}
