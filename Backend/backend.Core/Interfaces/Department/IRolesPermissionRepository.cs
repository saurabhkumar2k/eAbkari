using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.DTOs;
using backend.Core.Entities.Department;


namespace backend.Core.Interfaces.Department
{
    public interface IRolesPermissionRepository
    {
        Task<IEnumerable<DeptUserPermissions>> GetRolesPermissionAsync();

        Task<DeptUserPermissions?> GetRolePermissionByPermissionId(int PermissionId);

        Task<DeptUserPermissions?> GetRolePermissionByPermissionNameAsync(string PermissionName);

        Task<int> GetNextRolePermissionIdIdAsync();

        Task<DeptUserPermissions> CreateRolePermissionAsync(DeptUserPermissions Permissions);

        //Task<MstRoles> UpdateRoleAsync(MstRoles role);

        //Task DeleteRoleAsync(MstRoles role);

        //Task<bool> RolePermissionIdExistsAsync(int PermissionId);

        //Task SaveChangesAsync();
    }
}

