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


        public async Task<ApplicationFlowUserResult?> GetApplicationFlowUser(string applicationIdNo)
        {
            return await _applicationFlowRepository.GetApplicationFlowUser(applicationIdNo);
        }

        public async Task<string> RejectApplication(PlaAccessPermissionHistoryDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            // STEP 1: Get the latest forwarding record
            var getpreviousHistory =
                await _applicationFlowRepository.GetLastAccessPermissionHistory(
                    dto.ApplicationIdNo
                );

            string senderUserTypeCode;
            string senderUserID;
            int senderForwardingLevel;

            // Previous receiver becomes the current sender
            senderUserTypeCode = getpreviousHistory.ReceiverUserTypeCode;
            senderUserID = getpreviousHistory.ReceiverUserID;
            senderForwardingLevel = Convert.ToInt32(getpreviousHistory.ReceiverForwardingLevel);

            // STEP 4: Create a new history record
            var accessPermissionHistory = new PlaAccessPermissionHistory
            {
                ApplicationIdNo = dto.ApplicationIdNo,
                FlowUpto = "00",

                // Repository generates this
                TransactionSiNo = 0,

                TransactionDate = dto.TransactionDate,

                SenderUserTypeCode = senderUserTypeCode,
                SenderUserID = senderUserID,
                SenderForwardingLevel = senderForwardingLevel,

                ReceiverUserTypeCode = senderUserTypeCode,
                ReceiverUserID = "Rejected",
                ReceiverForwardingLevel = senderForwardingLevel.ToString(),

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

        public async Task<string> SendBackApplication(SendBackApplicationDto dto)
        {
            return await _applicationFlowRepository.SendBackApplication(dto);
        }



    }
}