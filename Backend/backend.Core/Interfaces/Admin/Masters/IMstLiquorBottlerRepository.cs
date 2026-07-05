using backend.Core.Entities;
using backend.Application.DTOs;
namespace backend.Core.Interfaces
{
    public interface IMstLiquorBottlerRepository
    {
        Task<IEnumerable<MstLiquorBottler>> GetAllAsync();

        Task<MstLiquorBottler?> GetByCodeAsync(string code);

        Task<bool> SaveAsync(MstLiquorBottler bottler);

        Task<bool> UpdateAsync(MstLiquorBottler bottler);

        Task<bool> DeleteAsync(string code);

        Task<IEnumerable<MstLiquorState>> GetStatesAsync();

        Task<IEnumerable<string>> GetOriginsAsync();

        Task<IEnumerable<string>> GetBottlerCodesAsync(string? origin = null, string? stateCode = null);

        Task<bool> IsDuplicateAsync(string code);
        Task<IEnumerable<BottlerGridDto>> GetGridAsync(string origin, string? stateCode);
    }
}