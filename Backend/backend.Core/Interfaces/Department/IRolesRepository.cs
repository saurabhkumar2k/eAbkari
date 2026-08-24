using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.DTOs;
using backend.Core.Entities.Department;


namespace backend.Core.Interfaces.Department
{
    public interface IRolesRepository
    {
        Task<IEnumerable<MstRoles>> GetRolesAsync();

        Task<MstRoles?> GetRoleByRoleId(int roleId);

        Task<MstRoles?> GetRoleByRoleNameAsync(string roleName);

        Task<int> GetNextRoleIdAsync();

        Task<MstRoles> CreateRoleAsync(MstRoles role);

        Task<MstRoles> UpdateRoleAsync(MstRoles role);

        Task DeleteRoleAsync(MstRoles role);

        Task<bool> RoleExistsAsync(int roleId);

        Task SaveChangesAsync();
    }
}

/*namespace backend.Core.Interfaces.Department
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
        Task<string> GetRoleNameByRoleId(int roleId);
    }
}*/
