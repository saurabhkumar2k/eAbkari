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
    [Table("DeptUserPermissions")]
    public class DeptUserPermissions
    {
        [Key]
        public int PermissionId { get; set; }

        [Required]
        [StringLength(100)]
        public string? PermissionName { get; set; }

        [Required]
        [StringLength(500)]
        public string? Description { get; set; }

        //public virtual ICollection<DeptUserRoles> DeptUserRoles { get; set; } = new List<DeptUserRoles>();
    }
}


