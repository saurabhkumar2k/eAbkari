using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Entities.Department;

namespace backend.Core.Entities.Department
{
    [Table("MstUserType")]
    public class MstUserType
    {
        [Key]
        public string UserTypeCode { get; set; }

        [Required]
        [StringLength(100)]
        public string UserTypeDesc { get; set; }

        [Required]
        [StringLength(500)]
        public string UserTypeDescDisplay { get; set; }

        [Required]
        [StringLength(500)]
        public string UserAssignWork { get; set; }

        [StringLength(1)]
        public string? IsActive { get; set; }

    }
}
