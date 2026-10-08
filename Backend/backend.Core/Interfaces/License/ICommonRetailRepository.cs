using backend.Core.Entities;

namespace backend.Core.Interfaces.License
{
    public interface ICommonRetailRepository
    {
        Task<List<MstLicenseeCategory>> GetRetailLicenseeCategoryRepository(string[] RetailCatCodes);
    }
}