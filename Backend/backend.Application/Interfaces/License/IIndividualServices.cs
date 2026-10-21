using backend.Core.DTOs;

namespace backend.Application.Interfaces.License
{
    public interface IIndividualServices
    {
        Task<string> SaveApplicantSiteDetails(IndividualDTO dto);

        Task<IndividualDTO?> GetSiteDetails(string appId);
    }
}