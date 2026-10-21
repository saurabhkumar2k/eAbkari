using backend.Core.DTOs;
using backend.Core.Entities.Licence;

namespace backend.Core.Interfaces.License
{
    public interface IIndividualRepository
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetails entity);

        Task<IndividualDTO?> GetSiteDetailsRepo(string appId);
    }
}