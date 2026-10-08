using backend.Core.Entities;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonRetailRepository : ICommonRetailRepository
    {
        private readonly ApplicationDbContext _context;
        public CommonRetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<MstLicenseeCategory>> GetRetailLicenseeCategoryRepository(string[] RetailCatCodes)
        {
            return await _context.MstLicenseeCategory.Where(x => RetailCatCodes.Contains(x.BranchCode)).ToListAsync();
        }
    }
}