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

        public string? IsActive { get; set; } = "Y";
        public int RoleId { get; set; }
    }
}
      