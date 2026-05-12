using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface IStateRepository
    {
        Task<IEnumerable<MstState>> GetStateAsync();
    }
}