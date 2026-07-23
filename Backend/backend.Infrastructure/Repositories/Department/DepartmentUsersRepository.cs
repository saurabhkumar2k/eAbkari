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
        public async Task<bool> CreateAsync(DepartmentUserDto user)
        {
            var roleName = await GetRoleNameByRoleId(user.RoleId);

            var firstName = user.UserName.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries)[0];

            var usrId = $"{roleName}-{firstName}";
            var DepartmentUser = new DepartmentUsers
            {
                UserId = usrId,
                UserName = user.UserName.Trim(),
                UserDesignation = user.UserDesignation.Trim(),
                Email = user.Email,
                IsActive = string.IsNullOrWhiteSpace(user.IsActive) ? "Y" : user.IsActive,
                CreatedDate = DateTime.Now
            };

            // 2. Default Password
            string defaultPassword = "Test@123";

            // 3. SHA256 Hash
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(defaultPassword);
                byte[] hashBytes = sha256.ComputeHash(bytes);

                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("X2"));
                }


                DepartmentUser.PasswordHash = sb.ToString();
            }
            var DeptUserRoleId = await GetNextDeptUserRoleIdAsync();
            var DeptUserRoles = new DeptUserRoles
            {
                 
                DeptUserRoleId = DeptUserRoleId,
                UserId = usrId,
                RoleId = user.RoleId
            };

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
        public async Task<bool> UpdateAsync(DepartmentUserDto user )
        {
            var existingUser = await _context.DepartmentUsers
                .Include(x => x.DeptUserRoles)
                .FirstOrDefaultAsync(x => x.UserId == user.UserId);

            if (existingUser == null)
                return false;

            existingUser.UserName = user.UserName;
            existingUser.UserDesignation = user.UserDesignation;
            existingUser.Email = user.Email;
            existingUser.IsActive = user.IsActive;
            existingUser.UpdatedDate = DateTime.Now;

            _context.DeptUserRoles.RemoveRange(existingUser.DeptUserRoles);

            //foreach (var roleId in roleIds)
            //{
            //    existingUser.DeptUserRoles.Add(new DeptUserRoles
            //    {
            //        UserId = existingUser.UserId,
            //        RoleId = roleId
            //    });
            //}

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