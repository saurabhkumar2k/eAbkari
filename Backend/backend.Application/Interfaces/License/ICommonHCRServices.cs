using backend.Core.DTOs;
namespace backend.Application.Interfaces.License
{
    public interface ICommonHCRServices
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetailsDto dto);
    }
}