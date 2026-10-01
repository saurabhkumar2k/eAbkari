using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.DTOs
{
    public class LicenseeBranchDto
    {
        public long BranchCode { get; set; }
        public string BranchName { get; set; }
    }
}
