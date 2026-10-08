using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using backend.Core.Entities;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Services.License
{
    public class CommonRetailServices : ICommonRetailServices
    {
        private readonly ICommonRetailRepository _Licenserepository;
        public CommonRetailServices(ICommonRetailRepository repository)
        {
            _Licenserepository = repository;
        }
        public async Task<ApiResponse<List<MstLicenseeCategory>>> GetRetailLicenseeCategoryService()
        {
            try
            {
                var RetailCatCodes = new[] { "3", "4" };
                var response = await _Licenserepository.GetRetailLicenseeCategoryRepository(RetailCatCodes);
                if (response == null || response.Count == 0)
                {
                    return ApiResponse<List<MstLicenseeCategory>>.Fail("No Retail license category found");
                }
                else
                {
                    return ApiResponse<List<MstLicenseeCategory>>.Ok(response);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<List<MstLicenseeCategory>>.Fail("Server error, try again later", ex.Message);
            }
        }
    }
}