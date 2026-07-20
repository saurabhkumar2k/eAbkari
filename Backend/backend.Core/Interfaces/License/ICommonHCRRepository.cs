using backend.Core.DTOs;
using backend.Core.Entities.Licence;

namespace backend.Core.Interfaces.License
{
    public interface ICommonHCRRepository
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetails dto);
    }
}
