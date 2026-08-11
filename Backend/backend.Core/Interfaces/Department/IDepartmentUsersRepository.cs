using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.DTOs;
using backend.Core.Entities.Department;

namespace backend.Core.Interfaces.Department
{
    public interface IDepartmentUserRepository
    {
        Task<IEnumerable<DepartmentUsers>> GetAllAsync();
        Task<DepartmentUsers?> GetByIdAsync(string userId);
        Task<bool> CreateAsync(DepartmentUsers DepartmentUser, DeptUserRoles DeptUserRoles);
         Task<bool> UpdateAsync(DepartmentUsers user, int newRoleId,long newBranchId);
        Task<int> GetNextDeptUserRoleIdAsync();

        //Task<bool> DeleteAsync(string userId);
        //Task<DepartmentUsers?> LoginAsync(string email);
    }
}
