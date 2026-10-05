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

                var response = await _Licenserepository.SaveApplicantDetails(license, application);
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
        public async Task<ApiResponse<ApplicationIdResponseDto>> GetPendingApplicationId(string catCode, int regId)
        {
            try
            {
                var FinYearV = await _Licenserepository.GetFinYear();

                if (string.IsNullOrWhiteSpace(FinYearV))
                {
                    return ApiResponse<ApplicationIdResponseDto>.Fail(
                        "Financial Year is not available.");
                }

                var result = await _Licenserepository.GetPendingApplicationId(catCode, regId, FinYearV);
                if (result == null)
                {
                    return ApiResponse<ApplicationIdResponseDto>.Fail("No pending application found.");
                }
                else
                {
                    return ApiResponse<ApplicationIdResponseDto>.Ok(
                        new ApplicationIdResponseDto
                        {
                            ApplicationIdNo = result.ApplicationIdNo,
                        });
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<ApplicationIdResponseDto>.Fail("Server error, try again later", ex.Message);
            }
        }

        public async Task<ApiResponse<List<GetApplicantDocResponseDto>>> GetDocDescriptionCatWiseService(string applicationIdNo,string CatCode, string DocType)
        {
            try
            {
                var result = await _Licenserepository.GetDocDescriptionCatWiseRepositry(applicationIdNo,CatCode, DocType);

                if (result == null || result.Count == 0)
                {
                    return ApiResponse<List<GetApplicantDocResponseDto>>.Fail("No Document Found.");
                }
                else
                {
                    return ApiResponse<List<GetApplicantDocResponseDto>>.Ok(result);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<List<GetApplicantDocResponseDto>>.Fail("Server error, try again later", ex.Message);
            }
        }

        public async Task<ApiResponse<string>> SaveAndUpdateApplicantDocumentsService(SaveAndUpdateApplicantDocumentsDto dto)
        {
            try
            {
                if (dto == null || dto.Documents.Count == 0)
                {
                    return ApiResponse<string>.Fail("Invalid Request");
                }

                var applicationIdNo = dto.ApplicationIdNo;

                if (string.IsNullOrWhiteSpace(applicationIdNo))
                {
                    return ApiResponse<string>.Fail("Invalid Application Id");
                }
                
                var response = await _Licenserepository.SaveAndUpdateApplicantDocumentsRepository(dto);
                if (response == null)
                {
                    return ApiResponse<string>.Fail("No document found");
                }
                return ApiResponse<string>.Ok(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<string>.Fail("Server error, try again later", ex.Message);
            }
        }
    }
}