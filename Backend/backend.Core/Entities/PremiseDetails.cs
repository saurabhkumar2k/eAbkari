using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class PremiseDetails
    {
        [Key]
        public int ID { get; set; }
        public string? ApplicationIdNo { get; set; }
        public string? PremiseID { get; set; }
        public string? PremiseName { get; set; }
        public string? PremiseAddress1 { get; set; }
        public string? PremiseAddress2 { get; set; }
        public string? PANNo { get; set; }
        public string? GSTNo { get; set; }
        public int? HallNo { get; set; }
        public string? FNameOfOwner { get; set; }
        public string? LNameOfOwner { get; set; }
        public string? PinCode { get; set; }
        public string? EmailID { get; set; }
        public string? MobileNo { get; set; }
        public string? PremiseType { get; set; }
        public string? OwnerShipType { get; set; }
        public string? IsApproved { get; set; }
        public DateTime? RegistrationDate { get; set; }
    }
}
