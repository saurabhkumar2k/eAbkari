using backend.Core.DTOs;

namespace backend.Application.Interfaces.License
{
    public interface ICommonLicenseServices
    {
        Task<string> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto);
    }
}