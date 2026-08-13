using backend.Core.DTOs;
using backend.Core.Entities.Licence;

namespace backend.Core.Interfaces.License
{
    public interface ICommonLicenseRepository
    {
        Task<string?> GetLastApplicationId();
        Task<string> SaveApplicantDetails(LicenseApplicationUserDetails userDetails, LicenseApplication application);
        Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId);
        Task<string?> GetFinYear();

        Task<string?>GetFlowUpto( string CatCode, string ActivityId);
    }
}