using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Entities.Department;


namespace backend.Core.Interfaces
{
    public interface IRolesRepository
    {
        Task<IEnumerable<MstRoles>> GetRolesAsync();
        Task<MstRoles?> GetRoleByRoleName(string RoleName);
        Task<MstRoles> CreateRoleAsync(AddRoleDto model);
        Task<bool> RoleExistsAsync(string roleName);

    }
}
