using backend.Core.DTOs;
using backend.Core.Entities;

namespace backend.Application.Interfaces.License
{
    public interface ICommonRetailServices
    {
        Task<ApiResponse<List<MstLicenseeCategory>>> GetRetailLicenseeCategoryService();

        Task<RetailCompleteDto?> GetAdditionalRetailCompleteDetails(string applicationIdNo);

        Task<string> SaveAdditionalRetailCompleteDetails(RetailCompleteDto dto);
    }
}