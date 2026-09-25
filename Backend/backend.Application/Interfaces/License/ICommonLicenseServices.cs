using backend.Core.DTOs;

namespace backend.Application.Interfaces.License
{
    public interface ICommonLicenseServices
    {
        Task<string> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto);
        Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId);

        Task<string?> SubmitApplication(string applicationIdNo, string applicationStatus);

        Task<ApplicationIdResponseDto> GetPendingApplicationIds(string catCode,int regId);

        Task<List<GetApplicantDocResponseDto>> GetDocDescriptionCatWiseService(string CatCode,string DocType);

        Task<string> SaveAndUpdateApplicantDocumentsService(List<SaveAndUpdateApplicantDocumentsDto> dto);

    }
}