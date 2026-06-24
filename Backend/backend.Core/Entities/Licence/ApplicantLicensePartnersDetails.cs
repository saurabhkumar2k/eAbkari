namespace backend.Core.Entities.Licence
{
    public class ApplicantLicensePartnersDetails
    {
        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set;}

        [StringLength(150)]
        public string PName { get; set;}

        [StringLength(50)]
        public string PPerShare { get; set;}

        [StringLength(50)]
        public string PPanNo { get; set;}

        public int PExciseNominee { get; set;}

        [StringLength(50)]
        public string DocSlNo { get; set;}

        [StringLength(250)]
        public string PhotoURLPanNo { get; set;}

        [StringLength(250)]
        public string PhotoURLAddressProof { get; set;}

        [StringLength(50)]
        public string DINNo { get; set;}

    }

}
