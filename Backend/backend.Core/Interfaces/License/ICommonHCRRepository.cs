using backend.Core.DTOs;

namespace backend.Core.Interfaces.License
{
    public interface ICommonHCRRepository
    {
        Task<string> SaveApplicantDetails(LicenseApplicationUserDetailsDto dto);
    }
}
