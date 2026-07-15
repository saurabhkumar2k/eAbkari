using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;

namespace backend.Application.Services.License
{
    public class CommonLicenseServices : ICommonLicenseServices
    {
        private readonly ICommonLicenseRepository _Licenserepository;    
        public CommonLicenseServices(ICommonLicenseRepository repository)
        {
            _Licenserepository = repository;
        }

        public async Task<string> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto)
        {
            try
            {
                //fetch application id
                string? lastappid = await _Licenserepository.GetLastApplicationId();

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

                return await _Licenserepository.SaveApplicantDetails(license, application);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}