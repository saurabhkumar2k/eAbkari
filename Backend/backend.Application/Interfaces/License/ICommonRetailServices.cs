using backend.Core.Entities;

namespace backend.Application.Interfaces.License
{
    public interface ICommonRetailServices
    {
        Task<ApiResponse<List<MstLicenseeCategory>>> GetRetailLicenseeCategoryService();
    }
}