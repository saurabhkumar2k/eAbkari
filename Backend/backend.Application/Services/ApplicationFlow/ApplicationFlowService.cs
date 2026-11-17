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

        // public async Task<string> SaveAccessPermissionHistory(PlaAccessPermissionHistoryDto dto)
        // {
        //     if (dto == null)
        //     {
        //         throw new ArgumentNullException(nameof(dto), "Access permission history data cannot be null.");
        //     }

        //     var nextReceiver = await _applicationFlowRepository.GetNextReceiver(dto.FlowUpto, dto.SenderUserTypeCode);


        //     if (nextReceiver == null)
        //     {
        //         throw new Exception(
        //             "No next receiver found in FlowHierarchyMapping. The application may have reached its final level."
        //         );
        //     }

        //     var accessPermissionHistory = new PlaAccessPermissionHistory
        //     {
        //         ApplicationIdNo = dto.ApplicationIdNo,
        //         FlowUpto = dto.FlowUpto,
        //         TransactionSiNo = dto.TransactionSiNo,
        //         TransactionDate = dto.TransactionDate,
        //         SenderUserTypeCode = dto.SenderUserTypeCode,
        //         SenderUserID = dto.SenderUserID,
        //         SenderForwardingLevel = dto.SenderForwardingLevel,
        //         ReceiverUserTypeCode = dto.ReceiverUserTypeCode,
        //         ReceiverUserID = dto.ReceiverUserID,
        //         ReceiverForwardingLevel = dto.ReceiverForwardingLevel,
        //         PreScrutinyStatus = dto.PreScrutinyStatus,
        //         FixDateEnquiry = dto.FixDateEnquiry,
        //         TransactionRemarks = dto.TransactionRemarks,
        //         TransactionStatusCode = dto.TransactionStatusCode,
        //         OprDate = dto.OprDate
        //     };

        //     await _applicationFlowRepository.SaveAccessPermissionHistory(accessPermissionHistory);
        //     return accessPermissionHistory.ApplicationIdNo;
        // }


        // public async Task<string> SaveAccessPermissionHistory( PlaAccessPermissionHistoryDto dto)
        // {
        //     if (dto == null)
        //     {
        //         throw new ArgumentNullException(
        //             nameof(dto),
        //             "Access permission history data cannot be null."
        //         );
        //     }

        //     // Find next receiver from FlowHierarchyMapping
        //     var nextReceiver = await _applicationFlowRepository.GetNextReceiver(
        //         dto.FlowUpto,
        //         dto.SenderUserTypeCode
        //     );

        //     if (nextReceiver == null)
        //     {
        //         throw new Exception(
        //             "No next receiver found in FlowHierarchyMapping for SenderUserTypeCode: "
        //             + dto.SenderUserTypeCode
        //         );
        //     }

        //     var accessPermissionHistory = new PlaAccessPermissionHistory
        //     {
        //         ApplicationIdNo = dto.ApplicationIdNo,
        //         FlowUpto = dto.FlowUpto,

        //         // Repository will generate the next serial number
        //         TransactionSiNo = 0,

        //         TransactionDate = dto.TransactionDate,

        //         SenderUserTypeCode = dto.SenderUserTypeCode,
        //         SenderUserID = dto.SenderUserID,
        //         SenderForwardingLevel = dto.SenderForwardingLevel,

        //         // IMPORTANT: Use nextReceiver, not DTO values
        //         // Receiver details from FlowHierarchyMapping
        //         ReceiverUserTypeCode = nextReceiver.UserTypeCode.ToString(),
        //         ReceiverUserID = nextReceiver.UserID,
        //         ReceiverForwardingLevel = nextReceiver.SlNo.ToString(),
        //         PreScrutinyStatus = dto.PreScrutinyStatus,
        //         FixDateEnquiry = dto.FixDateEnquiry,

        //         TransactionRemarks = dto.TransactionRemarks,
        //         TransactionStatusCode = dto.TransactionStatusCode,

        //         OprDate = dto.OprDate
        //     };

        //     await _applicationFlowRepository.SaveAccessPermissionHistory(
        //         accessPermissionHistory
        //     );

        //     return accessPermissionHistory.ApplicationIdNo;
        // }

        public async Task<string> SaveAccessPermissionHistory(
    PlaAccessPermissionHistoryDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            // STEP 1: Get the latest forwarding history
            var previousHistory =
                await _applicationFlowRepository.GetLastAccessPermissionHistory(
                    dto.ApplicationIdNo
                );

            string senderUserTypeCode;
            string senderUserID;
            int senderForwardingLevel;

            if (previousHistory == null)
            {
                // First forwarding: Applicant -> DA
                senderUserTypeCode = "00";
                senderUserID = dto.SenderUserID;
                senderForwardingLevel = 0;
            }
            else
            {
                // Previous receiver becomes the current sender
                senderUserTypeCode = previousHistory.ReceiverUserTypeCode;
                senderUserID = previousHistory.ReceiverUserID;
                senderForwardingLevel =
                    Convert.ToInt32(previousHistory.ReceiverForwardingLevel);
            }

            // STEP 2: Find the next receiver using the actual sender type
            var nextReceiver = await _applicationFlowRepository.GetNextReceiver(
                dto.FlowUpto,
                senderUserTypeCode
            );

            if (nextReceiver == null)
            {
                throw new Exception(
                    "No next receiver found for SenderUserTypeCode: "
                    + senderUserTypeCode
                );
            }

            // STEP 3: Calculate receiver forwarding level
            // SlNo 1 (DA) -> level 1
            // SlNo 2 (SO) -> level 1
            // SlNo 3 (ACX) -> level 2
            // SlNo 4 (DCX) -> level 3
            var receiverForwardingLevel = Math.Max(
                1,
                Convert.ToInt32(nextReceiver.SlNo) - 1
            );

            // STEP 4: Create a new history record
            var accessPermissionHistory = new PlaAccessPermissionHistory
            {
                ApplicationIdNo = dto.ApplicationIdNo,
                FlowUpto = dto.FlowUpto,

                // Repository generates this
                TransactionSiNo = 0,

                TransactionDate = dto.TransactionDate,

                SenderUserTypeCode = senderUserTypeCode,
                SenderUserID = senderUserID,
                SenderForwardingLevel = senderForwardingLevel,

                ReceiverUserTypeCode = nextReceiver.UserTypeCode.ToString(),
                ReceiverUserID = nextReceiver.UserID,
                ReceiverForwardingLevel = receiverForwardingLevel.ToString(),

                PreScrutinyStatus = dto.PreScrutinyStatus,
                FixDateEnquiry = dto.FixDateEnquiry,
                TransactionRemarks = dto.TransactionRemarks,
                TransactionStatusCode = dto.TransactionStatusCode,
                OprDate = dto.OprDate
            };

            await _applicationFlowRepository.SaveAccessPermissionHistory(
                accessPermissionHistory
            );

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

        public async Task<ApplicationFlowUserResult?> GetApplicationFlowUser(string applicationIdNo)
        {
            return await _applicationFlowRepository.GetApplicationFlowUser(applicationIdNo);
        }



    }
}