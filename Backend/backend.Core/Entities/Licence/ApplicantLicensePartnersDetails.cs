namespace backend.Core.Entities.Licence
{
    public class ApplicantLicensePartnersDetails
    {
        [Key]
        [Required]
        [StringLength(50)]
        public string ApplicationIdNo { get; set;}

        [StringLength(150)]
        [Required]
        public string PName { get; set;}

        [StringLength(50)]
        [Required]
        public string PPerShare { get; set;}

        [StringLength(50)]
        [Required]
        public string PPanNo { get; set;}
        
        [Required]
        public int PExciseNominee { get; set;}

        [StringLength(50)]
        [Required]
        public string DocSlNo { get; set;}

        [StringLength(250)]
        [Required]
        public string PhotoURLPanNo { get; set;}

        [StringLength(250)]
        [Required]
        public string PhotoURLAddressProof { get; set;}

        [StringLength(50)]
        public string? DINNo { get; set;}

    }

}
