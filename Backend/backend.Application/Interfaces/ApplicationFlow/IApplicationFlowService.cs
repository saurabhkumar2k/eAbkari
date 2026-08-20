using backend.Core.DTOs;

namespace backend.Application.Interfaces.ApplicationFlow
{
    public interface IApplicationFlowService
    {
        Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string applicationIdNo);
    }
}
