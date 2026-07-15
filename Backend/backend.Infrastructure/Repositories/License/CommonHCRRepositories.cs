using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonHCRRepositories : ICommonHCRRepository
    {
        private readonly ApplicationDbContext _context;

        public CommonHCRRepositories(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto)
        {
            try
            {
                //generate application id
                string? lastappid = await _context.LicenseApplications
                    .OrderByDescending(x => x.ApplicationIdNo)
                    .Select(x => x.ApplicationIdNo)
                    .FirstOrDefaultAsync();

                string newappid;

                if (string.IsNullOrWhiteSpace(lastappid))
                {
                    newappid = "REFL10001";
                }
                else
                {
                    int number = int.Parse(lastappid.Substring(4));
                    newappid = $"REFL{(number + 1):00000}";
                }

                var user = await _context.MstUsReg.FirstOrDefaultAsync(x => x.RegId == dto.RegId);

                var license = new LicenseApplicationUserDetails
                {
                    //ApplicationIdNo = newAppId,
                    //RegNumber = user.RegId.ToString(),
                    RegId = dto.RegId.ToString(),
                    ApplicantName = dto.ApplicantName,
                    //CompanyName = dto.CompanyName??"",
                    DateOfBirth = dto.Dob,
                    FatherHusbandName = dto.FatherHusbandName ?? "",
                    Occupation = dto.Occupation ?? "",
                    PanNo = dto.PanNo ?? "",
                    PresentAddress = dto.PresentAddress ?? "",
                    PermanentAddress = dto.PermanentAddress ?? "",
                    StateUT = dto.StateUT ?? "",
                    District = dto.District ?? "",
                    SubDivision = dto.SubDivision ?? "",
                    PIN = dto.PIN ?? "",
                    //PoliceStation = dto.PoliceStation ??"",
                    Email = dto.Email ?? "",
                    Mobile = dto.Mobile ?? "",
                    LandLine = dto.LandLine ?? "",
                    //OprDate= DateTime.Now
                    // Map other fields
                };

                var application = new LicenseApplication
                {
                    // IPAddress = HttpContent.Connection.RemoteIpAddress?.ToString(),
                    RegId = (int)dto.RegId,
                    ApplicationIdNo = newappid,
                    ApplicationDate = DateTime.Now,
                    FinYear = "2026-27",
                    ApplicationStatus = "P",
                    CatCode = dto.CatCode,
                    LicenseType = dto.OwnerType,
                    IsApplicationCompleted = "N",
                    ApplicationFlag = "A",
                    IsLicenseGenerated = "N",
                    IsApproveYN = "N"
                };

                _context.LicenseApplications.Add(application);

                _context.LicenseApplicationUserDetails.Add(license);
                _context.ChangeTracker.Entries();
                await _context.SaveChangesAsync();

                return application.ApplicationIdNo;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}