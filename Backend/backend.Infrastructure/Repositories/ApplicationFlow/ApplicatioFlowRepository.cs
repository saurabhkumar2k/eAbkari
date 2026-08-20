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

        public async Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string applicationIdNo)
        {
            var history = await _context.PlaAccessPermissionHistory
                .Where(x => x.ApplicationIdNo == applicationIdNo)
                .Select(x => new PlaAccessPermissionHistoryDto
                {
                    ApplicationIdNo = x.ApplicationIdNo,
                    FlowUpto = x.FlowUpto,
                    TransactionSiNo = x.TransactionSiNo,
                    TransactionDate = x.TransactionDate,
                    SenderUserTypeCode = x.SenderUserTypeCode,
                    SenderUserID = x.SenderUserID,
                    SenderForwardingLevel = x.SenderForwardingLevel,
                    ReceiverUserTypeCode = x.ReceiverUserTypeCode,
                    ReceiverUserID = x.ReceiverUserID,
                    ReceiverForwardingLevel = x.ReceiverForwardingLevel,
                    PreScrutinyStatus = x.PreScrutinyStatus,
                    FixDateEnquiry = x.FixDateEnquiry,
                    TransactionRemarks = x.TransactionRemarks,
                    TransactionStatusCode = x.TransactionStatusCode,
                    OprDate = x.OprDate
                })
                .ToListAsync();

            return history;
        }
    }
}