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
                // ==========================================
                // STEP 0 : DTO NULL CHECK
                // ==========================================

                if (dto == null)
                {
                    return "Request data is null";
                }
                // ==========================================
                // STEP 1 : CHECK EXISTING APPLICATION
                // ==========================================

                if (!string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
                {
                    var existingApplicant =
                        await _Licenserepository.GetApplicantDetails(dto.ApplicationIdNo);

                    if (existingApplicant != null)
                    {
                        // ==========================================
                        // EXISTING RECORD -> UPDATE
                        // ==========================================

                        var Existinglicense = new LicenseApplicationUserDetails
                        {
                            ApplicationIdNo = dto.ApplicationIdNo,
                            RegId = dto.RegId,
                            ApplicantName = dto.ApplicantName,
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
                            Email = dto.Email ?? "",
                            Mobile = dto.Mobile ?? "",
                            LandLine = dto.LandLine ?? ""
                        };

                        var Existingapplication = new LicenseApplication
                        {
                            RegId = (int)dto.RegId,
                            ApplicationIdNo = dto.ApplicationIdNo,
                            CatCode = dto.CatCode,
                            LicenseType = dto.OwnerType,
                            ApplicationFlag = dto.ActivityId
                        };

                        return await _Licenserepository.SaveApplicantDetails(
                            Existinglicense,
                            Existingapplication);
                    }
                }


                // ==========================================
                // STEP 2 : NEW RECORD
                // ==========================================

                string? lastappid =
                    await _Licenserepository.GetLastApplicationId();

                var FinYearV =
                    await _Licenserepository.GetFinYear();

                if (string.IsNullOrWhiteSpace(FinYearV))
                {
                    return "Financial Year is not available.";
                }

                string activeYear = FinYearV.Substring(2, 2);

                string prefix = $"REF{dto.CatCode}{activeYear}";

                int sequence = 1;

                if (!string.IsNullOrWhiteSpace(lastappid))
                {
                    string lastFive = lastappid.Substring(lastappid.Length - 5);
                    sequence = int.Parse(lastFive) + 1;
                }

                string newappid = $"{prefix}{sequence:00000}";


                // ==========================================
                // STEP 3 : GET FLOW
                // ==========================================

                var ApplicationFlowUpto =
                    await _Licenserepository.GetFlowUpto(
                        dto.CatCode,
                        dto.ActivityId);


                // ==========================================
                // STEP 4 : CREATE NEW LICENSE
                // ==========================================

                var license = new LicenseApplicationUserDetails
                {
                    ApplicationIdNo = newappid,
                    RegId = dto.RegId,
                    ApplicantName = dto.ApplicantName,
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
                    Email = dto.Email ?? "",
                    Mobile = dto.Mobile ?? "",
                    LandLine = dto.LandLine ?? "",
                    CreatedDate = DateTime.Now
                };


                // ==========================================
                // STEP 5 : CREATE NEW APPLICATION
                // ==========================================

                var application = new LicenseApplication
                {
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


                // ==========================================
                // STEP 6 : INSERT
                // ==========================================

                return await _Licenserepository.SaveApplicantDetails(
                    license,
                    application);
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