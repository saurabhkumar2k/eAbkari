using backend.Core.DTOs;
namespace backend.Application.Interfaces.License
{
    public interface ICommonHCRServices
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetailsDto dto);
        Task<LicenseSiteDetailsDto?> GetSiteDetails(String AppId);

        Task<List<CatCodeWiseQuestionDto>?> GetCategoryWiseQuestions(string catCode);

        Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo);


        //Part for the Additional details --starting
        Task<AdditionalHCRCompleteDto?> GetAdditionalHCRCompleteDetails(string applicationIdNo);

        Task<string> SaveAdditionalHCRCompleteDetails(AdditionalHCRCompleteDto dto);

        Task<string> DeletePartner(int id, string applicationIdNo);

        //--Ending(RM)

    }
}