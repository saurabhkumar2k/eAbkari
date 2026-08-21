using backend.Core.DTOs;
using backend.Core.Entities.Department;
namespace backend.Application.Interfaces.Department
{
    public interface IRoleService
    {
        Task<IEnumerable<UpdateRoleDto>> GetAllAsync();

        Task<UpdateRoleDto?> GetByIdAsync(int roleId);

        Task<string> CreateAsync(AddRoleDto model);

        Task<int> UpdateAsync(UpdateRoleDto model);

        Task<bool> DeleteAsync(int roleId);
    }
}

/*namespace backend.Application.Interfaces.Department
{
    public interface IRoleService
    {
        Task<IEnumerable<UpdateRoleDto>> GetAllAsync();

        Task<UpdateRoleDto?> GetByIdAsync(int RoleId);

        Task<string> CreateAsync(AddRoleDto model);

        Task<int> UpdateAsync(UpdateRoleDto model);
    }
}*/