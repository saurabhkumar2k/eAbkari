using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Entities.Department
{
    [Table("MstLicenseeCategoryBranch")]
    public class MstLicenseeCategoryBranch
    {
        [Key]
        public long BranchCode { get; set; }

        [StringLength(50)]
        public string BranchName { get; set; }

        [StringLength(1)]
        public string IsActive { get; set; }

        //public virtual ICollection<DeptUserRoles> DeptUserRoles { get; set; } = new List<DeptUserRoles>();
    }
}
