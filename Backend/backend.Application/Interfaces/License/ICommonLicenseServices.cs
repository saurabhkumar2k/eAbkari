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

        Task<string> SaveAndUpdateApplicantDocumentsService(List<SaveAndUpdateApplicantDocumentsDto> dto);

    }
}