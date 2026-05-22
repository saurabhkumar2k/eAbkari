using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ILoginRepository
    {
        Task<IEnumerable<MM_US_MT>> GetLoginAsync();
        Task<MM_US_MT?> AuthenticateAsync(string userId, string password);

        Task<MstUsReg?> LoginAuthenticateAsync(string userId, string password);
        Task SaveTokenAsync(string userId, string token);
        Task SaveTokenPairAsync(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry);
        Task<MM_US_MT?> GetUserByRefreshTokenAsync(string refreshToken);
    }
}