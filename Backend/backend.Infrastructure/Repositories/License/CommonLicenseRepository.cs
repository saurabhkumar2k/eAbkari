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


            // return await _context.LicenseApplications
            //     .OrderByDescending(x => x.ApplicationIdNo)
            //     .Select(x => x.ApplicationIdNo)
            //     .FirstOrDefaultAsync();

             return await _context.LicenseApplications
                .Where(x => x.ApplicationIdNo != null &&
                    x.ApplicationIdNo.Length >= 7 &&
                    x.ApplicationIdNo.Substring(5, 2) == activeYear)
                    .OrderByDescending(x => x.ApplicationIdNo)
                    .Select(x => x.ApplicationIdNo)
                    .FirstOrDefaultAsync();
        }

        public async Task<string> SaveApplicantDetails(LicenseApplicationUserDetails userDetails, LicenseApplication application)
        {
            _context.LicenseApplicationUserDetails.Add(userDetails);
            _context.LicenseApplications.Add(application);
            _context.ChangeTracker.Entries();
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
         public async Task<string?> GetFlowUpto( string CatCode,string ActivityId)
        {
            return await _context.MstFlowApplicable.Where(x => x.ActivityId == ActivityId && x.LicenseCategory == CatCode ).Select(x => x.FlowUptoCode).FirstOrDefaultAsync(); 
        }
    }
}
