using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    [Table("AdditionalRetailDetails")]
    public class AdditionalRetailDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [StringLength(50)]
        public string ApplicationIdNo { get; set; } = string.Empty;

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