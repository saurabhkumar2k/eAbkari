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
using backend.Core.DTOs;
using System.Security.Cryptography;


namespace backend.Infrastructure.Repositories.Department
{

    using Microsoft.EntityFrameworkCore;

    public class DepartmentUserRepository : IDepartmentUserRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentUserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DepartmentUsers>> GetAllAsync()
        {
            return await _context.DepartmentUsers
                .Include(x => x.DeptUserRoles)
                .ThenInclude(x => x.MstRoles)
                .ToListAsync();
        }

        public async Task<DepartmentUsers?> GetByIdAsync(string userId)
        {
            return await _context.DepartmentUsers
                .Include(x => x.DeptUserRoles)
                .ThenInclude(x => x.MstRoles)
                .FirstOrDefaultAsync(x => x.UserId == userId);
        }
        public async Task<string> GetRoleNameByRoleId(int roleId)
        {
            return await _context.MstRoles
                .Where(r => r.RoleId == roleId)
                .Select(r => r.RoleName)
                .FirstOrDefaultAsync() ?? "";
        }
        public async Task<bool> CreateAsync(DepartmentUsers DepartmentUser, DeptUserRoles DeptUserRoles)
        {


            await _context.DepartmentUsers.AddAsync(DepartmentUser);

            await _context.DeptUserRoles.AddAsync(DeptUserRoles);

            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<int> GetNextDeptUserRoleIdAsync()
        {
            int maxId = await _context.DeptUserRoles
                .MaxAsync(r => (int?)r.DeptUserRoleId) ?? 0;

            return maxId + 1;
        }
        public async Task<bool> UpdateAsync(DepartmentUsers user, int newRoleId)
        {
            var existingUser = await _context.DepartmentUsers
                .FirstAsync(x => x.UserId == user.UserId);

            existingUser.UserName = user.UserName;
            existingUser.UserDesignation = user.UserDesignation;
            existingUser.Email = user.Email;
            existingUser.IsActive = user.IsActive;
            existingUser.UpdatedDate = DateTime.Now;

            var activeRole = await _context.DeptUserRoles
                .FirstOrDefaultAsync(x => x.UserId == user.UserId && x.IsActive == "Y");

            if (activeRole != null && activeRole.RoleId != newRoleId)
            {
                // Deactivate old role
                activeRole.IsActive = "N";

                // Insert new role
                _context.DeptUserRoles.Add(new DeptUserRoles
                {
                    UserId = user.UserId,
                    RoleId = newRoleId,
                    IsActive = "Y"
                });
            }

            return await _context.SaveChangesAsync() > 0;
        }

        //public async Task<bool> DeleteAsync(string userId)
        //{
        //    var user = await _context.DepartmentUsers
        //        .Include(x => x.DeptUserRoles)
        //        .FirstOrDefaultAsync(x => x.UserId == userId);

        //    if (user == null)
        //        return false;

        //    _context.DeptUserRoles.RemoveRange(user.DeptUserRoles);
        //    _context.DepartmentUsers.Remove(user);

        //    return await _context.SaveChangesAsync() > 0;
        //}

        //public async Task<DepartmentUsers?> LoginAsync(string email)
        //{
        //    return await _context.DepartmentUsers
        //        .Include(x => x.DeptUserRoles)
        //        .ThenInclude(x => x.MstRoles)
        //        .FirstOrDefaultAsync(x => x.Email == email && x.IsActive == "Y");
        //}
    }
}