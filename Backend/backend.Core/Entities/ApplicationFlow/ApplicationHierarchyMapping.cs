using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Entities.ApplicationFlow
{
    public class ApplicationHierarchyMapping
    {

       
        public string AppID { get; set; }

        [Required]
        [StringLength(2)]
        public string FlowUpto { get; set; } = string.Empty;

        [Required]
        public long HierarchyID { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }


    }
}
