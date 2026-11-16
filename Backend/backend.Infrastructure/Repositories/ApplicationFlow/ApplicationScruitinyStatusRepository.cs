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


        public async Task<List<ApplicationScruitinyStatusGetResultDto>>
            GetApplicationScruitinyStatus(string applicationIdNo)
        {
            var result = await (
                from la in _context.LicenseApplicationUploadedDocument

                join ma in _context.MstLicenseApplicationDocument
                    on la.DocId equals ma.DocId

                join a in _context.ApplicationScruitinyStatus
                    on new { la.DocId, la.ApplicationIdNo }
                    equals new { a.DocId, a.ApplicationIdNo }
                    into scrutinyGroup

                from a in scrutinyGroup.DefaultIfEmpty()

                where la.ApplicationIdNo == applicationIdNo

                select new ApplicationScruitinyStatusGetResultDto
                {
                    ApplicationIdNo = la.ApplicationIdNo,

                    DocId = la.DocId,

                    DocDesc = ma.DocDesc,

                    UploadStatus = la.DocStatus,

                    Document = ma.DocStatus,

                    DocUrl = la.DocUrl,

                    IsValid = a == null ? null : a.IsValid,

                    Remarks = a == null ? null : a.Remarks,

                    RemarkDate = a == null ? null : a.RemarkDate
                }
            ).AsNoTracking().ToListAsync();

            return result;
        }



    }

}