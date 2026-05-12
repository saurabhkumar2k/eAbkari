using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class SubDivisionRepository : ISubDivisionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubDivisionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MstSubDivision>> GetSubDivisionAsync(string districtCode)
        {
           return await _context.MstSubDivisions
    .Where(x => x.DistrictCode == districtCode.ToString())
    .ToListAsync();
        }

        
    }
}