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
    [Table("MstRoles")]
    public class MstRoles
    {
        [Key]
        public int RoleId { get; set; }

        [Required]
        [StringLength(100)]
        public string RoleName { get; set; }

        [Required]
        [StringLength(500)]
        public string RoleDescription { get; set; }

        [StringLength(1)]
        public string? IsActive { get; set; }

        public virtual ICollection<DeptUserRoles> DeptUserRoles { get; set; } = new List<DeptUserRoles>();
    }
}


