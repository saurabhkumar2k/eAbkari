using backend.Core.DTOs;

namespace backend.Application.Interfaces.ApplicationFlow
{
    public interface IApplicationScruitinyStatusService
    {
        // Task<string> ApplicationScruitinyStatus(ApplicationScruitinyStatusDto dto);

         Task<string> ApplicationScruitinyStatus(List<ApplicationScruitinyStatusDto> dtos);


        Task<List<ApplicationScruitinyStatusDto>> GetApplicationScruitinyStatus(string applicationIdNo);

        
    }
}
