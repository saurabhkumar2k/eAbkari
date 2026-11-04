using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Repositories.ApplicationFlow
{
    public class ApplicationFlowRepository : IApplicationFlowRepository
    {
        private readonly ApplicationDbContext _context;
        public ApplicationFlowRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistory accessPermissionHistory)
        {
            if (accessPermissionHistory == null)
            {
                throw new ArgumentNullException(nameof(accessPermissionHistory), "Access permission history data cannot be null.");
            }

            _context.PlaAccessPermissionHistory.Add(accessPermissionHistory);
            await _context.SaveChangesAsync();

            return accessPermissionHistory.ApplicationIdNo;
        }

        // public async Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string userId, DateOnly fromDate, DateOnly toDate)
        // {
        //     var history = await _context.PlaAccessPermissionHistory
        //         .Where(x => x.ApplicationIdNo == applicationIdNo)
        //         .Select(x => new PlaAccessPermissionHistoryDto
        //         {
        //             ApplicationIdNo = x.ApplicationIdNo,
        //             FlowUpto = x.FlowUpto,
        //             TransactionSiNo = x.TransactionSiNo,
        //             TransactionDate = x.TransactionDate,
        //             SenderUserTypeCode = x.SenderUserTypeCode,
        //             SenderUserID = x.SenderUserID,
        //             SenderForwardingLevel = x.SenderForwardingLevel,
        //             ReceiverUserTypeCode = x.ReceiverUserTypeCode,
        //             ReceiverUserID = x.ReceiverUserID,
        //             ReceiverForwardingLevel = x.ReceiverForwardingLevel,
        //             PreScrutinyStatus = x.PreScrutinyStatus,
        //             FixDateEnquiry = x.FixDateEnquiry,
        //             TransactionRemarks = x.TransactionRemarks,
        //             TransactionStatusCode = x.TransactionStatusCode,
        //             OprDate = x.OprDate
        //         })
        //         .ToListAsync();

        //     return history;
        // }

        // public async Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(
        //     string userId,
        //     DateOnly fromDate,
        //     DateOnly toDate)
        // {
        //     var startDate = fromDate.ToDateTime(TimeOnly.MinValue).Date;
        //     var endDate = toDate.ToDateTime(TimeOnly.MinValue).Date;

        //     var history = await (
        //         from h in _context.PlaAccessPermissionHistory

        //         join a in _context.LicenseApplications
        //             on h.ApplicationIdNo equals a.ApplicationIdNo

        //         join s in _context.LicenseSiteDetails
        //             on a.ApplicationIdNo equals s.ApplicationIdNo
        //             into siteDetails

        //         from s in siteDetails.DefaultIfEmpty()

        //         where h.ReceiverUserID == userId
        //             && a.ApplicationDate >= startDate
        //             && a.ApplicationDate < toDate.AddDays(1).ToDateTime(TimeOnly.MinValue)

        //         select new ApplicationsPermissionHistoryDto
        //         {
        //             ApplicationIdNo = h.ApplicationIdNo,
        //             SiteName = s != null ? s.SiteName : null,

        //             FlowUpto = h.FlowUpto,
        //             TransactionSiNo = h.TransactionSiNo,
        //             TransactionDate = h.TransactionDate,
        //             SenderUserTypeCode = h.SenderUserTypeCode,
        //             SenderUserID = h.SenderUserID,
        //             SenderForwardingLevel = h.SenderForwardingLevel,
        //             ReceiverUserTypeCode = h.ReceiverUserTypeCode,
        //             ReceiverUserID = h.ReceiverUserID,
        //             ReceiverForwardingLevel = h.ReceiverForwardingLevel,
        //             PreScrutinyStatus = h.PreScrutinyStatus,
        //             FixDateEnquiry = h.FixDateEnquiry,
        //             TransactionRemarks = h.TransactionRemarks,
        //             TransactionStatusCode = h.TransactionStatusCode,
        //             OprDate = h.OprDate
        //         })
        //         .ToListAsync();

        //     return history;
        // }

        public async Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(
            string userId,
            DateOnly fromDate,
            DateOnly toDate)
        {
            var startDate = fromDate.ToDateTime(TimeOnly.MinValue).Date;

            var endDate = toDate.AddDays(1).ToDateTime(TimeOnly.MinValue).Date;

            var history = await (
                from h in _context.PlaAccessPermissionHistory

                join a in _context.LicenseApplications
                    on h.ApplicationIdNo equals a.ApplicationIdNo

                join s in _context.LicenseSiteDetails
                    on a.ApplicationIdNo equals s.ApplicationIdNo
                    into siteDetails

                from s in siteDetails.DefaultIfEmpty()

                join c in _context.MstLicenseeCategory
                    on a.CatCode equals c.LicenseeCatCode
                    into licenseeCategories

                from c in licenseeCategories.DefaultIfEmpty()

                where h.ReceiverUserID == userId
                      && a.ApplicationDate >= startDate
                      && a.ApplicationDate < endDate

                select new ApplicationsPermissionHistoryDto
                {
                    ApplicationIdNo = h.ApplicationIdNo,

                    SiteName = s != null ? s.SiteName : null,

                    LicenseeCatDesc = c != null ? c.LicenseeCatDesc : null,

                    FlowUpto = h.FlowUpto,
                    TransactionSiNo = h.TransactionSiNo,
                    TransactionDate = h.TransactionDate,

                    SenderUserTypeCode = h.SenderUserTypeCode,
                    SenderUserID = h.SenderUserID,
                    SenderForwardingLevel = h.SenderForwardingLevel,

                    ReceiverUserTypeCode = h.ReceiverUserTypeCode,
                    ReceiverUserID = h.ReceiverUserID,
                    ReceiverForwardingLevel = h.ReceiverForwardingLevel,

                    PreScrutinyStatus = h.PreScrutinyStatus,
                    FixDateEnquiry = h.FixDateEnquiry,
                    TransactionRemarks = h.TransactionRemarks,
                    TransactionStatusCode = h.TransactionStatusCode,
                    OprDate = h.OprDate,
                    ApplicationDate = a.ApplicationDate
                })
                .ToListAsync();

            return history;
        }
    }
}