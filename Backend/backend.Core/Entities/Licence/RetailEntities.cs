using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    [Table("RetailPremiseDetails")]
    public class RetailPremiseDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; }

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

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseLength { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseBreath { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseHeight { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseTotalArea { get; set; }
    }

    [Table("AdditionalRetailDetails")]
    public class AdditionalRetailDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; } 

        public int? ProposedPremiseType { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseLength { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseBreath { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseHeight { get; set; }

        [Column(TypeName = "decimal(18,2)")]
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
    }
}