using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;

namespace backend.Core.Interfaces.ApplicationFlow
{
    public interface IApplicationScruitinyStatusRepository
    {
        // Task<string> ApplicationScruitinyStatus(ApplicationScruitinyStatus scruitinyStatus);

         Task<string> ApplicationScruitinyStatus(List<ApplicationScruitinyStatus> scrutinyStatuses);

        Task<List<ApplicationScruitinyStatusGetResultDto>> GetApplicationScruitinyStatus(string applicationIdNo);
    }
}