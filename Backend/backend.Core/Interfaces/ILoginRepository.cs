using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ILoginRepository
    {
        Task<IEnumerable<MstUsReg>> GetLoginAsync();
        //Task<IEnumerable<MM_US_MT?>> GetUserTypeAsync(string userId);
        Task<MM_US_MT?> GetUserTypeAsync(string userId);
        Task<MM_US_MT?> AuthenticateAsync(string userId, string password);
        Task<DepartmentUsers?> AuthenticateAsyncs(string userId, string password);
        Task<MstUsReg?> LoginAuthenticateAsync(string userId, string password);
        Task<UserSession> CreateUserSessionAsync(string userId, DateTime issuedAt, DateTime expiresAt, DateTime? lastActivity = null);
        Task SaveTokenAsync(string userId, string token);
        Task SaveTokenPairAsync(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry);
        Task SaveTokenAsyncLIC(string userId, string token);
        Task SaveTokenPairAsyncLIC(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry);
        Task SaveTokenAsyncDEP(string userId, string token);
        Task SaveTokenPairAsyncDEP(string userId, string accessToken, string refreshToken, DateTime refreshTokenExpiry);
        Task<MstUsReg?> GetUserByRefreshTokenAsync(string refreshToken);
    }
}