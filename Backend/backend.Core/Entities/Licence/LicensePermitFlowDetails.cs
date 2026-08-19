
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class MstFlowApplicable
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string LicenseCategory { get; set; } = null!;

        public string? ImplementingStateCode { get; set; }

        public string? ApplicableCommissionerate { get; set; }

        public string? ApplicableObjection { get; set; }

        public string? ApplicableGovernment { get; set; }

        public string FlowUptoCode { get; set; } = null!;

        public string ActivityId { get; set; } = null!;
    }

    public class MstFlowUpto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string FlowUptoCode { get; set; } = null!;

        public string? FlowUptoDesc { get; set; }

        public string? IsActive { get; set; }

        public string? IsLicensePermit { get; set; }
    }

}