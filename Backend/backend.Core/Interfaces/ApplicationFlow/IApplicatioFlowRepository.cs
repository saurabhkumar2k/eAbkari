using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;

namespace backend.Core.Interfaces.ApplicationFlow
{
    public interface IApplicationFlowRepository
    {
        Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string applicationIdNo);
    }
}