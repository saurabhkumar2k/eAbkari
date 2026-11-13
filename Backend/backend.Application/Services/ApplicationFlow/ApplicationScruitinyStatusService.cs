using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;
using Microsoft.EntityFrameworkCore.Metadata;


namespace backend.Application.Services.ApplicationFlow
{
    public class ApplicationScruitinyStatusService : IApplicationScruitinyStatusService
    {
        private readonly IApplicationScruitinyStatusRepository _applicationScruitinyStatusRepository;

        public ApplicationScruitinyStatusService(IApplicationScruitinyStatusRepository applicationScruitinyStatusRepository)
        {

            this._applicationScruitinyStatusRepository = applicationScruitinyStatusRepository;
        }

        // public async Task<string> ApplicationScruitinyStatus(ApplicationScruitinyStatusDto dto)
        // {
        //     if (dto == null)
        //     {
        //         throw new ArgumentNullException(nameof(dto), "Scruitiny data cannot be null.");
        //     }

        //     var scruitinystatus = new ApplicationScruitinyStatus
        //     {
        //         ApplicationIdNo = dto.ApplicationIdNo,
        //         UserId = dto.UserId,
        //         UserTypeCode = dto.UserTypeCode,
        //         DocId = dto.DocId,
        //         IsValid = dto.IsValid,
        //         Remarks = dto.Remarks,
        //         RemarkDate = dto.RemarkDate

        //     };

        //     await _applicationScruitinyStatusRepository.ApplicationScruitinyStatus(scruitinystatus);
        //     return scruitinystatus.ApplicationIdNo;
        // }

        public async Task<string> ApplicationScruitinyStatus(List<ApplicationScruitinyStatusDto> dtos)
        {
            if (dtos == null || !dtos.Any())
            {
                throw new ArgumentException("Scrutiny data cannot be empty.");
            }

            var scrutinyEntities = dtos.Select(dto =>
                new ApplicationScruitinyStatus
                {
                    ApplicationIdNo = dto.ApplicationIdNo,
                    UserId = dto.UserId,
                    UserTypeCode = dto.UserTypeCode,
                    DocId = dto.DocId,
                    IsValid = dto.IsValid,
                    Remarks = dto.Remarks,
                    RemarkDate = dto.RemarkDate
                }).ToList();

            await _applicationScruitinyStatusRepository.ApplicationScruitinyStatus(scrutinyEntities);

            return scrutinyEntities.First().ApplicationIdNo;
        }

        public async Task<List<ApplicationScruitinyStatusDto>> GetApplicationScruitinyStatus(string applicationIdNo)
        {
            return await _applicationScruitinyStatusRepository.GetApplicationScruitinyStatus(applicationIdNo);
        }
    }
}