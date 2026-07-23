using backend.Core.Entities.Department;
//using backend.Core.Interfaces;
using backend.Core.DTOs;
using System.Text.Json;
using backend.Core.Interfaces.Department;
using backend.Application.Interfaces;

namespace backend.Application.Services.Department
{
    public class DepartmentUsersService : IDepartmentUsersService
    {
        private readonly IDepartmentUserRepository _departmentUsersRepository;

        public DepartmentUsersService(IDepartmentUserRepository departmentUsersRepository)
        {
            _departmentUsersRepository  = departmentUsersRepository;
        }

        public async Task<bool> CreateAsync(DepartmentUsers model)
        {
        var dto = JsonSerializer.Deserialize<DepartmentUserDto>(
        JsonSerializer.Serialize(model));

        if (dto == null)
        throw new InvalidOperationException("Failed to map DepartmentUsers to DepartmentUserDto");

        return await _departmentUsersRepository.CreateAsync(dto);
        }

        public async Task<IEnumerable<DepartmentUsers>> GetAllAsync()
        {
        return await _departmentUsersRepository.GetAllAsync();
        }

        public async Task<DepartmentUsers?> GetByIdAsync(string userId)
        {
         return await _departmentUsersRepository.GetByIdAsync(userId);
        }

        public async Task<bool> UpdateAsync(DepartmentUsers model)
        {
         var dto = JsonSerializer.Deserialize<DepartmentUserDto>(
        JsonSerializer.Serialize(model));

        if (dto == null)
        throw new InvalidOperationException("Failed to map DepartmentUsers to DepartmentUserDto");

        return await _departmentUsersRepository.UpdateAsync(dto);
        }
   
    }
}
