using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;

namespace backend.Core.Interfaces.ApplicationFlow
{
    public interface IApplicationFlowRepository
    {
        Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistory accessPermissionHistory);
        Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(string userId, DateOnly fromDate, DateOnly toDate);
        Task<ApplicationFlowUserResult?> GetApplicationFlowUser(string applicationIdNo);
        Task<FlowHierarchyMapping?> GetNextReceiver(string flowUpto, string senderUserTypeCode);

        Task<PlaAccessPermissionHistory?> GetLastAccessPermissionHistory(string applicationIdNo);

        Task<string> RejectApplication(PlaAccessPermissionHistory RejectApplicationAction);

        Task<string> SendBackApplication(SendBackApplicationDto dto);

    }
}