using backend.Core.DTOs;
using backend.Core.Entities.Licence;

namespace backend.Core.Interfaces.License
{
    public interface ICommonHCRRepository
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetails dto);
        Task<LicenseSiteDetailsDto?> GetSiteDetailsRepo(String AppId);


        Task<List<CatCodeWiseQuestionDto>?> GetCategoryWiseQuestions(string catCode);
        Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo);     

        //Part for the Additional details --starting
        Task<AdditionalHCRCompleteDto?> GetAdditionalHCRCompleteDetails(string applicationIdNo);

        Task<string> SaveAdditionalHCRCompleteDetails(AdditionalHCRCompleteDto dto);

        Task<string> DeletePartner(int id, string applicationIdNo);
        //--Ending(RM)
    }
}
