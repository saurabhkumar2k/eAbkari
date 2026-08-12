namespace backend.Core.DTOs
{
    public class AdditionalHCRCompleteDto
    {
        //this is the master Dto For the additional details tab
        public AdditionalHCRDetailsDto AdditionalDetails { get; set; } = new();

        public List<AdditionalCompanyPartnersDetailsDto> Partners { get; set; } = new();

        public List <CategoryWiseAnswersDto> ApplicantAnswers {get; set;} = new();
    }
}