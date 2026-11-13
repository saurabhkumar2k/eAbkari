using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Repositories.ApplicationFlow
{
    public class ApplicationScruitinyStatusRepository : IApplicationScruitinyStatusRepository
    {
        private readonly ApplicationDbContext _context;

        public ApplicationScruitinyStatusRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // public async Task<string> ApplicationScruitinyStatus(ApplicationScruitinyStatus scruitinyStatus)
        // {
        //     if (scruitinyStatus == null)
        //     {
        //         throw new ArgumentNullException(nameof(scruitinyStatus), "Scruitiny data cannot be null.");
        //     }

        //     _context.ApplicationScruitinyStatus.Add(scruitinyStatus);
        //     await _context.SaveChangesAsync();

        //     return scruitinyStatus.ApplicationIdNo;

        // }

        public async Task<string> ApplicationScruitinyStatus(List<ApplicationScruitinyStatus> scrutinyStatuses)
        {
            if (scrutinyStatuses == null || !scrutinyStatuses.Any())
            {
                throw new ArgumentException("Scrutiny records cannot be empty.");
            }

            await _context.ApplicationScruitinyStatus.AddRangeAsync(scrutinyStatuses);

            await _context.SaveChangesAsync();

            return scrutinyStatuses.First().ApplicationIdNo;
        }

        public async Task<List<ApplicationScruitinyStatusDto>> GetApplicationScruitinyStatus(string applicationIdNo)
        {
            var result = await (
                from s in _context.ApplicationScruitinyStatus

                join d in _context.LicenseApplicationUploadedDocument
                    on s.DocId equals d.DocId

                where s.ApplicationIdNo == applicationIdNo

                select new ApplicationScruitinyStatusDto
                {
                    ApplicationIdNo = s.ApplicationIdNo,
                    UserId = s.UserId,
                    UserTypeCode = s.UserTypeCode,
                    DocId = s.DocId,

                    // DocumentName = d.DocumentName,
                    // UploadStatus = d.UploadStatus,
                    // DocumentType = d.DocumentType,
                    // DocumentUrl = d.DocumentUrl,

                    IsValid = s.IsValid,
                    Remarks = s.Remarks,
                    RemarkDate = s.RemarkDate
                }
            ).ToListAsync();

            return result;
        }


    }

}