using backend.Core.Entities;
using backend.Core.DTOs;
using backend.Core.Entities.Department;

namespace backend.Core.Interfaces.Admin
{
    public interface IUserTypeRepository
    {
        Task<string> GetUserTypeDescByTypeCode(string TypeCode);

        Task<IEnumerable<MstUserType>> GetUserTypeAsync();

        Task<MstUserType?> GetUserTypeByTypeCode(string TypeCode);

        Task<bool> UserTypeExistsAsync(string TypeCode);
    }
}