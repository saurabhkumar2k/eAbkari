using backend.Core.Entities;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using backend.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Repositories
{
    public class PoliceStationRepository : IPoliceStationRepository
    {
        private readonly ApplicationDbContext _context;

        public PoliceStationRepository(ApplicationDbContext context)
        {
            _context = context;
        }



        public async Task<IEnumerable<MstPoliceStation>> GetPoliceStationAsync(string districtCode)
        {
            return await _context.MstPoliceStations
                .Where(ps => ps.DistrictCode == districtCode)
                .OrderBy(ps => ps.PsName)
                .ToListAsync();
        }
    }

}
