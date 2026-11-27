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
                throw new ArgumentNullException(nameof(accessPermissionHistory));

            var lastSiNo = await _context.PlaAccessPermissionHistory
                .Where(x => x.ApplicationIdNo == accessPermissionHistory.ApplicationIdNo)
                .Select(x => (int?)x.TransactionSiNo)
                .MaxAsync();

            accessPermissionHistory.TransactionSiNo = (lastSiNo ?? 0) + 1;

            _context.PlaAccessPermissionHistory.Add(accessPermissionHistory);

            await _context.SaveChangesAsync();

            return accessPermissionHistory.ApplicationIdNo;
        }

        public async Task<List<ApplicationsPermissionHistoryDto>> GetAccessPermissionHistory(
            string userId,
            DateOnly fromDate,
            DateOnly toDate)
        {
            var startDate = fromDate.ToDateTime(TimeOnly.MinValue).Date;

            var endDate = toDate.AddDays(1).ToDateTime(TimeOnly.MinValue).Date;

            var history = await (
         from a in _context.LicenseApplications

         where a.ApplicationDate >= startDate
               && a.ApplicationDate < endDate

         // Get only the latest transaction for each application
         from h in _context.PlaAccessPermissionHistory
             .Where(x => x.ApplicationIdNo == a.ApplicationIdNo)
             .OrderByDescending(x => x.TransactionSiNo)
             .Take(1)

             // Compare ReceiverUserID against the latest transaction only
         where h.ReceiverUserID == userId

         // LEFT JOIN Site Details
         join s1 in _context.LicenseSiteDetails
             on a.ApplicationIdNo equals s1.ApplicationIdNo
             into siteDetails

         from s in siteDetails.DefaultIfEmpty()

             // LEFT JOIN Licensee Category
         join c1 in _context.MstLicenseeCategory
             on a.CatCode equals c1.LicenseeCatCode
             into licenseeCategories

         from c in licenseeCategories.DefaultIfEmpty()

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
             ReceiverForwardingLevel = h.ReceiverForwardingLevel.ToString(),

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

        public async Task<ApplicationFlowUserResult?> GetApplicationFlowUser(string applicationIdNo)
        {
            var result = await (
                from la in _context.LicenseApplications
                join fhm in _context.FlowHierarchyMapping
                    on la.FlowUptoCode equals fhm.FlowUpto
                where la.ApplicationIdNo == applicationIdNo
                select new ApplicationFlowUserResult
                {
                    ApplicationIdNo = la.ApplicationIdNo,
                    FlowUpto = la.FlowUptoCode.ToString(),
                    UserTypeCode = fhm.UserTypeCode
                }
            ).FirstOrDefaultAsync();

            return result;
        }


        public async Task<FlowHierarchyMapping?> GetNextReceiver(string flowUpto, string senderUserTypeCode)
        {
            // Applicant: SenderUserTypeCode = "00"
            if (senderUserTypeCode == "00")
            {
                return await _context.FlowHierarchyMapping
                    .Where(x =>
                        x.FlowUpto == flowUpto &&
                        x.CategoryType == "License")
                    .OrderBy(x => x.SlNo)
                    .FirstOrDefaultAsync();
            }

            // Find current sender
            var currentSender = await _context.FlowHierarchyMapping
                .FirstOrDefaultAsync(x =>
                    x.FlowUpto == flowUpto &&
                    x.UserTypeCode.ToString() == senderUserTypeCode &&
                    x.CategoryType == "License");

            if (currentSender == null)
                return null;

            // Find next receiver
            return await _context.FlowHierarchyMapping
                .Where(x =>
                    x.FlowUpto == flowUpto &&
                    x.HierarchyID == currentSender.HierarchyID &&
                    x.CategoryType == "License" &&
                    x.SlNo > currentSender.SlNo)
                .OrderBy(x => x.SlNo)
                .FirstOrDefaultAsync();
        }

        public async Task<PlaAccessPermissionHistory?> GetLastAccessPermissionHistory(string applicationIdNo)
        {
            return await _context.PlaAccessPermissionHistory
                .Where(x => x.ApplicationIdNo == applicationIdNo)
                .OrderByDescending(x => x.TransactionSiNo)
                .FirstOrDefaultAsync();
        }



        public async Task<string> RejectApplication(PlaAccessPermissionHistory RejectApplicationAction)
        {
            if (RejectApplicationAction == null)
                throw new ArgumentNullException(nameof(RejectApplicationAction));

            var lastSiNo = await _context.PlaAccessPermissionHistory
                .Where(x => x.ApplicationIdNo == RejectApplicationAction.ApplicationIdNo)
                .Select(x => (int?)x.TransactionSiNo)
                .MaxAsync();

            RejectApplicationAction.TransactionSiNo = (lastSiNo ?? 0) + 1;

            _context.PlaAccessPermissionHistory.Add(RejectApplicationAction);

            // STEP 3: Update ApplicationStatus in LicenseApplication
            var application = await _context.LicenseApplications
                .FirstOrDefaultAsync(x => x.ApplicationIdNo == RejectApplicationAction.ApplicationIdNo);

            if (application == null)
                throw new Exception("Application not found.");

            application.ApplicationStatus = "72";

            await _context.SaveChangesAsync();

            return RejectApplicationAction.ApplicationIdNo;
        }



        public async Task<string> SendBackApplication(SendBackApplicationDto dto)
        {
            if (dto == null)
                return "Invalid request.";

            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
                return "Application ID is required.";

            if (string.IsNullOrWhiteSpace(dto.UserId))
                return "User ID is required.";

            if (string.IsNullOrWhiteSpace(dto.Remarks))
                return "Please enter remarks.";

            if (dto.SendBackType != "0" && dto.SendBackType != "1")
                return "Invalid send back type.";

            using var transaction = await _context.Database.BeginTransactionAsync(
                System.Data.IsolationLevel.Serializable);

            try
            {
                // 1. Get latest application history
                var lastTransaction = await _context.PlaAccessPermissionHistory
                    .Where(x => x.ApplicationIdNo == dto.ApplicationIdNo)
                    .OrderByDescending(x => x.TransactionSiNo)
                    .FirstOrDefaultAsync();

                if (lastTransaction == null)
                    return "Application history not found.";

                // 2. Verify current receiver
                if (lastTransaction.ReceiverUserID != dto.UserId)
                    return "You are not authorized to send back this application.";

                // 3. Declare receiver variables
                string? receiverUserID;
                string? receiverUserTypeCode;
                long receiverForwardingLevel;

                if (dto.SendBackType == "0")
                {
                    // DEFAULT: Send to immediate previous sender

                    receiverUserID = lastTransaction.SenderUserID;
                    receiverUserTypeCode = lastTransaction.SenderUserTypeCode;
                    receiverForwardingLevel = lastTransaction.SenderForwardingLevel;
                }
                else
                {
                    // APPLICANT: Send directly to original applicant

                    receiverUserTypeCode = "00";


                    // Step 1: Get RegId
                    var applicant = await _context.LicenseApplications
                        .Where(x => x.ApplicationIdNo == dto.ApplicationIdNo)
                        .Select(x => new
                        {
                            x.RegId
                        })
                        .FirstOrDefaultAsync();

                    if (applicant == null)
                        return "Original applicant details not found.";

                    // Step 2: Get applicant UserId and UserTypeCode
                    // IMPORTANT: Replace LicenseRegistration with your actual
                    // registration entity and property names.

                    var applicantDetails = await _context.MstUsReg
                        .Where(x => x.RegId == applicant.RegId)
                        .Select(x => new
                        {
                            x.UserId,
                            //x.UserTypeCode
                        })
                        .FirstOrDefaultAsync();

                    if (applicantDetails == null)
                        return "Applicant user details not found.";

                    receiverUserID = applicantDetails.UserId;
                    // receiverUserTypeCode = 00;
                    receiverForwardingLevel = 0;
                }

                // 4. Create new transaction history
                // Convert current receiver forwarding level from string to long
                if (!long.TryParse(
                    lastTransaction.ReceiverForwardingLevel,
                    out var senderLevel))
                {
                    return "Invalid receiver forwarding level.";
                }

                // Create new Send Back history
                var sendBackHistory = new PlaAccessPermissionHistory
                {
                    ApplicationIdNo = lastTransaction.ApplicationIdNo,

                    FlowUpto = lastTransaction.FlowUpto,

                    TransactionSiNo = lastTransaction.TransactionSiNo + 1,

                    TransactionDate = DateTime.Now,

                    // Current receiver becomes sender
                    SenderUserTypeCode = lastTransaction.ReceiverUserTypeCode,
                    SenderUserID = lastTransaction.ReceiverUserID,
                    SenderForwardingLevel = senderLevel,

                    // Selected receiver becomes new receiver
                    ReceiverUserTypeCode = receiverUserTypeCode,
                    ReceiverUserID = receiverUserID,
                    ReceiverForwardingLevel = receiverForwardingLevel.ToString(),

                    // Remarks
                    TransactionRemarks = dto.Remarks
                };

                // 5. Insert history into database
                await _context.PlaAccessPermissionHistory.AddAsync(sendBackHistory);

                await _context.SaveChangesAsync();

                // 6. Commit transaction
                await transaction.CommitAsync();

                return "Application sent back successfully.";
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }




    }



}