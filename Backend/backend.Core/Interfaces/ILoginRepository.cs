using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ILoginRepository
    {
        Task<IEnumerable<MM_US_MT>> GetLoginAsync();
        Task<MM_US_MT?> AuthenticateAsync(string userId, string password);
    }
}