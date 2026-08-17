using System.Linq.Expressions;
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
                //SiteAssembly = site.SiteAssembly,
                //SiteWard = site.SiteWard,
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
                from cq in _context.LicenseApplicationCategoryWiseQuestion
                join q in _context.MstQuestionDetails
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

        public async Task<List<GetApplicationAnswerResponseDto>?> GetAppIdWiseAnswers(string applicationIdNo)
        {
            var answers = await _context.LicenseApplicationCategoryWiseAnswers
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


        public async Task<string> SaveAdditionalHCRCompleteDetails(AdditionalHCRCompleteDto dto)
        {
            try
            {
                string appId = dto.AdditionalDetails.ApplicationIdNo;

                //==========================
                // STEP 1 : AdditionalHCRDetails
                //==========================

                var details = await _context.AdditionalHCRDetails
                    .FirstOrDefaultAsync(x => x.ApplicationIdNo == appId);

                if (details == null)
                {
                    details = new AdditionalHCRDetails
                    {
                        ApplicationIdNo = appId,
                        NumberOfClubMember = dto.AdditionalDetails.NumberOfClubMember,
                        NumberOfSeatCovers = dto.AdditionalDetails.NumberOfSeatCovers,
                        NumberOfDispensingCounter = dto.AdditionalDetails.NumberOfDispensingCounter,
                        AdditionalArea = dto.AdditionalDetails.AdditionalArea,
                        NumberOfManagers = dto.AdditionalDetails.NumberOfManagers,
                        NumberOfKitchenStaff = dto.AdditionalDetails.NumberOfKitchenStaff,
                        NumberOfUtlityEmployees = dto.AdditionalDetails.NumberOfUtlityEmployees,
                        TotalRoom = dto.AdditionalDetails.TotalRoom,
                        StaffStrength = dto.AdditionalDetails.StaffStrength,
                        StarCategory = dto.AdditionalDetails.StarCategory,
                        ServiceCounter = dto.AdditionalDetails.ServiceCounter,
                        TotalArea = dto.AdditionalDetails.TotalArea,
                        EducationalInsDist = dto.AdditionalDetails.EducationalInsDist,
                        ReligiousPlaceDist = dto.AdditionalDetails.ReligiousPlaceDist,
                        IsSuitableGagdget = dto.AdditionalDetails.IsSuitableGagdget,
                        IsLocalAuthorityApproved = dto.AdditionalDetails.IsLocalAuthorityApproved,
                        IsIndicatingLiquor = dto.AdditionalDetails.IsIndicatingLiquor,
                        NumberOfBarAttendent = dto.AdditionalDetails.NumberOfBarAttendent,
                        StarCategoryRating = dto.AdditionalDetails.StarCategoryRating,
                        RestaurantArea = dto.AdditionalDetails.RestaurantArea,
                        HourOfSale = dto.AdditionalDetails.HourOfSale
                    };

                    _context.AdditionalHCRDetails.Add(details);
                }
                else
                {
                    details.NumberOfClubMember = dto.AdditionalDetails.NumberOfClubMember;
                    details.NumberOfSeatCovers = dto.AdditionalDetails.NumberOfSeatCovers;
                    details.NumberOfDispensingCounter = dto.AdditionalDetails.NumberOfDispensingCounter;
                    details.AdditionalArea = dto.AdditionalDetails.AdditionalArea;
                    details.NumberOfManagers = dto.AdditionalDetails.NumberOfManagers;
                    details.NumberOfKitchenStaff = dto.AdditionalDetails.NumberOfKitchenStaff;
                    details.NumberOfUtlityEmployees = dto.AdditionalDetails.NumberOfUtlityEmployees;
                    details.TotalRoom = dto.AdditionalDetails.TotalRoom;
                    details.StaffStrength = dto.AdditionalDetails.StaffStrength;
                    details.StarCategory = dto.AdditionalDetails.StarCategory;
                    details.ServiceCounter = dto.AdditionalDetails.ServiceCounter;
                    details.TotalArea = dto.AdditionalDetails.TotalArea;
                    details.EducationalInsDist = dto.AdditionalDetails.EducationalInsDist;
                    details.ReligiousPlaceDist = dto.AdditionalDetails.ReligiousPlaceDist;
                    details.IsSuitableGagdget = dto.AdditionalDetails.IsSuitableGagdget;
                    details.IsLocalAuthorityApproved = dto.AdditionalDetails.IsLocalAuthorityApproved;
                    details.IsIndicatingLiquor = dto.AdditionalDetails.IsIndicatingLiquor;
                    details.NumberOfBarAttendent = dto.AdditionalDetails.NumberOfBarAttendent;
                    details.StarCategoryRating = dto.AdditionalDetails.StarCategoryRating;
                    details.RestaurantArea = dto.AdditionalDetails.RestaurantArea;
                    details.HourOfSale = dto.AdditionalDetails.HourOfSale;
                }

                //==========================
                // STEP 2 : ApplicantLicensePartnersDetails
                //==========================

                var oldPartners = _context.ApplicantLicensePartnersDetails
                    .Where(x => x.ApplicationIdNo == appId);

                _context.ApplicantLicensePartnersDetails.RemoveRange(oldPartners);

                int slNo = 1;

                foreach (var item in dto.Partners)
                {
                    ApplicantLicensePartnersDetails partner =
                        new ApplicantLicensePartnersDetails
                        {
                            ApplicationIdNo = appId,
                            PName = item.PName,
                            PPerShare = item.PPerShare,
                            PPanNo = item.PPanNo,
                            PExciseNominee = item.PExciseNominee,
                            DINNo = item.DINNo,

                            PhotoURLPanNo = string.IsNullOrWhiteSpace(item.PanFileUploaded)
                                ? null
                                : appId + "_" + item.PanFileUploaded,

                            PhotoURLAddressProof = string.IsNullOrWhiteSpace(item.AddressFileUploaded)
                                ? null
                                : appId + "_" + item.AddressFileUploaded,

                            SlNo = slNo++
                        };

                    _context.ApplicantLicensePartnersDetails.Add(partner);
                }
                //==========================
                // STEP 3 : ApplicantAnswers
                //==========================

                if (dto.ApplicantAnswers != null && dto.ApplicantAnswers.Count > 0)
                {
                    foreach (var item in dto.ApplicantAnswers)
                    {
                        var answer = await _context.LicenseApplicationCategoryWiseAnswers
                            .FirstOrDefaultAsync(x =>
                                x.ApplicationIdNo == appId &&
                                x.QuestionId == item.QuestionId);

                        if (answer != null)
                        {
                            // Existing QuestionId -> Update Answer
                            answer.AnswerGiven = item.AnswerGiven;
                            answer.SlNo = item.SlNo;
                        }
                        else
                        {
                            // New QuestionId -> Insert
                            LicenseApplicationCategoryWiseAnswers newAnswer = new LicenseApplicationCategoryWiseAnswers
                            {
                                ApplicationIdNo = appId,
                                QuestionId = item.QuestionId,
                                AnswerGiven = item.AnswerGiven,
                                SlNo = item.SlNo
                            };

                            _context.LicenseApplicationCategoryWiseAnswers.Add(newAnswer);
                        }

                    }
                }
                    await _context.SaveChangesAsync();

                    return "Saved Successfully";
                
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<AdditionalHCRCompleteDto?> GetAdditionalHCRCompleteDetails(string applicationIdNo)
        {
            try
            {


                var additionalDetails = await _context.AdditionalHCRDetails
                    .Where(x => x.ApplicationIdNo == applicationIdNo)
                    .Select(x => new AdditionalHCRDetailsDto
                    {
                        ApplicationIdNo = x.ApplicationIdNo,
                        NumberOfClubMember = x.NumberOfClubMember,
                        NumberOfSeatCovers = x.NumberOfSeatCovers,
                        NumberOfDispensingCounter = x.NumberOfDispensingCounter,
                        AdditionalArea = x.AdditionalArea,
                        NumberOfManagers = x.NumberOfManagers,
                        NumberOfKitchenStaff = x.NumberOfKitchenStaff,
                        NumberOfUtlityEmployees = x.NumberOfUtlityEmployees,
                        TotalRoom = x.TotalRoom,
                        StaffStrength = x.StaffStrength,
                        StarCategory = x.StarCategory,
                        ServiceCounter = x.ServiceCounter,
                        TotalArea = x.TotalArea,
                        EducationalInsDist = x.EducationalInsDist,
                        ReligiousPlaceDist = x.ReligiousPlaceDist,
                        IsSuitableGagdget = x.IsSuitableGagdget,
                        IsLocalAuthorityApproved = x.IsLocalAuthorityApproved,
                        IsIndicatingLiquor = x.IsIndicatingLiquor,
                        NumberOfBarAttendent = x.NumberOfBarAttendent,
                        StarCategoryRating = x.StarCategoryRating,
                        RestaurantArea = x.RestaurantArea,
                        HourOfSale = x.HourOfSale
                    })
                    .FirstOrDefaultAsync();

                if (additionalDetails == null)
                {
                    return null;
                }

                var partners = await _context.ApplicantLicensePartnersDetails
                    .Where(x => x.ApplicationIdNo == applicationIdNo)
                    .OrderBy(x => x.SlNo)
                    .Select(x => new AdditionalCompanyPartnersDetailsDto
                    {
                        ID = x.ID,
                        ApplicationIdNo = x.ApplicationIdNo,
                        PName = x.PName,
                        PPerShare = x.PPerShare,
                        PPanNo = x.PPanNo,
                        PExciseNominee = x.PExciseNominee,
                        DINNo = x.DINNo,

                        PhotoURLPanNo = x.PhotoURLPanNo,

                        PanFileUploaded = x.PhotoURLPanNo,

                        AddressFileUploaded = x.PhotoURLAddressProof,

                        SlNo = x.SlNo
                    })
                    .ToListAsync();

                //==========================
                // STEP 3 : Applicant Answers
                //==========================

                var applicantAnswers = await _context.LicenseApplicationCategoryWiseAnswers
                    .Where(x => x.ApplicationIdNo == applicationIdNo)
                    .OrderBy(x => x.SlNo)
                    .Select(x => new CategoryWiseAnswersDto
                    {
                        ApplicationIdNo = x.ApplicationIdNo,
                        QuestionId = x.QuestionId,
                        AnswerGiven = x.AnswerGiven
                        //SlNo = x.SlNo
                    })
                    .ToListAsync();

                return new AdditionalHCRCompleteDto
                {
                    AdditionalDetails = additionalDetails,
                    Partners = partners,
                    ApplicantAnswers = applicantAnswers
                };
            }
            catch (Exception ex)
            {
                var error = ex.Message;
                return null;
            }
        }
        public async Task<string> DeletePartner(int id, string applicationIdNo)
        {
            var partner = await _context.ApplicantLicensePartnersDetails
                .FirstOrDefaultAsync(x =>
                    x.SlNo == id &&
                    x.ApplicationIdNo == applicationIdNo);

            if (partner == null)
            {
                return "Record Not Found";
            }

            _context.ApplicantLicensePartnersDetails.Remove(partner);

            await _context.SaveChangesAsync();

            return "Deleted Successfully";
        }
    }
}