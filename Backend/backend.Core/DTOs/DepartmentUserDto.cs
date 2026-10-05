using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.DTOs
{
    public class DepartmentUserDto
    {
        public string UserId { get; set; } 
        public string UserName { get; set; }

        public string UserDesignation { get; set; }

        public string Email { get; set; }

        public string MobileNo { get; set; }

        public string? IsActive { get; set; } = "Y";    
        public int RoleId { get; set; }
        public long BranchCode { get; set; }
        public long PermissionId { get; set; }
        
        //public string UserTypeCode { get; set; }

    }
    public class DepartmentUserViewDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }

        public string UserDesignation { get; set; }

        public string Email { get; set; }

        public string MobileNo { get; set; }

        public string? IsActive { get; set; } = "Y";

        public string PermissionDesc { get; set; }

        public string UserTypeDesc { get; set; }

    }
    public class DepartmentUserLoginDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }

        //public long BranchName { get; set; }
    }
}
      