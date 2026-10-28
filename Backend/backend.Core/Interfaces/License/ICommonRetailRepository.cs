using backend.Core.DTOs;
using backend.Core.Entities;

namespace backend.Core.Interfaces.License
{
    public interface ICommonRetailRepository
    {
        Task<List<MstLicenseeCategory>> GetRetailLicenseeCategoryRepository(string[] RetailCatCodes);
        Task<RetailCompleteDto?> GetAdditionalRetailCompleteDetails(string applicationIdNo);

        Task<string> SaveAdditionalRetailCompleteDetails(RetailCompleteDto dto);
    }
}