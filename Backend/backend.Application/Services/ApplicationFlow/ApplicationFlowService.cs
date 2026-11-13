using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;
using Microsoft.EntityFrameworkCore.Metadata;


namespace backend.Application.Services.ApplicationFlow
{
    public class ApplicationFlowService : IApplicationFlowService
    {
        private readonly IApplicationFlowRepository _applicationFlowRepository;

        //  private readonly IApplicationScruitinyStatusRepository  _applicationScruitinyStatusRepository;

        public ApplicationFlowService(IApplicationFlowRepository applicationFlowRepository)
        {
            _applicationFlowRepository = applicationFlowRepository;
            // this._applicationScruitinyStatusRepository = applicationScruitinyStatusRepository;
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

        public async Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(string userId, DateOnly fromDate, DateOnly toDate)
        {
            return await _applicationFlowRepository.GetAccessPermissionHistory(userId, fromDate, toDate);
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

        // public async Task<List<ApplicationScruitinyStatusDto>> GetApplicationScruitinyStatus(string applicationIdNo)
        // {
        //     return await _applicationScruitinyStatusRepository.GetApplicationScruitinyStatus(applicationIdNo);
        // } 
    }
}