using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RetailApplicationCompleteEnities
{
   // =========================================================
    // 1. RetailDetails
    // =========================================================

    [Table("RetailDetails")]
    public class RetailDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; } = string.Empty;

        public int? ProposedPremiseType { get; set; }

        public decimal? ProposedPremiseLength { get; set; }

        public decimal? ProposedPremiseBreath { get; set; }

        public decimal? ProposedPremiseHeight { get; set; }

        public decimal? ProposedPremiseTotalArea { get; set; }

        public int? PropPremiseAppComArea { get; set; }

        [StringLength(250)]
        public string? PropPremiseAppComAreaAdInfo { get; set; }

        public int? LandLordPhyPossession { get; set; }

        public int? PropPremiseCondition { get; set; }

        public int? PropPremiseLocalBody { get; set; }

        public int? PropPremiseLiquorLicenceRule { get; set; }

        public int? PropPremisePuccaBuild { get; set; }

        [StringLength(250)]
        public string? PropPremisePuccaBuildAdInfo { get; set; }

        public int? PropPremisePresentUse { get; set; }

        [StringLength(250)]
        public string? PropPremisePresentUseAdInfo { get; set; }

        public int? PropPremiseSuitPending { get; set; }

        public int? PropPremiseWaterConn { get; set; }

        public int? PropPremiseJoint { get; set; }

        public int? PropPremiseNOC { get; set; }

        public int? PropPremiseShopMap { get; set; }

        [StringLength(250)]
        public string? OwnerPremiseAddress1 { get; set; }

        [StringLength(250)]
        public string? OwnerPremiseAddress2 { get; set; }

        [StringLength(50)]
        public string? OwnerPremiseState { get; set; }

        [StringLength(100)]
        public string? OwnerPremiseDistrict { get; set; }

        [StringLength(50)]
        public string? OwnerPremisePin { get; set; }

        [StringLength(50)]
        public string? OwnerPremiseMobile { get; set; }

        [StringLength(10)]
        public string? OwnerPremiseSubDivisionCode { get; set; }

        [StringLength(10)]
        public string? OwnerPremisePSCode { get; set; }
    }


    // =========================================================
    // 2. RetailAdditionalPropDetail
    // =========================================================

    [Table("RetailAdditionalPropDetail")]
    public class RetailAdditionalPropDetail
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(50)]
        public string ApplicationIdNo { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Name { get; set; }

        [StringLength(250)]
        public string? AddtionalDesigTypeValue { get; set; }

        
        public int Slno { get; set; } 
    }


    // =========================================================
    // 3. AdditionalL10L22Details
    // =========================================================

    [Table("AdditionalL10L22Details")]
    public class AdditionalL10L22Details
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; } = string.Empty;

        public int? ConstitutionType { get; set; }

        public int? L10Airport { get; set; }

        [StringLength(50)]
        public string? FirmPanNo { get; set; }

        [StringLength(50)]
        public string? TinVatNo { get; set; }

        [StringLength(100)]
        public string? ExciseNomineeEmail { get; set; }

        [StringLength(12)]
        public string? ExciseNomieeMobile { get; set; }

        public int? ExciseNomineeDirCompany { get; set; }

        [StringLength(50)]
        public string? LicencePremiseType { get; set; }

        [StringLength(150)]
        public string? IssuanceDeclaration { get; set; }

        [StringLength(150)]
        public string? ArchitectRegNo { get; set; }

        [StringLength(50)]
        public string? VendLocation { get; set; }

        public int? POSTerminalVendNo { get; set; }

        public int? NoCCTVCamInstalled { get; set; }

        [StringLength(250)]
        public string? CameraMake { get; set; }

        [StringLength(150)]
        public string? RecordingCapacity { get; set; }

        public int? PropPremiseComComplex { get; set; }

        [StringLength(250)]
        public string? PropPremiseComComplexAdInfo { get; set; }

        public int? PropPremiseSustainability { get; set; }

        [StringLength(250)]
        public string? PropPremiseSustainabilityInfo { get; set; }

        [StringLength(50)]
        public string? CINNO { get; set; }

        [StringLength(500)]
        public string? ExciseNomineePANProof { get; set; }

        public int? L10AirportHourSale { get; set; }

        public int? L10AirportHourSaleDefault { get; set; }

        [StringLength(500)]
        public string? FDRDetails { get; set; }
    }
}