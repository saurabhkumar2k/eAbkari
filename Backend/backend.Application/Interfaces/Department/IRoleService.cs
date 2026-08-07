using backend.Core.DTOs;
using backend.Core.Entities.Department;

namespace backend.Application.Interfaces.Department
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleDto>> GetAllAsync();

        Task<RoleDto?> GetByIdAsync(int RoleId);

        Task<bool> CreateAsync(AddRoleDto model);

        Task<bool> UpdateAsync(RoleDto model);
    }
}