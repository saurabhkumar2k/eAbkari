using backend.Core.DTOs;
using backend.Core.Entities;

namespace backend.Application.Interfaces.License
{
    public interface ICommonLicenseServices
    {
        Task<ApiResponse<LicenseApplicationUserDetailsResponseDto>> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto);
        Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId);
        Task<ApiResponse<SubmitApplicationDTO>> SubmitApplication(SubmitApplicationDTO dto);

        Task<ApiResponse<ApplicationIdResponseDto>> GetPendingApplicationId(string catCode,int regId);

        Task<ApiResponse<List<GetApplicantDocResponseDto>>> GetDocDescriptionCatWiseService(string applicationIdNo,string CatCode,string DocType);
        
        Task<ApiResponse<List<GetApplicantDocResponseDto>>> GetAttachDocService(string applicationIdNo,string catCode);


        Task<ApiResponse<string>> SaveAndUpdateApplicantDocumentsService(SaveAndUpdateApplicantDocumentsDto dto);
        Task<ApiResponse<List<LifeCycleDto>>> GetLifeCycleService(string applicationIdNo);

    }
}