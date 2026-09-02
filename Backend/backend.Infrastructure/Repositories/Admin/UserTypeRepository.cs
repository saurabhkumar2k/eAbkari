using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Interfaces.Admin;
using backend.Core.Entities.Department;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;


namespace backend.Infrastructure.Repositories.Admin
{
    public class UserTypeRepository : IUserTypeRepository
    {
        private readonly ApplicationDbContext _context;
        public UserTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<string> GetUserTypeDescByTypeCode(string TypeCode)
        {
            return await _context.MstUserType
                .Where(r => r.UserTypeCode == TypeCode)
                .Select(r => r.UserTypeDesc)
                .FirstOrDefaultAsync() ?? "";
        }

        public async Task<IEnumerable<MstUserType>> GetUserTypeAsync()
        {
            return await _context.MstUserType
                .Where(r => r.IsActive == "Y")
                .ToListAsync();
        }
        public async Task<MstUserType?> GetUserTypeByTypeCode(string TypeCode)
        {

            return await _context.MstUserType
                .FirstOrDefaultAsync(u => u.UserTypeCode == TypeCode);

        }
        public async Task<bool> UserTypeExistsAsync(string TypeCode)
        {
            return await _context.MstUserType
                .AnyAsync(x => x.UserTypeCode == TypeCode);
        }


        //public async Task<bool> RoleExistsByNameAsync(string roleName)
        //{
        //    return await _context.MstRoles
        //        .AnyAsync(x => x.RoleName == roleName);
        //}
        //public async Task<int> GetNextRoleIdAsync()
        //{
        //    int maxRoleId = await _context.MstRoles
        //        .MaxAsync(r => (int?)r.RoleId) ?? 0;

        //    return maxRoleId + 1;
        //}
        


        //public async Task<MstRoles> UpdateRoleAsync(UpdateRoleDto model)
        //{
        //    try
        //    {
        //        var role = await _context.MstRoles.FindAsync(model.RoleId);

        //        if (!string.IsNullOrWhiteSpace(model.RoleName))
        //            role.RoleName = model.RoleName.Trim();

        //        if (!string.IsNullOrWhiteSpace(model.RoleDescription))
        //            role.RoleDescription = model.RoleDescription.Trim();

        //        if (!string.IsNullOrWhiteSpace(model.IsActive))
        //            role.IsActive = model.IsActive.Trim();

        //        _context.MstRoles.Update(role);
        //        await _context.SaveChangesAsync();
        //        return role;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception here if you have logging

        //        throw; // Let the controller or global exception handler deal with it
        //    }

        //}

        //public async Task DeleteRoleAsync(int roleId)
        //{
        //    try
        //    {
        //        var role = await _context.MstRoles.FindAsync(roleId);

        //        if (role != null)
        //        {
        //            role.IsActive = "N";   // Soft delete
        //                                   //_context.Roles.Update(role); // Optional if tracking is enabled

        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception here if you have logging

        //        throw; // Let the controller or global exception handler deal with it
        //    }
        //}
    }
}
