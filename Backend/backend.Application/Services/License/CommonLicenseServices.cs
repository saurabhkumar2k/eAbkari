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
                //var user = await _context.MstUsReg.FirstOrDefaultAsync(x => x.RegId == dto.RegId);

                var FinYearV = await _Licenserepository.GetFinYear();

                if (string.IsNullOrWhiteSpace(FinYearV))
                {
                    throw new Exception("Financial Year is not available.");
                }

                string activeYear = FinYearV.Substring(2, 2); // 2026-2027 → 26

                string prefix = $"REF{dto.CatCode}{activeYear}";

                int sequence = 1;

                if (!string.IsNullOrWhiteSpace(lastappid))
                {
                    string lastFour = lastappid.Substring(lastappid.Length - 5);
                    sequence = int.Parse(lastFour) + 1;
                }

                string newappid = $"{prefix}{sequence:00000}";

                // if (string.IsNullOrWhiteSpace(lastappid))
                // {
                //     newappid = "REFL10001";
                // }
                // else
                // {
                //     int number = int.Parse(lastappid.Substring(4));
                //     newappid = $"REFL{(number + 1):00000}";
                // }

                var ApplicationFlowUpto = await _Licenserepository.GetFlowUpto(dto.CatCode,dto.ActivityId);

                var license = new LicenseApplicationUserDetails
                {
                    ApplicationIdNo = newappid,
                    //RegNumber = user.RegId.ToString(),
                    //RegId = dto.RegId.ToString(),
                    RegId = dto.RegId,
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
                    CreatedDate = DateTime.Now,

                    //OprDate= DateTime.Now
                    // Map other fields
                };

                var application = new LicenseApplication
                {
                    // IPAddress = HttpContent.Connection.RemoteIpAddress?.ToString(),
                    RegId = (int)dto.RegId,
                    ApplicationIdNo = newappid,
                    ApplicationDate = DateTime.Now,
                    FinYear = FinYearV,
                    ApplicationStatus = "01",
                    CatCode = dto.CatCode,
                    LicenseType = dto.OwnerType,
                    IsApplicationCompleted = "N",
                    ApplicationFlag = dto.ActivityId,
                    IsLicenseGenerated = "N",
                    IsApproveYN = "N",
                    FlowUptoCode = ApplicationFlowUpto
                };

                return await _Licenserepository.SaveApplicantDetails(license, application);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public async Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId)
        {
            return await _Licenserepository.GetApplicantDetails(AppId);
        }

        public async Task<string> SubmitApplication(string applicationIdNo, string applicationStatus)
        {
            try
            {
                // var applicationStatus = new LicenseApplication
                // {
                //     ApplicationStatus = "02" // Update the status to "02" (Submitted)
                   
                // };

                return await _Licenserepository.SubmitApplication(applicationIdNo, applicationStatus);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}