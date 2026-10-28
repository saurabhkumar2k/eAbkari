using backend.Core.DTOs;
using backend.Core.Entities;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using RetailApplicationCompleteEnities;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonRetailRepository : ICommonRetailRepository
    {
        private readonly ApplicationDbContext _context;
        public CommonRetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<MstLicenseeCategory>> GetRetailLicenseeCategoryRepository(string[] RetailCatCodes)
        {
            return await _context.MstLicenseeCategory.Where(x => RetailCatCodes.Contains(x.BranchCode)).ToListAsync();
        }

        public async Task<string> SaveAdditionalRetailCompleteDetails(RetailCompleteDto dto)
        {
            try
            {
                string appId = dto.RetailDetails.ApplicationIdNo;

                //==========================
                // STEP 1 : AdditionalHCRDetails
                //==========================

                var details = await _context.RetailDetails
                    .FirstOrDefaultAsync(x => x.ApplicationIdNo == appId);

                if (details == null)
                {
                    details = new RetailDetails
                    {
                        ApplicationIdNo = appId,

                        ProposedPremiseType = dto.RetailDetails.ProposedPremiseType,
                        ProposedPremiseLength = dto.RetailDetails.ProposedPremiseLength,
                        ProposedPremiseBreath = dto.RetailDetails.ProposedPremiseBreath,
                        ProposedPremiseHeight = dto.RetailDetails.ProposedPremiseHeight,
                        ProposedPremiseTotalArea = dto.RetailDetails.ProposedPremiseTotalArea,
                        PropPremiseAppComArea = dto.RetailDetails.PropPremiseAppComArea,
                        PropPremiseAppComAreaAdInfo = dto.RetailDetails.PropPremiseAppComAreaAdInfo,
                        LandLordPhyPossession = dto.RetailDetails.LandLordPhyPossession,
                        PropPremiseCondition = dto.RetailDetails.PropPremiseCondition,
                        PropPremiseLocalBody = dto.RetailDetails.PropPremiseLocalBody,
                        PropPremiseLiquorLicenceRule = dto.RetailDetails.PropPremiseLiquorLicenceRule,
                        PropPremisePuccaBuild = dto.RetailDetails.PropPremisePuccaBuild,
                        PropPremisePuccaBuildAdInfo = dto.RetailDetails.PropPremisePuccaBuildAdInfo,
                        PropPremisePresentUse = dto.RetailDetails.PropPremisePresentUse,
                        PropPremisePresentUseAdInfo = dto.RetailDetails.PropPremisePresentUseAdInfo,
                        PropPremiseSuitPending = dto.RetailDetails.PropPremiseSuitPending,
                        PropPremiseWaterConn = dto.RetailDetails.PropPremiseWaterConn,
                        PropPremiseJoint = dto.RetailDetails.PropPremiseJoint,
                        PropPremiseNOC = dto.RetailDetails.PropPremiseNOC,
                        PropPremiseShopMap = dto.RetailDetails.PropPremiseShopMap,
                        OwnerPremiseAddress1 = dto.RetailDetails.OwnerPremiseAddress1,
                        OwnerPremiseAddress2 = dto.RetailDetails.OwnerPremiseAddress2,
                        OwnerPremiseState = dto.RetailDetails.OwnerPremiseState,
                        OwnerPremiseDistrict = dto.RetailDetails.OwnerPremiseDistrict,
                        OwnerPremisePin = dto.RetailDetails.OwnerPremisePin,
                        OwnerPremiseMobile = dto.RetailDetails.OwnerPremiseMobile,
                        OwnerPremiseSubDivisionCode = dto.RetailDetails.OwnerPremiseSubDivisionCode,
                        OwnerPremisePSCode = dto.RetailDetails.OwnerPremisePSCode
                    };

                    await _context.RetailDetails.AddAsync(details);
                }
                else
                {
                    details.ProposedPremiseType = dto.RetailDetails.ProposedPremiseType;
                    details.ProposedPremiseLength = dto.RetailDetails.ProposedPremiseLength;
                    details.ProposedPremiseBreath = dto.RetailDetails.ProposedPremiseBreath;
                    details.ProposedPremiseHeight = dto.RetailDetails.ProposedPremiseHeight;
                    details.ProposedPremiseTotalArea = dto.RetailDetails.ProposedPremiseTotalArea;
                    details.PropPremiseAppComArea = dto.RetailDetails.PropPremiseAppComArea;
                    details.PropPremiseAppComAreaAdInfo = dto.RetailDetails.PropPremiseAppComAreaAdInfo;
                    details.LandLordPhyPossession = dto.RetailDetails.LandLordPhyPossession;
                    details.PropPremiseCondition = dto.RetailDetails.PropPremiseCondition;
                    details.PropPremiseLocalBody = dto.RetailDetails.PropPremiseLocalBody;
                    details.PropPremiseLiquorLicenceRule = dto.RetailDetails.PropPremiseLiquorLicenceRule;
                    details.PropPremisePuccaBuild = dto.RetailDetails.PropPremisePuccaBuild;
                    details.PropPremisePuccaBuildAdInfo = dto.RetailDetails.PropPremisePuccaBuildAdInfo;
                    details.PropPremisePresentUse = dto.RetailDetails.PropPremisePresentUse;
                    details.PropPremisePresentUseAdInfo = dto.RetailDetails.PropPremisePresentUseAdInfo;
                    details.PropPremiseSuitPending = dto.RetailDetails.PropPremiseSuitPending;
                    details.PropPremiseWaterConn = dto.RetailDetails.PropPremiseWaterConn;
                    details.PropPremiseJoint = dto.RetailDetails.PropPremiseJoint;
                    details.PropPremiseNOC = dto.RetailDetails.PropPremiseNOC;
                    details.PropPremiseShopMap = dto.RetailDetails.PropPremiseShopMap;
                    details.OwnerPremiseAddress1 = dto.RetailDetails.OwnerPremiseAddress1;
                    details.OwnerPremiseAddress2 = dto.RetailDetails.OwnerPremiseAddress2;
                    details.OwnerPremiseState = dto.RetailDetails.OwnerPremiseState;
                    details.OwnerPremiseDistrict = dto.RetailDetails.OwnerPremiseDistrict;
                    details.OwnerPremisePin = dto.RetailDetails.OwnerPremisePin;
                    details.OwnerPremiseMobile = dto.RetailDetails.OwnerPremiseMobile;
                    details.OwnerPremiseSubDivisionCode = dto.RetailDetails.OwnerPremiseSubDivisionCode;
                    details.OwnerPremisePSCode = dto.RetailDetails.OwnerPremisePSCode;
                }
                //==========================
                // STEP 2 : ApplicantAnswers
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
                //==========================
                // STEP 3 : PropDetails
                //==========================

                var oldPropPartners = _context.RetailAdditionalPropDetail
                    .Where(x => x.ApplicationIdNo == appId);

                _context.RetailAdditionalPropDetail.RemoveRange(oldPropPartners);

                int slNo = 1;

                foreach (var item in dto.RetailPropDetails)
                {
                    RetailAdditionalPropDetail Proppartner =
                        new RetailAdditionalPropDetail
                        {
                            ApplicationIdNo = appId,
                            Name = item.Name,
                            AddtionalDesigTypeValue = item.AddtionalDesigTypeValue,
                            Slno = slNo++
                        };

                    _context.RetailAdditionalPropDetail.Add(Proppartner);
                }
                //==========================
                // STEP 2 : ApplicantLicensePartnersDetails
                //==========================

                var L10Partners = _context.ApplicantLicensePartnersDetails
                    .Where(x => x.ApplicationIdNo == appId);

                _context.ApplicantLicensePartnersDetails.RemoveRange(L10Partners);

                int slNoL10 = 1;

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

                            SlNo = slNoL10++
                        };

                    _context.ApplicantLicensePartnersDetails.Add(partner);
                }

                //Step 4 :
                //=============
                var L10L22details = await _context.AdditionalL10L22Details
                    .FirstOrDefaultAsync(x => x.ApplicationIdNo == appId);

                if (L10L22details == null)
                {
                    L10L22details = new AdditionalL10L22Details
                    {
                        ApplicationIdNo = appId,

                        ConstitutionType = dto.AdditionalL10L22Details.ConstitutionType,
                        L10Airport = dto.AdditionalL10L22Details.L10Airport,
                        FirmPanNo = dto.AdditionalL10L22Details.FirmPanNo,
                        TinVatNo = dto.AdditionalL10L22Details.TinVatNo,
                        ExciseNomineeEmail = dto.AdditionalL10L22Details.ExciseNomineeEmail,
                        ExciseNomieeMobile = dto.AdditionalL10L22Details.ExciseNomieeMobile,
                        ExciseNomineeDirCompany = dto.AdditionalL10L22Details.ExciseNomineeDirCompany,
                        LicencePremiseType = dto.AdditionalL10L22Details.LicencePremiseType,
                        IssuanceDeclaration = dto.AdditionalL10L22Details.IssuanceDeclaration,
                        ArchitectRegNo = dto.AdditionalL10L22Details.ArchitectRegNo,
                        VendLocation = dto.AdditionalL10L22Details.VendLocation,
                        POSTerminalVendNo = dto.AdditionalL10L22Details.POSTerminalVendNo,
                        NoCCTVCamInstalled = dto.AdditionalL10L22Details.NoCCTVCamInstalled,
                        CameraMake = dto.AdditionalL10L22Details.CameraMake,
                        RecordingCapacity = dto.AdditionalL10L22Details.RecordingCapacity,
                        PropPremiseComComplex = dto.AdditionalL10L22Details.PropPremiseComComplex,
                        PropPremiseComComplexAdInfo = dto.AdditionalL10L22Details.PropPremiseComComplexAdInfo,
                        PropPremiseSustainability = dto.AdditionalL10L22Details.PropPremiseSustainability,
                        PropPremiseSustainabilityInfo = dto.AdditionalL10L22Details.PropPremiseSustainabilityInfo,
                        CINNO = dto.AdditionalL10L22Details.CINNO,
                        ExciseNomineePANProof = dto.AdditionalL10L22Details.ExciseNomineePANProof,
                        L10AirportHourSale = dto.AdditionalL10L22Details.L10AirportHourSale,
                        L10AirportHourSaleDefault = dto.AdditionalL10L22Details.L10AirportHourSaleDefault,
                        FDRDetails = dto.AdditionalL10L22Details.FDRDetails
                    };


                    await _context.AdditionalL10L22Details.AddAsync(L10L22details);
                }
                else
                {
                    L10L22details.ConstitutionType = dto.AdditionalL10L22Details.ConstitutionType;
                    L10L22details.L10Airport = dto.AdditionalL10L22Details.L10Airport;
                    L10L22details.FirmPanNo = dto.AdditionalL10L22Details.FirmPanNo;
                    L10L22details.TinVatNo = dto.AdditionalL10L22Details.TinVatNo;
                    L10L22details.ExciseNomineeEmail = dto.AdditionalL10L22Details.ExciseNomineeEmail;
                    L10L22details.ExciseNomieeMobile = dto.AdditionalL10L22Details.ExciseNomieeMobile;
                    L10L22details.ExciseNomineeDirCompany = dto.AdditionalL10L22Details.ExciseNomineeDirCompany;
                    L10L22details.LicencePremiseType = dto.AdditionalL10L22Details.LicencePremiseType;
                    L10L22details.IssuanceDeclaration = dto.AdditionalL10L22Details.IssuanceDeclaration;
                    L10L22details.ArchitectRegNo = dto.AdditionalL10L22Details.ArchitectRegNo;
                    L10L22details.VendLocation = dto.AdditionalL10L22Details.VendLocation;
                    L10L22details.POSTerminalVendNo = dto.AdditionalL10L22Details.POSTerminalVendNo;
                    L10L22details.NoCCTVCamInstalled = dto.AdditionalL10L22Details.NoCCTVCamInstalled;
                    L10L22details.CameraMake = dto.AdditionalL10L22Details.CameraMake;
                    L10L22details.RecordingCapacity = dto.AdditionalL10L22Details.RecordingCapacity;
                    L10L22details.PropPremiseComComplex = dto.AdditionalL10L22Details.PropPremiseComComplex;
                    L10L22details.PropPremiseComComplexAdInfo = dto.AdditionalL10L22Details.PropPremiseComComplexAdInfo;
                    L10L22details.PropPremiseSustainability = dto.AdditionalL10L22Details.PropPremiseSustainability;
                    L10L22details.PropPremiseSustainabilityInfo = dto.AdditionalL10L22Details.PropPremiseSustainabilityInfo;
                    L10L22details.CINNO = dto.AdditionalL10L22Details.CINNO;
                    L10L22details.ExciseNomineePANProof = dto.AdditionalL10L22Details.ExciseNomineePANProof;
                    L10L22details.L10AirportHourSale = dto.AdditionalL10L22Details.L10AirportHourSale;
                    L10L22details.L10AirportHourSaleDefault = dto.AdditionalL10L22Details.L10AirportHourSaleDefault;
                    L10L22details.FDRDetails = dto.AdditionalL10L22Details.FDRDetails;
                }

                await _context.SaveChangesAsync();

                return "Saved Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public async Task<RetailCompleteDto?> GetAdditionalRetailCompleteDetails(string applicationIdNo)
        {
            try
            {
                // ============================================
                // STEP 1 : RetailDetails
                // ============================================

                var retailDetails = await _context.RetailDetails                   
                    .FirstOrDefaultAsync(x => x.ApplicationIdNo == applicationIdNo);


                // ============================================
                // STEP 2 : Applicant Answers
                // ============================================

                var applicantAnswers = await _context.LicenseApplicationCategoryWiseAnswers                   
                    .Where(x => x.ApplicationIdNo == applicationIdNo)
                    .Select(x => new CategoryWiseAnswersDto
                    {
                        ApplicationIdNo = x.ApplicationIdNo,
                        QuestionId = x.QuestionId,
                        AnswerGiven = x.AnswerGiven,
                        SlNo = x.SlNo
                    })
                    .ToListAsync();


                // ============================================
                // STEP 3 : Retail Additional Prop Details
                // ============================================

                var retailPropDetails = await _context.RetailAdditionalPropDetail                   
                    .Where(x => x.ApplicationIdNo == applicationIdNo)
                    .OrderBy(x => x.Slno)
                    .Select(x => new RetailAdditionalPropDetailDto
                    {
                        ApplicationIdNo = x.ApplicationIdNo,
                        Name = x.Name,
                        AddtionalDesigTypeValue = x.AddtionalDesigTypeValue,
                        Slno = x.Slno
                    })
                    .ToListAsync();


                // ============================================
                // STEP 4 : Partners
                // ============================================

                var partners = await _context.ApplicantLicensePartnersDetails                    
                    .Where(x => x.ApplicationIdNo == applicationIdNo)
                    .OrderBy(x => x.SlNo)
                    .Select(x => new AdditionalCompanyPartnersDetailsDto
                    {
                        ApplicationIdNo = x.ApplicationIdNo,
                        PName = x.PName,
                        PPerShare = x.PPerShare,
                        PPanNo = x.PPanNo,
                        PExciseNominee = x.PExciseNominee,
                        DINNo = x.DINNo,
                        PanFileUploaded = x.PhotoURLPanNo,
                        AddressFileUploaded = x.PhotoURLAddressProof,
                        SlNo = x.SlNo
                    })
                    .ToListAsync();


                // ============================================
                // STEP 5 : Additional L10/L22 Details
                // ============================================

                var additionalL10L22Details = await _context.AdditionalL10L22Details                   
                    .FirstOrDefaultAsync(x => x.ApplicationIdNo == applicationIdNo);


                // ============================================
                // STEP 6 : If nothing exists
                // ============================================

                if (retailDetails == null &&
                    applicantAnswers.Count == 0 &&
                    retailPropDetails.Count == 0 &&
                    partners.Count == 0 &&
                    additionalL10L22Details == null)
                {
                    return null;
                }


                // ============================================
                // STEP 7 : Prepare Final DTO
                // ============================================

                var result = new RetailCompleteDto
                {
                    ApplicantAnswers = applicantAnswers,

                    RetailPropDetails = retailPropDetails,

                    Partners = partners,

                    RetailDetails = retailDetails == null
                        ? new RetailDetailsDto()
                        : new RetailDetailsDto
                        {
                            ApplicationIdNo = retailDetails.ApplicationIdNo,
                            ProposedPremiseType = retailDetails.ProposedPremiseType,
                            ProposedPremiseLength = retailDetails.ProposedPremiseLength,
                            ProposedPremiseBreath = retailDetails.ProposedPremiseBreath,
                            ProposedPremiseHeight = retailDetails.ProposedPremiseHeight,
                            ProposedPremiseTotalArea = retailDetails.ProposedPremiseTotalArea,
                            PropPremiseAppComArea = retailDetails.PropPremiseAppComArea,
                            PropPremiseAppComAreaAdInfo = retailDetails.PropPremiseAppComAreaAdInfo,
                            LandLordPhyPossession = retailDetails.LandLordPhyPossession,
                            PropPremiseCondition = retailDetails.PropPremiseCondition,
                            PropPremiseLocalBody = retailDetails.PropPremiseLocalBody,
                            PropPremiseLiquorLicenceRule = retailDetails.PropPremiseLiquorLicenceRule,
                            PropPremisePuccaBuild = retailDetails.PropPremisePuccaBuild,
                            PropPremisePuccaBuildAdInfo = retailDetails.PropPremisePuccaBuildAdInfo,
                            PropPremisePresentUse = retailDetails.PropPremisePresentUse,
                            PropPremisePresentUseAdInfo = retailDetails.PropPremisePresentUseAdInfo,
                            PropPremiseSuitPending = retailDetails.PropPremiseSuitPending,
                            PropPremiseWaterConn = retailDetails.PropPremiseWaterConn,
                            PropPremiseJoint = retailDetails.PropPremiseJoint,
                            PropPremiseNOC = retailDetails.PropPremiseNOC,
                            PropPremiseShopMap = retailDetails.PropPremiseShopMap,
                            OwnerPremiseAddress1 = retailDetails.OwnerPremiseAddress1,
                            OwnerPremiseAddress2 = retailDetails.OwnerPremiseAddress2,
                            OwnerPremiseState = retailDetails.OwnerPremiseState,
                            OwnerPremiseDistrict = retailDetails.OwnerPremiseDistrict,
                            OwnerPremisePin = retailDetails.OwnerPremisePin,
                            OwnerPremiseMobile = retailDetails.OwnerPremiseMobile,
                            OwnerPremiseSubDivisionCode = retailDetails.OwnerPremiseSubDivisionCode,
                            OwnerPremisePSCode = retailDetails.OwnerPremisePSCode
                        },


                    AdditionalL10L22Details = additionalL10L22Details == null
                        ? new AdditionalL10L22DetailsDto()
                        : new AdditionalL10L22DetailsDto
                        {
                            ApplicationIdNo = additionalL10L22Details.ApplicationIdNo,
                            ConstitutionType = additionalL10L22Details.ConstitutionType,
                            L10Airport = additionalL10L22Details.L10Airport,
                            FirmPanNo = additionalL10L22Details.FirmPanNo,
                            TinVatNo = additionalL10L22Details.TinVatNo,
                            ExciseNomineeEmail = additionalL10L22Details.ExciseNomineeEmail,
                            ExciseNomieeMobile = additionalL10L22Details.ExciseNomieeMobile,
                            ExciseNomineeDirCompany = additionalL10L22Details.ExciseNomineeDirCompany,
                            LicencePremiseType = additionalL10L22Details.LicencePremiseType,
                            IssuanceDeclaration = additionalL10L22Details.IssuanceDeclaration,
                            ArchitectRegNo = additionalL10L22Details.ArchitectRegNo,
                            VendLocation = additionalL10L22Details.VendLocation,
                            POSTerminalVendNo = additionalL10L22Details.POSTerminalVendNo,
                            NoCCTVCamInstalled = additionalL10L22Details.NoCCTVCamInstalled,
                            CameraMake = additionalL10L22Details.CameraMake,
                            RecordingCapacity = additionalL10L22Details.RecordingCapacity,
                            PropPremiseComComplex = additionalL10L22Details.PropPremiseComComplex,
                            PropPremiseComComplexAdInfo = additionalL10L22Details.PropPremiseComComplexAdInfo,
                            PropPremiseSustainability = additionalL10L22Details.PropPremiseSustainability,
                            PropPremiseSustainabilityInfo = additionalL10L22Details.PropPremiseSustainabilityInfo,
                            CINNO = additionalL10L22Details.CINNO,
                            ExciseNomineePANProof = additionalL10L22Details.ExciseNomineePANProof,
                            L10AirportHourSale = additionalL10L22Details.L10AirportHourSale,
                            L10AirportHourSaleDefault = additionalL10L22Details.L10AirportHourSaleDefault,
                            FDRDetails = additionalL10L22Details.FDRDetails
                        }
                };


                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "Error while fetching Retail complete details: " + ex.Message,
                    ex
                );
            }
        }
    }
}