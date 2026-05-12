using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class StateRepository : IStateRepository
    {
        private readonly ApplicationDbContext _context;

        public StateRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MstState>> GetStateAsync()
        {
            return await _context.MstStates
                .OrderBy(x => x.StateName)
                .ToListAsync();
        }
    }
}