using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ILoginRepository
    {
        Task<IEnumerable<MstUsReg>> GetLoginAsync();
        Task<MstUsReg?> AuthenticateAsync(string userId, string password);

        Task<MstUsReg?> LoginAuthenticateAsync(string userId, string password);
        Task SaveTokenAsync(string userId, string token);
        Task SaveTokenPairAsync(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry);
        Task<MstUsReg?> GetUserByRefreshTokenAsync(string refreshToken);
    }
}