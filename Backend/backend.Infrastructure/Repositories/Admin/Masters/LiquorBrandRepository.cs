using Microsoft.EntityFrameworkCore;
using backend.Application.Interfaces;
using backend.Core.Entities;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories;

public class LiquorBrandRepository : ILiquorBrandRepository
{
    private readonly ApplicationDbContext _context;

    public LiquorBrandRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MstLiquorCategory>> GetCategoriesAsync()
    {
        return await _context.MstLiquorCategory
            .Where(x => x.DeleteStatus == "N")
            .OrderBy(x => x.LiquorCatDesc)
            .ToListAsync();
    }

    public async Task<IEnumerable<MstLiquorKind>> GetKindsAsync(string catCode)
    {
        return await _context.MstLiquorKind
            .Where(x =>
                x.LiquorCatCode == catCode &&
                x.DeleteStatus == "N")
            .OrderBy(x => x.LiquorKindDesc)
            .ToListAsync();
    }

    public async Task<IEnumerable<MstLiquorType>> GetTypesAsync(
        string catCode,
        string kindCode)
    {
        return await _context.MstLiquorType
            .Where(x =>
                x.LiquorCatCode == catCode &&
                x.LiquorKindCode == kindCode &&
                x.DeleteStatus == "N")
            .OrderBy(x => x.LiquorTypeDesc)
            .ToListAsync();
    }

    public async Task<IEnumerable<MstLiquorBrand>> GetBrandsAsync()
    {
        return await _context.MstLiquorBrand
            .Where(x => x.DeleteStatus == "N")
            .ToListAsync();
    }

    public async Task<MstLiquorBrand> SaveBrandAsync(CreateLiquorBrandDto dto)
    {
        var maxCode = await _context.MstLiquorBrand
            .Where(x =>
                x.LiquorCatCode == dto.LiquorCatCode &&
                x.LiquorKindCode == dto.LiquorKindCode &&
                x.LiquorTypeCode == dto.LiquorTypeCode)
            .CountAsync();

        var brandCode = (maxCode + 1)
            .ToString()
            .PadLeft(4, '0');

        var brand = new MstLiquorBrand
        {
            LiquorCatCode = dto.LiquorCatCode,
            LiquorKindCode = dto.LiquorKindCode,
            LiquorTypeCode = dto.LiquorTypeCode,
            LiquorBrandCode = brandCode,
            LiquorBrandDesc = dto.LiquorBrandDesc,
            BrandNameAlias = dto.BrandNameAlias,
            QuartsMeasure = dto.QuartsMeasure,
            DeleteStatus = "N"
        };

        _context.MstLiquorBrand.Add(brand);

        await _context.SaveChangesAsync();

        return brand;
    }

    public async Task<bool> UpdateBrandAsync(MstLiquorBrand model)
    {
        var brand = await _context.MstLiquorBrand
            .FirstOrDefaultAsync(x =>
                x.LiquorCatCode == model.LiquorCatCode &&
                x.LiquorKindCode == model.LiquorKindCode &&
                x.LiquorTypeCode == model.LiquorTypeCode &&
                x.LiquorBrandCode == model.LiquorBrandCode);

        if (brand == null)
            return false;

        brand.LiquorBrandDesc = model.LiquorBrandDesc;
        brand.BrandNameAlias = model.BrandNameAlias;
        brand.QuartsMeasure = model.QuartsMeasure;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteBrandAsync(
        string catCode,
        string kindCode,
        string typeCode,
        string brandCode)
    {
        var brand = await _context.MstLiquorBrand
            .FirstOrDefaultAsync(x =>
                x.LiquorCatCode == catCode &&
                x.LiquorKindCode == kindCode &&
                x.LiquorTypeCode == typeCode &&
                x.LiquorBrandCode == brandCode);

        if (brand == null)
            return false;

        brand.DeleteStatus = "Y";

        await _context.SaveChangesAsync();

        return true;
    }

public async Task<IEnumerable<MstLiquorMeasure>> GetLiquorMeasureAsync(string catCode,string kindCode,string typeCode)
{
    return await _context.MstLiquorMeasure
        .Where(x =>
            x.LiquorCatCode == catCode &&
            x.LiquorKindCode == kindCode &&
            x.LiquorTypeCode == typeCode)
        .ToListAsync();
}

}