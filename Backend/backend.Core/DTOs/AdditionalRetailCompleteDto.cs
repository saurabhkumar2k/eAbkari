using backend.Core.DTOs.Licence;
using backend.Core.Entities.Licence;

namespace backend.Core.DTOs
{
    public class RetailCompleteDto
    {
        public List<CategoryWiseAnswersDto> ApplicantAnswers { get; set; } = new();
        public RetailDetailsDto  RetailDetails {get;set;} = new();
        public List<RetailAdditionalPropDetailDto> RetailPropDetails { get; set; } = new();
        public  AdditionalL10L22DetailsDto AdditionalL10L22Details { get; set; } = new();
        public List<AdditionalCompanyPartnersDetailsDto> Partners { get; set; } = new();
    }

    public class RetailDetailsDto
    {

        public string ApplicationIdNo { get; set; }

        public int? ProposedPremiseType { get; set; }

        public decimal? ProposedPremiseLength { get; set; }

        public decimal? ProposedPremiseBreath { get; set; }

        public decimal? ProposedPremiseHeight { get; set; }

        public decimal? ProposedPremiseTotalArea { get; set; }

        public int? PropPremiseAppComArea { get; set; }

        public string? PropPremiseAppComAreaAdInfo { get; set; }

        public int? LandLordPhyPossession { get; set; }

        public int? PropPremiseCondition { get; set; }

        public int? PropPremiseLocalBody { get; set; }

        public int? PropPremiseLiquorLicenceRule { get; set; }

        public int? PropPremisePuccaBuild { get; set; }

        public string? PropPremisePuccaBuildAdInfo { get; set; }

        public int? PropPremisePresentUse { get; set; }

        public string? PropPremisePresentUseAdInfo { get; set; }

        public int? PropPremiseSuitPending { get; set; }

        public int? PropPremiseWaterConn { get; set; }

        public int? PropPremiseJoint { get; set; }

        public int? PropPremiseNOC { get; set; }

        public int? PropPremiseShopMap { get; set; }

        public string? OwnerPremiseAddress1 { get; set; }

        public string? OwnerPremiseAddress2 { get; set; }

        public string? OwnerPremiseState { get; set; }

        public string? OwnerPremiseDistrict { get; set; }

        public string? OwnerPremisePin { get; set; }

        public string? OwnerPremiseMobile { get; set; }

        public string? OwnerPremiseSubDivisionCode { get; set; }

        public string? OwnerPremisePSCode { get; set; }
    }

    public class RetailAdditionalPropDetailDto
    {

        public string ApplicationIdNo { get; set; }

        public string? Name { get; set; }

        public string? AddtionalDesigTypeValue { get; set; }

        public int Slno { get; set; }
    }
    public class AdditionalL10L22DetailsDto
    {

        public string ApplicationIdNo { get; set; }

        public int? ConstitutionType { get; set; }

        public int? L10Airport { get; set; }

        public string? FirmPanNo { get; set; }

        public string? TinVatNo { get; set; }

        public string? ExciseNomineeEmail { get; set; }

        public string? ExciseNomieeMobile { get; set; }

        public int? ExciseNomineeDirCompany { get; set; }

        public string? LicencePremiseType { get; set; }

        public string? IssuanceDeclaration { get; set; }

        public string? ArchitectRegNo { get; set; }

        public string? VendLocation { get; set; }

        public int? POSTerminalVendNo { get; set; }

        public int? NoCCTVCamInstalled { get; set; }

        public string? CameraMake { get; set; }

        public string? RecordingCapacity { get; set; }

        public int? PropPremiseComComplex { get; set; }

        public string? PropPremiseComComplexAdInfo { get; set; }

        public int? PropPremiseSustainability { get; set; }

        public string? PropPremiseSustainabilityInfo { get; set; }

        public string? CINNO { get; set; }

        public string? ExciseNomineePANProof { get; set; }

        public int? L10AirportHourSale { get; set; }

        public int? L10AirportHourSaleDefault { get; set; }

        public string? FDRDetails { get; set; }
    }
}
