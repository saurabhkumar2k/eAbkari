using backend.Core.DTOs;
using backend.Core.Entities.Department;
namespace backend.Application.Interfaces.Department
{
    public interface IUserTypeService
    {
        Task<IEnumerable<MstUserType>> GetUserType();

        Task<string> GetTypeCodeAsync(int roleId, long branchCd);
        Task<string> GetTypeCodeDescAsync(int roleId, long branchCd);

        //Task<string> CreateAsync(AddRoleDto model);

        //Task<int> UpdateAsync(UpdateRoleDto model);

        //Task<bool> DeleteAsync(int roleId);
    }
}

