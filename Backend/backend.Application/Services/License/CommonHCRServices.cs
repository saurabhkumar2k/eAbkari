using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;

namespace backend.Application.Services.License
{
    public class CommonHCRServices : ICommonHCRServices
    {
        public readonly ICommonHCRRepository _HcrRepositry;

        public CommonHCRServices(ICommonHCRRepository repository)
        {
            _HcrRepositry = repository;
        }

        public async Task<string> SaveApplicantSiteDetails(LicenseSiteDetailsDto dto)
        {
            try
            {

                var Sitedetails = new LicenseSiteDetails
                {

                    Regnumber = dto.Regnumber,
                    ApplicationIdNo = dto.ApplicationIdNo,
                    FinYear = dto.FinYear,
                    CatCode = dto.CatCode,
                    SiteName = dto.SiteName,
                    SiteAddress = dto.SiteAddress,
                    SiteAddress2 = dto.SiteAddress2,
                    State = dto.State,
                    DistrictCode = dto.DistrictCode,
                    SubDivisionCode = dto.SubDivisionCode,
                    PoliceStationCode = dto.PoliceStationCode,
                    SitePin = dto.SitePin,
                    SiteAssembly = dto.SiteAssembly,
                    SiteWard = dto.SiteWard,
                    SiteEmail = dto.SiteEmail,
                    SiteMobile = dto.SiteMobile,
                    SiteLandline = dto.SiteLandline,
                    SiteFax = dto.SiteFax,
                    SitePan = dto.SitePan


                };
                return await _HcrRepositry.SaveApplicantSiteDetails(Sitedetails);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<LicenseSiteDetailsDto?> GetSiteDetails(string AppId)
        {
            try
            {
                return await _HcrRepositry.GetSiteDetailsRepo(AppId);
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public async Task<List<CatCodeWiseQuestionDto>?> GetCategoryWiseQuestions(string catCode)
        {
            try
            {
                return await _HcrRepositry.GetCategoryWiseQuestions(catCode);
            }
            catch (Exception ex)
            {

                return null;
            }

        }
       
        public async Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo)
        {
            try
            {
                return await _HcrRepositry.GetAppIdWiseAnswers(applicationIdNo);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        //Part for the HCR AdditionalDetails --starting
        public async Task<AdditionalHCRCompleteDto?> GetAdditionalHCRCompleteDetails(string applicationIdNo)
        {
            try
            {
                return await _HcrRepositry.GetAdditionalHCRCompleteDetails(applicationIdNo);
            }
            catch
            {
                return null;
            }
        }

        public async Task<string> SaveAdditionalHCRCompleteDetails(AdditionalHCRCompleteDto dto)
        {
            try
            {
                return await _HcrRepositry.SaveAdditionalHCRCompleteDetails(dto);
            }
            catch
            {
                return "Operation Failed";
            }
        }

        public async Task<string> DeletePartner(int id, string applicationIdNo)
        {
            try
            {
                return await _HcrRepositry.DeletePartner(id, applicationIdNo);
            }
            catch
            {
                return "Delete Failed";
            }
        }
        //--ending

    }
}