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

            try
            {


                var wholesaleCodes = new[] { "10", "15", "16", "37", "90", "92" };

                return await _context.MstLicenseeCategory
                    .Where(x => wholesaleCodes.Contains(x.LicenseeCatCode.Trim()))
                    .ToListAsync();
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }

        }

        public async Task<IEnumerable<MstLicenseeCategory>> GetHCRLicenseeCategoryAsync()
        {

            try
            {


                var HCRCodes = new[] { "03", "04", "05", "06", "07","30","31","32","33","34","35","36"};

                return await _context.MstLicenseeCategory
                    .Where(x => HCRCodes.Contains(x.LicenseeCatCode.Trim()))
                    .ToListAsync();
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }

        }




    }
    
}