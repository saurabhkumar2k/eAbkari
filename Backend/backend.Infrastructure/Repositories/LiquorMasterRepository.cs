using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class LiquorMasterRepository : ILiquorMasterRepository
    {
      private readonly ApplicationDbContext _context;

        public LiquorMasterRepository(ApplicationDbContext context)
        {
            _context = context;
        }
      public async Task<IEnumerable<MstLiquorKind>> GetLiquorKindAsync()
        {
           return await _context.MstLiquorKind
              .OrderBy(x => x.LiquorKindDesc)
                .ToListAsync();

        }
      public async Task<IEnumerable<MstLiquorCategory>> GetLiquorCategoryAsync()
        {
           return await _context.MstLiquorCategory
              .OrderBy(x => x.LiquorCatDesc)
                .ToListAsync();

        }      

      public async Task<IEnumerable<MstLiquorBottler>> GetLiquorBottlerAsync()
        {
           return await _context.MstLiquorBottler
              .OrderBy(x => x.LiquorBottlerCode)
                .ToListAsync();

        }
                
       public async Task<IEnumerable<MstLicenseeCategory>> GetLicenseeCategoryAsync()
        {
           return await _context.MstLicenseeCategory
              .OrderBy(x => x.LicenseeCatCode)
                .ToListAsync();

        }
        
         public async Task<IEnumerable<MstLiquorMeasure>> GetLiquorMeasureAsync()
        {
           return await _context.MstLiquorMeasure
              .OrderBy(x => x.LiquorCatCode)
                .ToListAsync();

        }

    public async Task<IEnumerable<MstLiquorType>> GetLiquorTypeAsync()
        {
           return await _context.MstLiquorType
              .OrderBy(x => x.LiquorCatCode)
                .ToListAsync();

        }


        public async Task<IEnumerable<MstLicenseeCategory>> GetWholesaleLicenseeCategoryAsync()
        {
            var wholesaleCodes = new[] { "10", "15", "16", "37", "90", "92" };

            return await _context.MstLicenseeCategory
                .Where(x => wholesaleCodes.Contains(x.LicenseeCatCode.Trim()))
                .ToListAsync();
        }




    }
    
}