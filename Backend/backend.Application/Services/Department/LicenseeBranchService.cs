using backend.Core.Entities.Department;
//using backend.Core.Interfaces;
using backend.Core.DTOs;
using System.Text.Json;
using backend.Core.Interfaces.Department;
using backend.Application.Interfaces.Department;
using System.Text;
using System.Security.Cryptography;
using backend.Core.Entities;

namespace backend.Application.Services.Department
{
    public class LicenseeBranchService : ILicenseeBranchService
    {
        private readonly ILicenseeBranchRepository _licenseeBranchRepository;

        public LicenseeBranchService(ILicenseeBranchRepository LicenseeBranchRepository)
        {
            _licenseeBranchRepository = LicenseeBranchRepository;
            
        }

        public async Task<IEnumerable<LicenseeBranchDto>> GetAllBranch()
        {
            var branches = await _licenseeBranchRepository.GetAllBranchAsync();

            if (branches == null || !branches.Any())
            {
                return Enumerable.Empty<LicenseeBranchDto>();
            }

            return branches.Select(x => new LicenseeBranchDto
            {
                BranchCode = x.BranchCode,
                BranchName = x.BranchName,
            });
        }

    }
}
