using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.DTOs;
using backend.Core.Entities.Department;

namespace backend.Core.Interfaces
{
    public interface IDepartmentUserRepository
    {
        Task<IEnumerable<DepartmentUsers>> GetAllAsync();
        Task<DepartmentUsers?> GetByIdAsync(string userId);
        Task<bool> CreateAsync(DepartmentUserDto user);
        Task<bool> UpdateAsync(DepartmentUserDto user);
        //Task<bool> DeleteAsync(string userId);
        //Task<DepartmentUsers?> LoginAsync(string email);
    }
}
