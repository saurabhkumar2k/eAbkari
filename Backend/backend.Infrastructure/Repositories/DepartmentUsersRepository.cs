using Microsoft.EntityFrameworkCore;
using backend.Core.Entities.Department;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using System.Security.Cryptography;
using System.Text;

namespace backend.Infrastructure.Repositories
{

    public class DepartmentUsersRepository : IDepartmentUsersRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentUsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }



        public async Task<long> CreateAsync(DepartmentUsers model)
        {


            //string? lastUid = await _context.MstUsReg
            //    .OrderByDescending(x => x.RegId)
            //    .Select(x => x.UserId)
            //    .FirstOrDefaultAsync();

            //if (string.IsNullOrEmpty(lastUid))
            //{
            //    // No record exists yet
            //    model.UserId = "EXD00001";
            //}
            //else
            //{

            //    int number = int.Parse(lastUid.Substring(3));


            //    model.UserId = "EXD" + (number + 1).ToString("D7");
            //}

            //// 2. Default Password
            //string defaultPassword = "Test@123";

            //// 3. SHA256 Hash
            //using (var sha256 = SHA256.Create())
            //{
            //    byte[] bytes = Encoding.UTF8.GetBytes(defaultPassword);
            //    byte[] hashBytes = sha256.ComputeHash(bytes);

            //    StringBuilder sb = new StringBuilder();
            //    foreach (byte b in hashBytes)
            //    {
            //        sb.Append(b.ToString("X2"));
            //    }


            //    model.Password = sb.ToString();
            //}

            //_context.MstUsReg.Add(model);
            //await _context.SaveChangesAsync();

            //return model.RegId;
            return await _context.SaveChangesAsync();
        }




        public async Task<IEnumerable<DepartmentUsers>> GetLoginAsync()
        {
            return await _context.DepartmentUsers.ToListAsync();
        }

        public async Task<DepartmentUsers?> AuthenticateAsync(string userId, string password)
        {

            return await _context.DepartmentUsers
                .FirstOrDefaultAsync(u => u.UserId == userId && u.PasswordHash == password);

        }

        public async Task<DepartmentUsers?> LoginAuthenticateAsync(string userId, string password)
        {
            return await _context.DepartmentUsers
                .FirstOrDefaultAsync(u => u.UserId == userId && u.PasswordHash == password);
        }


        public async Task SaveTokenAsync(string userId, string token)
        {
            var user = await _context.DepartmentUsers.FirstOrDefaultAsync(u => u.UserId == userId);
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

        public async Task<DepartmentUsers?> GetUserByRefreshTokenAsync(string refreshToken)
        {
            return await _context.DepartmentUsers
                .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken && u.RefreshTokenExpiry > DateTime.UtcNow);
        }
    }

}