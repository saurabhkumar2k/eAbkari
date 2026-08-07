using backend.Core.Entities.Department;
//using backend.Core.Interfaces;
using backend.Core.DTOs;
using System.Text.Json;
using backend.Core.Interfaces.Department;
using backend.Application.Interfaces.Department;
using System.Text;
using System.Security.Cryptography;
using System.Reflection;
using System.Data;

namespace backend.Application.Services.Department
{
    public class RoleService : IRoleService
    {

        private readonly IRolesRepository _rolesRepository;


        public RoleService(IRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }


        public async Task<IEnumerable<RoleDto>> GetAllAsync()
        {
            var roles = await _rolesRepository.GetRolesAsync();

            if (roles == null || !roles.Any())
            {
                return Enumerable.Empty<RoleDto>();
            }

            return roles.Select(x => new RoleDto
            {
                RoleId = x.RoleId,
                RoleName = x.RoleName,
                RoleDescription = x.RoleDescription,
                IsActive = x.IsActive
            });
        }

        public async Task<RoleDto?> GetByIdAsync(int RoleId)
        {
            var role = await _rolesRepository.GetRoleByRoleId(RoleId);

            if (role == null)
            {
                return null;
            }

            return new RoleDto
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName,
                RoleDescription = role.RoleDescription,
                IsActive = role.IsActive
            };
        }




        public async Task<bool> CreateAsync(AddRoleDto role)
        {
            if (role == null)
                throw new ArgumentNullException(nameof(role));
  
            if (string.IsNullOrWhiteSpace(role.RoleName))
                throw new ArgumentException("UserName is required.");

            if (string.IsNullOrWhiteSpace(role.RoleDescription))
                throw new ArgumentException("Email is required.");

            // Optional: Check if the user already exists
            var existingUser = await _rolesRepository.RoleExistsByNameAsync(role.RoleName);

            if (existingUser)
                throw new InvalidOperationException("User already exists.");



            var maxid = await _rolesRepository.GetNextRoleIdAsync();
            var newRole = new MstRoles
            {
                RoleId = maxid,
                RoleName = role.RoleName.Trim(),
                RoleDescription = role.RoleDescription.Trim(),
                IsActive = string.IsNullOrWhiteSpace(role.IsActive)
                ? "Y"
            : role.IsActive
            };

            return await _rolesRepository.CreateRoleAsync(newRole);
        }




        public async Task<bool> UpdateAsync(RoleDto model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            if (model.RoleId <= 0)
                throw new ArgumentException("Invalid Role Id.");

            if (string.IsNullOrWhiteSpace(model.RoleName))
                throw new ArgumentException("Role Name is required.");

            if (string.IsNullOrWhiteSpace(model.RoleDescription))
                throw new ArgumentException("Role Description is required.");

            // Get existing role
            var role = await _rolesRepository.GetRoleByRoleId(model.RoleId);

            if (role == null)  
                throw new KeyNotFoundException("Role not found.");

            // Check if another role already has the same name
            var exists = await _rolesRepository.RoleExistsByNameAsync(model.RoleName);

            if (exists)
                throw new InvalidOperationException("Role name already exists.");


      
            // Update fields
            role.RoleName = model.RoleName.Trim();
            role.RoleDescription = model.RoleDescription.Trim();
            role.IsActive = string.IsNullOrWhiteSpace(model.IsActive)
                ? "Y"
                : model.IsActive.Trim();

            // Save changes
            return await _rolesRepository.UpdateRoleAsync(role);
        }

    }
}
