using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonLicenseRepository : ICommonLicenseRepository
    {
        private readonly ApplicationDbContext _context;
        public CommonLicenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }



        public async Task<string?> GetLastApplicationId()
        {

            var FinYearV = await GetFinYear();

            if (string.IsNullOrWhiteSpace(FinYearV))
            {
                throw new Exception("Financial Year is not available.");
            }

            string activeYear = FinYearV.Substring(2, 2);
          
            return await _context.LicenseApplications
                .Where(x => x.ApplicationIdNo != null &&
                 x.ApplicationIdNo.Length >= 7 &&
                 x.ApplicationIdNo.Substring(5, 2) == activeYear)
                .OrderByDescending(x => x.Id)
                .Select(x => x.ApplicationIdNo)
            .FirstOrDefaultAsync();
            // return await _context.LicenseApplications
            //     .Where(x => x.ApplicationIdNo != null &&
            //     x.ApplicationIdNo.Length >= 7 &&
            //     x.ApplicationIdNo.Substring(5, 2) == activeYear)
            //     .OrderByDescending(x => x.ApplicationIdNo.Substring(x.ApplicationIdNo.Length - 5, 5))
            //     .Select(x => x.ApplicationIdNo)
            //      .FirstOrDefaultAsync();
        }

        public async Task<string> SaveApplicantDetails(
                    LicenseApplicationUserDetails userDetails,
                     LicenseApplication application)
        {
            // ==========================================
            // UPDATE Applicant Details
            // ==========================================

            int updatedUser =
                await _context.LicenseApplicationUserDetails
                    .Where(x =>
                        x.ApplicationIdNo == userDetails.ApplicationIdNo)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(x => x.RegId, userDetails.RegId)
                        .SetProperty(x => x.ApplicantName, userDetails.ApplicantName)
                        .SetProperty(x => x.DateOfBirth, userDetails.DateOfBirth)
                        .SetProperty(x => x.FatherHusbandName, userDetails.FatherHusbandName)
                        .SetProperty(x => x.Occupation, userDetails.Occupation)
                        .SetProperty(x => x.PanNo, userDetails.PanNo)
                        .SetProperty(x => x.PresentAddress, userDetails.PresentAddress)
                        .SetProperty(x => x.PermanentAddress, userDetails.PermanentAddress)
                        .SetProperty(x => x.StateUT, userDetails.StateUT)
                        .SetProperty(x => x.District, userDetails.District)
                        .SetProperty(x => x.SubDivision, userDetails.SubDivision)
                        .SetProperty(x => x.PIN, userDetails.PIN)
                        .SetProperty(x => x.Email, userDetails.Email)
                        .SetProperty(x => x.Mobile, userDetails.Mobile)
                        .SetProperty(x => x.LandLine, userDetails.LandLine)
                    );


            // ==========================================
            // If record was updated
            // ==========================================

            if (updatedUser > 0)
            {
                // Update LicenseApplication table

                await _context.LicenseApplications
                    .Where(x =>
                        x.ApplicationIdNo == application.ApplicationIdNo)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(x => x.RegId, application.RegId)
                        .SetProperty(x => x.CatCode, application.CatCode)
                        .SetProperty(x => x.LicenseType, application.LicenseType)
                        .SetProperty(x => x.ApplicationFlag, application.ApplicationFlag)
                    );

                return application.ApplicationIdNo;
            }


            // ==========================================
            // INSERT NEW RECORD
            // ==========================================

            _context.LicenseApplicationUserDetails.Add(userDetails);
            _context.LicenseApplications.Add(application);

            await _context.SaveChangesAsync();

            return application.ApplicationIdNo;
        }
        public async Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId)
        {
            var user = await _context.LicenseApplicationUserDetails
                .Where(x => x.ApplicationIdNo == AppId)
                .Select(x => new LicenseApplicationUserDetailsDto
                {
                    ApplicationIdNo = x.ApplicationIdNo,
                    ApplicantName = x.ApplicantName,
                    Dob = x.DateOfBirth,
                    FatherHusbandName = x.FatherHusbandName,
                    Occupation = x.Occupation,
                    PresentAddress = x.PresentAddress,
                    PermanentAddress = x.PermanentAddress,
                    StateUT = x.StateUT,
                    District = x.District,
                    PIN = x.PIN,
                    Email = x.Email,
                    LandLine = x.LandLine,
                    PanNo = x.PanNo,
                    SubDivision = x.SubDivision,
                    Mobile = x.Mobile
                })
                .FirstOrDefaultAsync();

            return user;
        }
        public async Task<string?> GetFinYear()
        {
            return await _context.MstFinancialYear.Where(x => x.ActiveStatus == "Y").Select(x => x.FinYear).FirstOrDefaultAsync();
        }
        public async Task<string?> GetFlowUpto(string CatCode, string ActivityId)
        {
            return await _context.MstFlowApplicable.Where(x => x.ActivityId == ActivityId && x.LicenseCategory == CatCode).Select(x => x.FlowUptoCode).FirstOrDefaultAsync();
        }

        public async Task<string> SubmitApplication(string applicationIdNo, string applicationStatus)
        {
            var application = await _context.LicenseApplications.Where(x => x.ApplicationIdNo == applicationIdNo).FirstOrDefaultAsync();
            if (application != null)
            {
                application.ApplicationStatus = applicationStatus;
                await _context.SaveChangesAsync();
            }
            return application?.ApplicationStatus ?? string.Empty;
        }

    }
}
