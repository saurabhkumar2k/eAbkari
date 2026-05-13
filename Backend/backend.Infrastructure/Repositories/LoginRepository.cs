using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly ApplicationDbContext _context;

        public LoginRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MM_US_MT>> GetLoginAsync()
        {
            return await _context.MM_US_MTs.ToListAsync();
        }

        public async Task<MM_US_MT?> AuthenticateAsync(string userId, string password)
        {
            return await _context.MM_US_MTs
                .FirstOrDefaultAsync(u => u.User_Id == userId && u.User_Pass == password);
        }


   public async Task SaveTokenAsync(string userId, string token)
        {
            var user = await _context.MM_US_MTs.FirstOrDefaultAsync(u => u.User_Id == userId);
            if (user is null)
            {
                return;
            }

            user.Token = token;
            user.Token_Generated_At = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}
