using backend.Core.DTOs;
using backend.Core.Entities;

namespace backend.Core.Interfaces.License
{
    public interface ICommonRetailRepository
    {
        Task<List<MstLicenseeCategory>> GetRetailLicenseeCategoryRepository(string[] RetailCatCodes);
        Task<RetailCommonCompleteGetDto?> GetAdditionalRetailCompleteDetails(string applicationIdNo);
        Task<RetailL10L22CommonGetDto?> GetAdditionalRetailL10L22CompleteDetails(string applicationIdNo);


        Task<string> SaveAdditionalRetailCompleteDetails(RetailCommonCompleteSaveDto dto);
        Task<string> SaveAdditionalRetailL10L22CompleteDetails(RetailL10L22CommonSaveDto dto);

    }
}