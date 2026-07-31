using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonHCRRepositories : ICommonHCRRepository
    {
        private readonly ApplicationDbContext _context;

        public CommonHCRRepositories(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> SaveApplicantSiteDetails(LicenseSiteDetails dto)
        {
            _context.LicenseSiteDetails.Add(dto);
            _context.ChangeTracker.Entries();
            await _context.SaveChangesAsync();

            return dto.ApplicationIdNo;

        }

        public async Task<LicenseSiteDetailsDto?> GetSiteDetailsRepo(string AppId)
        {
            var site = await _context.LicenseSiteDetails.FirstOrDefaultAsync(x => x.ApplicationIdNo == AppId);

            if (site == null)
            {
                return null;
            }

            var dto = new LicenseSiteDetailsDto
            {

                Regnumber = site.Regnumber,
                ApplicationIdNo = site.ApplicationIdNo,
                FinYear = site.FinYear,
                CatCode = site.CatCode,
                SiteName = site.SiteName,
                SiteAddress = site.SiteAddress,
                SiteAddress2 = site.SiteAddress2,
                State = site.State,
                DistrictCode = site.DistrictCode,
                SubDivisionCode = site.SubDivisionCode,
                PoliceStationCode = site.PoliceStationCode,
                SitePin = site.SitePin,
                SiteAssembly = site.SiteAssembly,
                SiteWard = site.SiteWard,
                SiteEmail = site.SiteEmail,
                SiteMobile = site.SiteMobile,
                SiteLandline = site.SiteLandline,
                SiteFax = site.SiteFax,
                SitePan = site.SitePan
            };

            return dto;
        }
        public async Task<List<CatCodeWiseQuestionDto>?> GetCategoryWiseQuestions(string catCode)
        {

            var Questions = await (
                from cq in _context.CategoryWiseQuestions
                join q in _context.QuestionDetails
                on cq.QuestionId equals q.QuestionId
                where cq.LicenseeCatCode == catCode
                    && cq.ActiveStatus == "Y"
                    && q.QuestionStatus == "Y"
                select new CatCodeWiseQuestionDto
                {
                    QuestionId = q.QuestionId,
                    QuestionDesc = q.QuestionDesc
                }).ToListAsync();

            if (Questions == null)
            {
                return null;
            }

            return Questions;

        }
        public async Task<string> SaveCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto)
        {
            if (dto == null || dto.Count == 0)
                return "No Data Found";

            string appId = dto.First().ApplicationIdNo;

            var oldRecords = _context.CategoryWiseAnswers
                            .Where(x => x.ApplicationIdNo == appId);

            _context.CategoryWiseAnswers.RemoveRange(oldRecords);

            int slNo = 1;

            foreach (var item in dto)
            {
                CategoryWiseAnswers obj = new CategoryWiseAnswers
                {
                    ApplicationIdNo = item.ApplicationIdNo,
                    QuestionId = item.QuestionId,
                    AnswerGiven = item.AnswerGiven,
                    SlNo = slNo++
                };

                _context.CategoryWiseAnswers.Add(obj);
            }

            await _context.SaveChangesAsync();

            return "Saved Successfully";
        }
        public async Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo)
        {
            var answers = await _context.CategoryWiseAnswers
                .Where(x => x.ApplicationIdNo == applicationIdNo)
                .OrderBy(x => x.SlNo)
                .Select(x => new GetApplicationAnswerResponseDto
                {
                    QuestionId = x.QuestionId,
                    AnswerGiven = x.AnswerGiven
                })
                    .ToListAsync();

            if (answers == null || answers.Count == 0)
            {
                return null;
            }

            return answers;
        }

        public async Task<string> UpdateCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto)
        {
            if (dto == null || dto.Count == 0)
                return "No Data Found";

            foreach (var item in dto)
            {
                var answer = await _context.CategoryWiseAnswers
                    .FirstOrDefaultAsync(x =>
                        x.ApplicationIdNo == item.ApplicationIdNo &&
                        x.QuestionId == item.QuestionId);

                if (answer != null)
                {
                    answer.AnswerGiven = item.AnswerGiven;
                }
            }

            await _context.SaveChangesAsync();

            return "Updated Successfully";
        }


        public async Task<string> SaveAndUpdateAdditionalHCRDetails(AdditionalHCRDetailsDto dto)
        {
            try
            {
                var details = await _context.AdditionalHCRDetails
                    .FirstOrDefaultAsync(x => x.ApplicationIdNo == dto.ApplicationIdNo);

                if (details == null)
                {
                    details = new AdditionalHCRDetails
                    {
                        ApplicationIdNo = dto.ApplicationIdNo,
                        NumberOfClubMember = dto.NumberOfClubMember,
                        NumberOfSeatCovers = dto.NumberOfSeatCovers,
                        NumberOfDispensingCounter = dto.NumberOfDispensingCounter,
                        AdditionalArea = dto.AdditionalArea,
                        NumberOfManagers = dto.NumberOfManagers,
                        NumberOfKitchenStaff = dto.NumberOfKitchenStaff,
                        NumberOfUtlityEmployees = dto.NumberOfUtlityEmployees,
                        TotalRoom = dto.TotalRoom,
                        StaffStrength = dto.StaffStrength,
                        StarCategory = dto.StarCategory,
                        ServiceCounter = dto.ServiceCounter,
                        TotalArea = dto.TotalArea,
                        EducationalInsDist = dto.EducationalInsDist,
                        ReligiousPlaceDist = dto.ReligiousPlaceDist,
                        IsSuitableGagdget = dto.IsSuitableGagdget,
                        IsLocalAuthorityApproved = dto.IsLocalAuthorityApproved,
                        IsIndicatingLiquor = dto.IsIndicatingLiquor,
                        NumberOfBarAttendent = dto.NumberOfBarAttendent,
                        StarCategoryRating = dto.StarCategoryRating,
                        RestaurantArea = dto.RestaurantArea,
                        HourOfSale = dto.HourOfSale
                    };
                    _context.AdditionalHCRDetails.Add(details);
                }
                else
                {
                    details.NumberOfClubMember = dto.NumberOfClubMember;
                    details.NumberOfSeatCovers = dto.NumberOfSeatCovers;
                    details.NumberOfDispensingCounter = dto.NumberOfDispensingCounter;
                    details.AdditionalArea = dto.AdditionalArea;
                    details.NumberOfManagers = dto.NumberOfManagers;
                    details.NumberOfKitchenStaff = dto.NumberOfKitchenStaff;
                    details.NumberOfUtlityEmployees = dto.NumberOfUtlityEmployees;
                    details.TotalRoom = dto.TotalRoom;
                    details.StaffStrength = dto.StaffStrength;
                    details.StarCategory = dto.StarCategory;
                    details.ServiceCounter = dto.ServiceCounter;
                    details.TotalArea = dto.TotalArea;
                    details.EducationalInsDist = dto.EducationalInsDist;
                    details.ReligiousPlaceDist = dto.ReligiousPlaceDist;
                    details.IsSuitableGagdget = dto.IsSuitableGagdget;
                    details.IsLocalAuthorityApproved = dto.IsLocalAuthorityApproved;
                    details.IsIndicatingLiquor = dto.IsIndicatingLiquor;
                    details.NumberOfBarAttendent = dto.NumberOfBarAttendent;
                    details.StarCategoryRating = dto.StarCategoryRating;
                    details.RestaurantArea = dto.RestaurantArea;
                    details.HourOfSale = dto.HourOfSale;


                }
                await _context.SaveChangesAsync();

                return "Save/Updated Successfully";

            }
            catch (Exception)
            {
                return "Error Occured";
            }
        }

    }
}