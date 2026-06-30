using backend.Core.Entities;

namespace backend.Application.Interfaces;

public interface ILiquorBrandRepository
{
    Task<IEnumerable<MstLiquorCategory>> GetCategoriesAsync();
    Task<IEnumerable<MstLiquorKind>> GetKindsAsync(string catCode);
    Task<IEnumerable<MstLiquorType>> GetTypesAsync(string catCode, string kindCode);

    Task<IEnumerable<MstLiquorBrand>> GetBrandsAsync();

    Task<MstLiquorBrand> SaveBrandAsync(CreateLiquorBrandDto dto);

    Task<bool> UpdateBrandAsync(MstLiquorBrand model);

    Task<bool> DeleteBrandAsync(
        string catCode,
        string kindCode,
        string typeCode,
        string brandCode);

    Task<IEnumerable<MstLiquorMeasure>> GetLiquorMeasureAsync(string catCode,string kindCode,string typeCode);
}