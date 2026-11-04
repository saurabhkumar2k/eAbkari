using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;

namespace backend.Core.Interfaces.ApplicationFlow
{
    public interface IApplicationFlowRepository
    {
        Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistory accessPermissionHistory);
        Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(string userId, DateOnly fromDate, DateOnly toDate);
    }
}