using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Interfaces.Department;
using backend.Core.Entities.Department;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Infrastructure.Repositories.Department
{
    public class RolesPermissionRepository : IRolesPermissionRepository
    {
        private readonly ApplicationDbContext _context;

        public RolesPermissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DeptUserPermissions>> GetRolesPermissionAsync()
        {
            return await _context.DeptUserPermissions              
                .ToListAsync();
        }

        public async Task<DeptUserPermissions?> GetRolePermissionByPermissionId(int PermissionId)
        {
            return await _context.DeptUserPermissions
                .FirstOrDefaultAsync(r => r.PermissionId == PermissionId);
        }

        public async Task<DeptUserPermissions?> GetRolePermissionByPermissionNameAsync(string PermissionName)
        {
            return await _context.DeptUserPermissions
                .FirstOrDefaultAsync(r => r.PermissionName == PermissionName);
        }

        public async Task<bool> RoleExistsAsync(int PermissionId)
        {
            return await _context.DeptUserPermissions
                .AnyAsync(r => r.PermissionId == PermissionId);
        }

        public async Task<int> GetNextRolePermissionIdIdAsync()
        {
            int maxRoleId = await _context.DeptUserPermissions
                .MaxAsync(r => (int?)r.PermissionId) ?? 0;

            return maxRoleId + 1;
        }

        public async Task<DeptUserPermissions> CreateRolePermissionAsync(DeptUserPermissions Permissions)
        {
            _context.DeptUserPermissions.Add(Permissions);

            await _context.SaveChangesAsync();

            return Permissions;
        }

        // public async Task<MstRoles> UpdateRoleAsync(MstRoles role)
        // {
        //     _context.MstRoles.Update(role);

        //     await _context.SaveChangesAsync();

        //     return role;
        // }

        // public async Task DeleteRoleAsync(MstRoles role)
        // {
        //     _context.MstRoles.Update(role);

        //     await _context.SaveChangesAsync();
        // }

        // public async Task SaveChangesAsync()
        // {
        //     await _context.SaveChangesAsync();
        // }
    }
}


