using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using backend.Core.Entities;
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
        public async Task<ApiResponse<LicenseApplicationUserDetailsResponseDto>> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto)
        {
            try
            {
                // ==========================================
                // STEP 0 : DTO NULL CHECK
                // ==========================================

                if (dto == null)
                {
                    return ApiResponse<LicenseApplicationUserDetailsResponseDto>.Fail(
                            "Request data is null");
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

                        var resdata = await _Licenserepository.SaveApplicantDetails(
                            Existinglicense,
                            Existingapplication);
                        return ApiResponse<LicenseApplicationUserDetailsResponseDto>.Ok(
                            new LicenseApplicationUserDetailsResponseDto
                            {
                                ApplicationIdNo = resdata
                            },
                            "Application saved successfully"
                            );
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
                    return ApiResponse<LicenseApplicationUserDetailsResponseDto>.Fail(
                        "Financial Year is not available.");
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

                var response = await _Licenserepository.SaveApplicantDetails(license,application);
                return ApiResponse<LicenseApplicationUserDetailsResponseDto>.Ok(
                    new LicenseApplicationUserDetailsResponseDto
                    {
                        ApplicationIdNo = response
                    }, "Application Saved Successfully");
            }
            catch (Exception ex)
            {
                return ApiResponse<LicenseApplicationUserDetailsResponseDto>.Fail(
                    "Server error, try again later", ex.Message);
            }
        }
        public async Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId)
        {
            return await _Licenserepository.GetApplicantDetails(AppId);
        }

        public async Task<ApiResponse<SubmitApplicationDTO>> SubmitApplication(SubmitApplicationDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return ApiResponse<SubmitApplicationDTO>.Fail("Invalid Request");
                }

                if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
                {
                    return ApiResponse<SubmitApplicationDTO>.Fail("ApplicationIdNo is required.");
                }

                var result = await _Licenserepository.SubmitApplication(dto);

                if (string.IsNullOrWhiteSpace(result))
                {
                    return ApiResponse<SubmitApplicationDTO>.Fail("Application not found.");
                }

                return ApiResponse<SubmitApplicationDTO>.Ok(
                    new SubmitApplicationDTO
                    {
                        ApplicationStatus = result
                    }, "Application status updated successfully.");
            }
            catch (Exception ex)
            {
                return ApiResponse<SubmitApplicationDTO>.Fail("Server error, try again later", ex.Message);
            }
        }
        public async Task<ApplicationIdResponseDto> GetPendingApplicationIds(string catCode,int regId)
        {
            return await _Licenserepository.GetPendingApplicationIds(catCode,regId);
        }

        public async Task<List<GetApplicantDocResponseDto>> GetDocDescriptionCatWiseService(string CatCode,string DocType)
        {
            return await _Licenserepository.GetDocDescriptionCatWiseRepositry( CatCode,DocType);
        }

        public async Task<string> SaveAndUpdateApplicantDocumentsService(List<SaveAndUpdateApplicantDocumentsDto> dto)
        {
            return await _Licenserepository.SaveAndUpdateApplicantDocumentsRepository(dto);
        }
    }
}