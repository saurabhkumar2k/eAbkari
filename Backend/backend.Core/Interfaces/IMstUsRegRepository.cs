
namespace backend.Core.Interfaces
{
    public interface IMstUsRegRepository
    {
        Task<List<MstUsRegDto>> GetUser(long regId);
    }
}
