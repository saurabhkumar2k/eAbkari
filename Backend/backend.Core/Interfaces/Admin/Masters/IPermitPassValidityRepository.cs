using backend.Core.Entities;
using backend.Core.DTOs;

namespace backend.Core.Interfaces
{
    public interface IPermitPassValidityRepository
    {
        Task<IEnumerable<MstLiquorState>> GetStatesAsync();
        Task<IEnumerable<PermitPassValidityGridDto>> GetAllAsync();
        Task<PermitPassValidityGridDto?> GetByStateCodeAsync(string stateCode);
        Task<bool> ExistsAsync(string stateCode);
        Task<bool> SaveAsync(MstLiquorStateIpValidity model);
        Task<bool> UpdateAsync(MstLiquorStateIpValidity model);
        Task<bool> DeleteAsync(string stateCode);
    }
}