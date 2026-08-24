using backend.Core.DTOs;

namespace backend.Application.Interfaces.ApplicationFlow
{
    public interface IApplicationFlowService
    
    {
        Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistoryDto dto);

        Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string applicationIdNo);
    }
}
