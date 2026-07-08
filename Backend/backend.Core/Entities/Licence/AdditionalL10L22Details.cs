using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
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