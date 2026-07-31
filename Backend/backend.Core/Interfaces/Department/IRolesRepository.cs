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
        Task<bool> CreateRoleAsync(MstRoles model);
        Task<int> GetNextRoleIdAsync();
        Task<bool> RoleExistsAsync(int roleId);
        Task<bool> RoleExistsByNameAsync(string roleName);
        Task<bool> UpdateRoleAsync(MstRoles model);
        Task DeleteRoleAsync(int roleId);
        Task<string> GetRoleNameByRoleId(int roleId);

      
       
        

    }
}
