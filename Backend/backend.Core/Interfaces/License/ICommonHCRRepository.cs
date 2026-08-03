using backend.Core.DTOs;
using backend.Core.Entities.Licence;

namespace backend.Core.Interfaces.License
{
    public interface ICommonHCRRepository
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetails dto);
        Task<LicenseSiteDetailsDto?> GetSiteDetailsRepo(String AppId);


        Task<List<CatCodeWiseQuestionDto>?> GetCategoryWiseQuestions(string catCode);

        Task<string> SaveCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto);

        Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo);
        Task<string> UpdateCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto);

        Task<string> SaveAndUpdateAdditionalHCRDetails(AdditionalHCRDetailsDto dto);
        
        Task<AdditionalHCRDetailsDto?> GetAditionalDetailsIDWise(string applicationIdNo);

    }
}
