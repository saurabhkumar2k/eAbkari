using backend.Application.Interfaces.Department;
using backend.Core.DTOs;
using backend.Core.Interfaces.Department;
using backend.Core.Entities.Department;

namespace backend.Application.Services.Department
{
    public class RoleService : IRoleService
    {
        private readonly IRolesRepository _rolesRepository;

        public RoleService(IRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }

        public async Task<IEnumerable<UpdateRoleDto>> GetAllAsync()
        {
            var roles = await _rolesRepository.GetRolesAsync();

            return roles
                .Where(r => r.IsActive == "Y")
                .Select(r => new UpdateRoleDto
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName,
                    RoleDescription = r.RoleDescription,
                    IsActive = r.IsActive
                });
        }

        public async Task<UpdateRoleDto?> GetByIdAsync(int roleId)
        {
            var role = await _rolesRepository.GetRoleByRoleId(roleId);

            if (role == null || role.IsActive != "Y")
            {
                return null;
            }

            return new UpdateRoleDto
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName,
                RoleDescription = role.RoleDescription,
                IsActive = role.IsActive
            };
        }

        public async Task<string> CreateAsync(AddRoleDto model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            if (string.IsNullOrWhiteSpace(model.RoleName))
            {
                throw new ArgumentException("Role name is required.");
            }

            var roleName = model.RoleName.Trim();

            // Business rule: role name must be unique
            var existingRole =
                await _rolesRepository.GetRoleByRoleNameAsync(roleName);

            if (existingRole != null)
            {
                throw new InvalidOperationException(
                    "Role already exists."
                );
            }

            // Business rule: generate next RoleId
            var nextRoleId =
                await _rolesRepository.GetNextRoleIdAsync();

            // Business rule: default active status
            var role = new MstRoles
            {
                RoleId = nextRoleId,
                RoleName = roleName,
                RoleDescription =
                    model.RoleDescription?.Trim() ?? string.Empty,
                IsActive = string.IsNullOrWhiteSpace(model.IsActive)
                    ? "Y"
                    : model.IsActive.Trim()
            };

            await _rolesRepository.CreateRoleAsync(role);

            return role.RoleName;
        }

        public async Task<int> UpdateAsync(UpdateRoleDto model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            // Business rule: RoleId must exist
            var role =
                await _rolesRepository.GetRoleByRoleId(model.RoleId);

            if (role == null)
            {
                return 0;
            }

            // Business rule: cannot update an inactive/deleted role
            if (role.IsActive != "Y")
            {
                return 0;
            }

            // Business rule: validate RoleName
            if (!string.IsNullOrWhiteSpace(model.RoleName))
            {
                var roleName = model.RoleName.Trim();

                // Business rule: prevent duplicate role names
                var existingRole =
                    await _rolesRepository.GetRoleByRoleNameAsync(roleName);

                if (existingRole != null &&
                    existingRole.RoleId != model.RoleId)
                {
                    throw new InvalidOperationException(
                        "Another role with the same name already exists."
                    );
                }

                role.RoleName = roleName;
            }

            // Business rule: update description
            if (!string.IsNullOrWhiteSpace(model.RoleDescription))
            {
                role.RoleDescription =
                    model.RoleDescription.Trim();
            }

            // Business rule: update active status if supplied
            if (!string.IsNullOrWhiteSpace(model.IsActive))
            {
                role.IsActive = model.IsActive.Trim();
            }

            await _rolesRepository.UpdateRoleAsync(role);

            return role.RoleId;
        }

        public async Task<bool> DeleteAsync(int roleId)
        {
            // Business rule: role must exist
            var role =
                await _rolesRepository.GetRoleByRoleId(roleId);

            if (role == null)
            {
                return false;
            }

            // Business rule: already inactive/deleted
            if (role.IsActive != "Y")
            {
                return false;
            }

            // Business rule: soft delete
            role.IsActive = "N";

            await _rolesRepository.DeleteRoleAsync(role);

            return true;
        }
    }
}

/*namespace backend.Application.Services.Department
{
    public class RoleService : IRoleService
    {
        private readonly IRolesRepository _rolesRepository;

        public RoleService(IRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }

        public async Task<IEnumerable<UpdateRoleDto>> GetAllAsync()
        {
            var roles = await _rolesRepository.GetRolesAsync();

            return roles.Select(role => new UpdateRoleDto
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName
            });
        }

        public async Task<UpdateRoleDto?> GetByIdAsync(int roleId)
        {
            var role = await _rolesRepository.GetRoleByRoleId(roleId);

            if (role == null)
            {
                return null;
            }

            return new UpdateRoleDto
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName
            };
        }

        public async Task<string> CreateAsync(AddRoleDto model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var roleExists = await _rolesRepository.RoleExistsByNameAsync(
                model.RoleName
            );

            if (roleExists)
            {
                return "Role already exists";
            }

            var role = await _rolesRepository.CreateRoleAsync(model);

            return role.RoleName;
        }

        public async Task<int> UpdateAsync(UpdateRoleDto model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var roleExists = await _rolesRepository.RoleExistsAsync(
                model.RoleId
            );

            if (!roleExists)
            {
                return 0;
            }

            var updatedRole = await _rolesRepository.UpdateRoleAsync(model);

            return updatedRole.RoleId;
        }

        public async Task<bool> DeleteAsync(int roleId)
        {
            var roleExists = await _rolesRepository.RoleExistsAsync(roleId);

            if (!roleExists)
            {
                return false;
            }

            await _rolesRepository.DeleteRoleAsync(roleId);

            return true;
    }
    }
}*/
