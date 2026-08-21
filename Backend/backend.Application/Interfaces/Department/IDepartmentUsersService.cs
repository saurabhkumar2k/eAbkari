using backend.Core.DTOs;
using backend.Core.Entities.Department;

namespace backend.Application.Interfaces.Department
{
    public interface IDepartmentUsersService
    {
        Task<IEnumerable<DepartmentUserDto>> GetAllAsync();

        Task<DepartmentUserDto?> GetByIdAsync(string userId);

        Task<bool> CreateAsync(DepartmentUserDto model);

        Task<bool> UpdateAsync(DepartmentUserDto model);
        
    }
}