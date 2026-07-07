using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Interfaces;
using backend.Core.Entities.Department;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class RolesRepository : IRolesRepository
    {
        private readonly ApplicationDbContext _context;
        public RolesRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<MstRoles>> GetRolesAsync()
        {
            return await _context.MstRoles.ToListAsync();
        }
        public async Task<MstRoles?> GetRoleByRoleName(string RoleName)
        {

            return await _context.MstRoles
                .FirstOrDefaultAsync(u => u.RoleName == RoleName);

        }
        public async Task<MstRoles> CreateRoleAsync(AddRoleDto model)
        {
            var role = new MstRoles
            {
                RoleName = model.RoleName.Trim(),
                RoleDescription = model.RoleDescription.Trim(),
                IsActive = string.IsNullOrWhiteSpace(model.IsActive)
                ? "Y"
                : model.IsActive
            };

            _context.MstRoles.Add(role);
            await _context.SaveChangesAsync();

            return role;
        }
        public async Task<bool> RoleExistsAsync(string roleName)
        {
            return await _context.MstRoles
                .AnyAsync(x => x.RoleName == roleName);
        }
    }
}

