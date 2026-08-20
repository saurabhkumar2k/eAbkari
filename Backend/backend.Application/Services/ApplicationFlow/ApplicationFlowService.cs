using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;


namespace backend.Application.Services.ApplicationFlow
{
    public class ApplicationFlowService : IApplicationFlowService
    {
        private readonly IApplicationFlowRepository _applicationFlowRepository;

        public ApplicationFlowService(IApplicationFlowRepository applicationFlowRepository)
        {
            _applicationFlowRepository = applicationFlowRepository;
        }

        public async Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistoryDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto), "Access permission history data cannot be null.");
            }

            var accessPermissionHistory = new PlaAccessPermissionHistory
            {
                ApplicationIdNo = dto.ApplicationIdNo,
                FlowUpto = dto.FlowUpto,
                TransactionSiNo = dto.TransactionSiNo,
                TransactionDate = dto.TransactionDate,
                SenderUserTypeCode = dto.SenderUserTypeCode,
                SenderUserID = dto.SenderUserID,
                SenderForwardingLevel = dto.SenderForwardingLevel,
                ReceiverUserTypeCode = dto.ReceiverUserTypeCode,
                ReceiverUserID = dto.ReceiverUserID,
                ReceiverForwardingLevel = dto.ReceiverForwardingLevel,
                PreScrutinyStatus = dto.PreScrutinyStatus,
                FixDateEnquiry = dto.FixDateEnquiry,
                TransactionRemarks = dto.TransactionRemarks,
                TransactionStatusCode = dto.TransactionStatusCode,
                OprDate = dto.OprDate
            };

            await _applicationFlowRepository.SaveAccessPermissionHistory(accessPermissionHistory);
            return accessPermissionHistory.ApplicationIdNo;
        }

        public async Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string applicationIdNo)
        {
            return await _applicationFlowRepository.GetAccessPermissionHistory(applicationIdNo);
        }
    }
}