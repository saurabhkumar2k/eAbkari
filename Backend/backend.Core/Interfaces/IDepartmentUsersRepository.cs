using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Entities.Department;

namespace backend.Core.Interfaces
{
    public interface IDepartmentUsersRepository
    {
        Task<long> CreateAsync(DepartmentUsers model);
        Task<IEnumerable<DepartmentUsers>> GetLoginAsync();
        Task<DepartmentUsers?> AuthenticateAsync(string userId, string password);

        Task<DepartmentUsers?> LoginAuthenticateAsync(string userId, string password);
        Task SaveTokenAsync(string userId, string token);
        Task SaveTokenPairAsync(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry);
        Task<DepartmentUsers?> GetUserByRefreshTokenAsync(string refreshToken);
    }
}
