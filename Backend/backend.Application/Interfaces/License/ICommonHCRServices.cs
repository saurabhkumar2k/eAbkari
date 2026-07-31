using backend.Core.DTOs;
namespace backend.Application.Interfaces.License
{
    public interface ICommonHCRServices
    {
        Task<string> SaveApplicantSiteDetails(LicenseSiteDetailsDto dto);
        Task<LicenseSiteDetailsDto?> GetSiteDetails(String AppId);

        Task<List<CatCodeWiseQuestionDto>?> GetCategoryWiseQuestions( string catCode);

        Task<string> SaveCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto);
        Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo);

        Task<string> UpdateCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto);

        Task<string> SaveAndUpdateAdditionalHCRDetails(AdditionalHCRDetailsDto dto);



    }
}