using backend.Core.Entities.Department;

namespace backend.Application.Interfaces
{
    public interface IDepartmentUsersService
    {
        Task<IEnumerable<DepartmentUsers>> GetAllAsync();

        Task<DepartmentUsers?> GetByIdAsync(string userId);

        Task<bool> CreateAsync(DepartmentUsers model);

        Task<bool> UpdateAsync(DepartmentUsers model);
    }
}