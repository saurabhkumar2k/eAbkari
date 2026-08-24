using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using backend.Core.Entities.Department;
using backend.Core.DTOs;

namespace backend.Infrastructure.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly ApplicationDbContext _context;

        public LoginRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MstUsReg>> GetLoginAsync()
        {
            return await _context.MstUsReg.ToListAsync();
        }

        public async Task<MstUsReg?> AuthenticateAsync(string userId, string password)
        {
        
                return await _context.MstUsReg
                    .FirstOrDefaultAsync(u => u.UserId == userId && u.Password == password);
        
        }

         public async Task<MstUsReg?> LoginAuthenticateAsync(string userId, string password)
        {
            return await _context.MstUsReg
                .FirstOrDefaultAsync(u => u.UserId == userId && u.Password == password);
        }


         public async Task SaveTokenAsync(string userId, string token)
        {
            var user = await _context.MstUsReg.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user is null)
            {
                return;
            }

            user.Token = token;
            user.Token_Generated_At = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
        public async Task SaveTokenPairAsync(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry)
        {
            var user = await _context.MstUsReg.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user is null)
            {
                return;
            }

            user.Token = accessToken;
            user.Token_Generated_At = DateTime.UtcNow;
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = refreshTokenExpiry;
            await _context.SaveChangesAsync();
        }

        public async Task<MstUsReg?> GetUserByRefreshTokenAsync(string refreshToken)
        {
            return await _context.MstUsReg
                .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken && u.RefreshTokenExpiry > DateTime.UtcNow);
        }


        public async Task<DepartmentUserLoginDto?> AuthenticateDeptUserAsync(string userId, string password)
        {


            //var DepartmentUserLoginDto = await _context.DepartmentUsers
            //    .Include(x => x.DeptUserRoles)
            //    .ThenInclude(x => x.MstRoles)
            //    .FirstOrDefaultAsync(x => x.UserId == userId && x.PasswordHash == password);

            //return (DepartmentUserLoginDto.UserId, DepartmentUserLoginDto.UserName, DepartmentUserLoginDto.rolename, DepartmentUserLoginDto)

            var user = await _context.DepartmentUsers
       .Include(x => x.DeptUserRoles)
       .ThenInclude(x => x.MstRoles)
       .FirstOrDefaultAsync(x =>
           x.UserId == userId &&
           x.PasswordHash == password);
            
            
            if (user == null)
                return null;

            var userRole = user.DeptUserRoles.FirstOrDefault();


            return await _context.DepartmentUsers
                .Where(x => x.UserId == userId && x.PasswordHash == password)
                .Select(x => new DepartmentUserLoginDto
                {
                    UserId = x.UserId,
                    UserName = x.UserName,
                    RoleName = x.DeptUserRoles
                                .Select(r => r.MstRoles.RoleName)
                                .FirstOrDefault()
                })
                .FirstOrDefaultAsync();

        }

        public async Task SaveTokenPairDeptUserAsync(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry)
        {
            var user = await _context.DepartmentUsers.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user is null)
            {
                return;
            }

            user.Token = accessToken;
            user.Token_Generated_At = DateTime.UtcNow;
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = refreshTokenExpiry;
            await _context.SaveChangesAsync();
        }

    }
}
