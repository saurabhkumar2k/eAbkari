using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Entities.Department;


namespace backend.Core.Interfaces.Department
{
    public interface IRolesRepository
    {
        Task<IEnumerable<MstRoles>> GetRolesAsync();
        Task<MstRoles?> GetRoleByRoleId(int roleId);
        Task<MstRoles> CreateRoleAsync(AddRoleDto model);
        Task<bool> RoleExistsAsync(int roleId);
        Task<bool> RoleExistsByNameAsync(string roleName);
        Task<MstRoles> UpdateRoleAsync(UpdateRoleDto model);
        Task DeleteRoleAsync(int roleId);

    }
}
