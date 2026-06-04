using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class RetailPremiseDetails
    {
        [Key]
        [Required]
        [StringLength(50)]
        public string Application_Id_No { get; set; }

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
        public string? OwnerPremiseSubDivision_Code { get; set; }

        [StringLength(10)]
        public string? OwnerPremisePS_Code { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseLength { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseBreath { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseHeight { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProposedPremiseTotalArea { get; set; }
    }
}