using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class DistrictRepository : IDistrictRepository
    {
        private readonly ApplicationDbContext _context;

        public DistrictRepository(ApplicationDbContext context)
        {
            _context = context;
        }

      public async Task<IEnumerable<MstDistrict>> GetDistrictAsync(string statecode)
        {
           return await _context.MstDistrict
    .Where(x => x.StateCode == statecode.ToString())
    .ToListAsync();
        }

       
    }

    
}