
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    //public class LicenseApplication
    //{
    //    [StringLength(10)]
    //    [Required]
    //    public string Mobile_No { get; set; }

    //    [StringLength(50)]
    //    public string? IP_Address { get; set; }

    //    [StringLength(50)]
    //    [Required]
    //    public string Registration_number { get; set; }

    //    [Key]
    //    [Required]
    //    [StringLength(50)]
    //    public string Application_Id_No { get; set; }
    //    [Required] 
    //    public DateTime Application_Date { get; set; }

    //    [Required]
    //    [StringLength(9)]
    //    public string Fin_Year { get; set; }

    //    [Required]
    //    [StringLength(2)]
    //    public string Application_Status { get; set; }

    //    [Required]
    //    [StringLength(2)]
    //    public string Cat_Code { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string State { get; set; }

    //    [Required]
    //    [StringLength(4)]
    //    public string District_Code { get; set; }

    //    [Required]
    //    [StringLength(250)]
    //    public string SiteName { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string SiteAssembly { get; set; }

    //    [StringLength(50)]
    //    public string? SiteWard { get; set; }

    //    [Required]
    //    [StringLength(150)]
    //    public string SiteEmail { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string SiteMobile { get; set; }

    //    [StringLength(50)]
    //    public string? SiteLandline { get; set; }

    //    [StringLength(50)]
    //    public string? SiteFax { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string SitePin { get; set; }

    //    [StringLength(1)]
    //    public string? Site_Type { get; set; }

    //    [Required]
    //    [StringLength(500)]
    //    public string Site_Address { get; set; }

    //    [Required]
    //    [StringLength(500)]
    //    public string Site_Address2 { get; set; }

    //    public int? NumberOfClubMember { get; set; }


    //    [StringLength(1)]
    //    public string? Additional_Bar { get; set; }

    //    public int? No_Additional_Bar { get; set; }

    //    public string? Name_Additional_Bar { get; set; }

    //    [StringLength(1)]
    //    public string? Location_Category { get; set; }

    //    [Required]
    //    [StringLength(10)]
    //    public string Site_Dist { get; set; }


    //    [StringLength(1)]
    //    public string? License_Type { get; set; }

    //    [StringLength(2)]
    //    public string? Excise_Dist_Code { get; set; }

    //    [StringLength(1)]
    //    public string? Whether_app_complete { get; set; }


    //    [StringLength(1)]
    //    public string? Site_Enquiry_Report_Submitted { get; set; }

    //    public DateTime? Enquiry_Report_Sent_Date { get; set; }

    //    [StringLength(1)]
    //    public string? Application_Flag { get; set; }

    //    public string? Reject_Excom_Remarks { get; set; }

    //    public DateTime? Reject_Excom_Date { get; set; }

    //    [Column(TypeName = "decimal(18,2)")]
    //    public decimal? Total_Fee_Excise { get; set; }

    //    [StringLength(1)]
    //    public string? Generate_Licensee_ID { get; set; }

    //    public DateTime? Generate_Licensee_ID_Date { get; set; }

    //    public DateTime? License_Generate_Date { get; set; }

    //    [StringLength(1)]
    //    public string? License_Generate { get; set; }

    //    [StringLength(1)]
    //    public string? Scrutiny_Status { get; set; }

    //    [StringLength(1)]
    //    public string? Site_Enquiry_Rpt_Submission_Status { get; set; }

    //    [Required]
    //    [StringLength(2)]
    //    public string Flow_Upto { get; set; }

    //    public DateTime? Public_Notice_Issue_Date { get; set; }

    //    public string? Reject_EO_Remarks { get; set; }

    //    public DateTime? Reject_EO_Date { get; set; }

    //    [StringLength(1)]
    //    public string? Mobile_No_Release_Status { get; set; }

    //    [StringLength(50)]
    //    public string? Restaurant_Area { get; set; }

    //    [StringLength(50)]
    //    public string? NumberOfSeatCovers { get; set; }

    //    [StringLength(50)]
    //    public string? NumberOfDispensingCounter { get; set; }

    //    public bool? AdditionalArea { get; set; }

    //    [StringLength(50)]
    //    public string? NumberOfManagers { get; set; }

    //    [StringLength(50)]
    //    public string? NumberOfKitchenStaff { get; set; }

    //    [StringLength(50)]
    //    public string? NumberOfUtlityEmployees { get; set; }

    //    [StringLength(50)]
    //    public string? Total_Room { get; set; }

    //    [StringLength(50)]
    //    public string? Staff_Strength { get; set; }

    //    [StringLength(50)]
    //    public string? Star_Category { get; set; }

    //    [StringLength(50)]
    //    public string? Service_Counter { get; set; }

    //    [StringLength(50)]
    //    public string? Total_Area { get; set; }

    //    [StringLength(100)]
    //    public string? Educational_Ins_Dist { get; set; }

    //    [StringLength(100)]
    //    public string? Religious_Place_Dist { get; set; }

    //    [StringLength(50)]
    //    public string? SiteAdditional_LicenceValidity { get; set; }

    //    public int? L10Airport { get; set; }

    //    public int? ConstitutionType { get; set; }

    //    [StringLength(50)]
    //    public string? FirmPanNo { get; set; }

    //    [StringLength(100)]
    //    public string? ExciseNomineeEmail { get; set; }

    //    [StringLength(12)]
    //    public string? ExciseNomieeMobile { get; set; }

    //    public int? ExciseNomineeDirCompany { get; set; }

    //    [StringLength(50)]
    //    public string? LicencePremiseType { get; set; }

    //    [StringLength(150)]
    //    public string? IssuanceDeclaration { get; set; }

    //    public int? POSTerminalVendNo { get; set; }

    //    public int? NoCCTVCamInstalled { get; set; }

    //    [StringLength(250)]
    //    public string? CameraMake { get; set; }

    //    [StringLength(150)]
    //    public string? RecordingCapacity { get; set; }

    //    [StringLength(50)]
    //    public string? IsSuitableGagdget { get; set; }

    //    [StringLength(50)]
    //    public string? IsLocalAuthorityApproved { get; set; }

    //    [StringLength(50)]
    //    public string? IsIndicatingLiquor { get; set; }

    //    public int? PropPremiseAppComArea { get; set; }

    //    public int? PropPremiseComComplex { get; set; }

    //    public int? LandLordPhyPossession { get; set; }

    //    public int? PropPremiseCondition { get; set; }

    //    public int? PropPremiseLocalBody { get; set; }

    //    public int? PropPremiseLiquorLicenceRule { get; set; }

    //    public int? PropPremisePuccaBuild { get; set; }

    //    public int? PropPremisePresentUse { get; set; }

    //    public int? PropPremiseSuitPending { get; set; }

    //    public int? PropPremiseWaterConn { get; set; }

    //    public int? PropPremiseJoint { get; set; }

    //    public int? PropPremiseNOC { get; set; }

    //    public int? PropPremiseShopMap { get; set; }

    //    public int? PropPremiseSustainability { get; set; }

    //    [StringLength(50)]
    //    public string? Site_Size { get; set; }

    //    [StringLength(10)]
    //    public string? SubDivision_Code { get; set; }

    //    [StringLength(10)]
    //    public string? PoliceStation_Code { get; set; }

    //    [StringLength(50)]
    //    public string? NumberOfBarAttendent { get; set; }

    //    [StringLength(50)]
    //    public string? Star_Category_Rating { get; set; }

    //    [StringLength(1)]
    //    public string? License_GenerateFinalYN { get; set; }

    //    [StringLength(1)]
    //    public string? License_ApplicationSubmitYN { get; set; }

    //    public int? HoursofSale { get; set; }
    //    public int? L10AirportHourSale { get; set; }

    //    public int? L10AirportHourSaleDefault { get; set; }

    //    [StringLength(1)]
    //    public string? ApproveDocumentYN { get; set; }

    //    [StringLength(50)]
    //    public string? LicenceId_Applied_against { get; set; }

    //    [StringLength(1)]
    //    public string? IsApproveYN { get; set; }

    //    [StringLength(1)]
    //    public string? Addtion_WarehouseYN { get; set; }
    //}


    public class LicenseApplication
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? IPAddress { get; set; }

        public int RegId { get; set; }

        public string? ApplicationIdNo { get; set; }

        public DateTime? ApplicationDate { get; set; }

        public string? FinYear { get; set; }

        public string? ApplicationStatus { get; set; }

        public string? CatCode { get; set; }

        public string? LicenseType { get; set; }

        public string? IsApplicationCompleted { get; set; }

        public string? ApplicationFlag { get; set; }

        public string? RejectExcomRemark { get; set; }

        public DateTime? RejectExcomDate { get; set; }

        public string? GenerateLicenseId { get; set; }

        public DateTime? LicenseGenerateDate { get; set; }

        public string? IsLicenseGenerated { get; set; }

        public string? IsApproveYN { get; set; }
    }






}