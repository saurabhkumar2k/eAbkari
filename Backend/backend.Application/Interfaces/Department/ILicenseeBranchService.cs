using backend.Core.DTOs;
using backend.Core.Entities;
using backend.Core.Entities.Department;

namespace backend.Application.Interfaces.Department
{
    public interface ILicenseeBranchService
    {
        Task<IEnumerable<LicenseeBranchDto>> GetAllBranch();

    }
}