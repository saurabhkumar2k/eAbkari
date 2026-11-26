using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
namespace backend.Application.Interfaces.ApplicationFlow
{
    public interface IApplicationFlowService
    
    {
        Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistoryDto dto);
        Task<string> RejectApplication(PlaAccessPermissionHistoryDto dto);


        Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(string userId, DateOnly fromDate, DateOnly toDate);

        Task<ApplicationFlowUserResult?> GetApplicationFlowUser(string applicationIdNo);


    }
}
