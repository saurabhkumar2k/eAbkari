using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using System.Linq;
using backend.Application.Interfaces.License;
using backend.Core.Interfaces;
using backend.Application.Services.License;
using backend.Core.Interfaces.License;

namespace backend.API.Licence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicenseApplicationController : ControllerBase
    {
        private readonly ILicenseApplicationServices _licenseApplicationService;
        public LicenseApplicationController(ILicenseApplicationServices licenseApplicationService)
        {
            _licenseApplicationService = licenseApplicationService;
        }


        private readonly ApplicationDbContext _context;


        //public LicenseApplicationController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}

        private readonly IWebHostEnvironment _env;
    

        private readonly ILicenseApplicationRepository _licenseApplication;


        //public LicenseApplicationController(ILicenseApplicationService licenseApplicationService, ILicenseApplicationRepository licenseApplication, ApplicationDbContext context, IWebHostEnvironment env)
        //{
        //    _licenseApplicationService =  licenseApplicationService;

        //    _licenseApplication = licenseApplication;

        //    _context = context;

        //    _env = env;
        //}













        //[HttpPost("ApplyLicense")]
        //public async Task<IActionResult> CreateApplyLicense([FromBody] LicenseApplicationUserDetailsDto dto)
        //{


        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    try
        //    {
        //        // Check existing draft
        //        var existingApplication = await _context.LicenseApplications
        //            .FirstOrDefaultAsync(x =>
        //                x.RegId == dto.RegId &&
        //                x.CatCode == dto.CatCode &&
        //                x.ApplicationStatus == "P");

        //        string applicationId;

        //        if (existingApplication != null)
        //        {
        //            // Draft exists → use same ApplicationId
        //            applicationId = existingApplication.ApplicationIdNo;
        //        }
        //        else
        //        {
        //            // Generate new ApplicationId
        //            string? lastAppId = await _context.LicenseApplications
        //                .OrderByDescending(x => x.Id)
        //                .Select(x => x.ApplicationIdNo)
        //                .FirstOrDefaultAsync();



        //            var FinYearV =
        //                await _licenseeCategories.GetFinYear();

        //            //if (string.IsNullOrWhiteSpace(FinYearV))
        //            //{
        //            //    return "Financial Year is not available.";
        //            //}

        //            string activeYear = FinYearV.Substring(2, 2);

        //            string prefix = $"REF{dto.CatCode}{activeYear}";
        //            int sequence = 1;

        //            if (!string.IsNullOrWhiteSpace(lastAppId))
        //            {
        //                string lastFive = lastAppId.Substring(lastAppId.Length - 5);
        //                sequence = int.Parse(lastFive) + 1;
        //            }

        //            applicationId = $"{prefix}{sequence:00000}";
        //        }





        //        var user = await _context.MstUsReg
        //            .FirstOrDefaultAsync(x => x.RegId == dto.RegId);

        //        var finYear = await _context.MstFinancialYear
        //            .Where(x => x.ActiveStatus == "Y")
        //            .Select(x => x.FinYear)
        //            .FirstOrDefaultAsync();

        //        if (existingApplication != null)
        //        {
        //            // Update Applicant Details
        //            var license = await _context.LicenseApplicationUserDetails
        //                .FirstOrDefaultAsync(x => x.ApplicationIdNo == applicationId);

        //            if (license != null)
        //            {
        //                license.ApplicantName = dto.ApplicantName;
        //                license.DateOfBirth = dto.Dob;
        //                license.FatherHusbandName = dto.FatherHusbandName ?? "";
        //                license.Occupation = dto.Occupation ?? "";
        //                license.PanNo = dto.PanNo ?? "";

        //                license.PresentAddress = dto.PresentAddress ?? "";
        //                license.PermanentAddress = dto.PermanentAddress ?? "";
        //                license.StateUT = dto.StateUT ?? "";
        //                license.District = dto.District ?? "";
        //                license.SubDivision = dto.SubDivision ?? "";
        //                license.PIN = dto.PIN ?? "";
        //                license.Email = dto.Email ?? "";
        //                license.Mobile = dto.Mobile ?? "";
        //                license.LandLine = dto.LandLine ?? "";
        //            }


        //            existingApplication.LicenseType = dto.OwnerType;

        //            await _context.SaveChangesAsync();

        //            return Ok(new
        //            {
        //                applicationId
        //            });
        //        }

        //        // First Time Insert
        //        var licenseDetails = new LicenseApplicationUserDetails
        //        {
        //            RegId = dto.RegId,
        //            ApplicantName = dto.ApplicantName,
        //            ApplicationIdNo = applicationId,
        //            DateOfBirth = dto.Dob,
        //            FatherHusbandName = dto.FatherHusbandName ?? "",
        //            Occupation = dto.Occupation ?? "",
        //            PanNo = dto.PanNo ?? "",
        //            PresentAddress = dto.PresentAddress ?? "",
        //            PermanentAddress = dto.PermanentAddress ?? "",
        //            StateUT = dto.StateUT ?? "",
        //            District = dto.District ?? "",
        //            SubDivision = dto.SubDivision ?? "",
        //            PIN = dto.PIN ?? "",
        //            Email = dto.Email ?? "",
        //            Mobile = dto.Mobile ?? "",
        //            LandLine = dto.LandLine ?? ""
        //        };

        //        var application = new LicenseApplication
        //        {
        //            IPAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
        //            RegId = dto.RegId,
        //            ApplicationIdNo = applicationId,
        //            ApplicationDate = DateTime.Now,

        //            FinYear = finYear,
        //            //ApplicationStatus = "P",
        //            CatCode = dto.CatCode,
        //            LicenseType = dto.OwnerType,
        //            IsApplicationCompleted = "N",
        //            ApplicationFlag = "A",
        //            ApplicationStatus = "01",
        //            IsLicenseGenerated = "N",
        //            IsApproveYN = "N"
        //        };

        //        _context.LicenseApplications.Add(application);
        //        _context.LicenseApplicationUserDetails.Add(licenseDetails);

        //        await _context.SaveChangesAsync();

        //        return Ok(new
        //        {
        //            applicationId = application.ApplicationIdNo
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //        throw;
        //    }


















        //}



        [HttpPost("ApplyLicense")]
        public async Task<IActionResult> CreateApplyLicense(
            [FromBody] LicenseApplicationUserDetailsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ipAddress =
                HttpContext.Connection.RemoteIpAddress?.ToString();

            var applicationId =
                await _licenseApplicationService.ApplyLicense(dto, ipAddress);

            return Ok(new
            {
                applicationId
            });
        }



       








        [HttpPost("ApplyWarehouseLicense")]
        public async Task<IActionResult> CreateWarehouseLicense(
    [FromBody] WarehouseDetailsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var applicationId =
                await _licenseApplicationService
                    .SaveWarehouseLicense(dto);

            return Ok(new
            {
                applicationId,
                message = "Warehouse details saved successfully"
            });
        }





    //    [HttpPost("ApplyCompanydetails")]
    //    public async Task<IActionResult> ApplyCompanydetails(
    //[FromBody] LicenseCompanyDetailsDto dto)
    //    {
    //        if (!ModelState.IsValid)
    //            return BadRequest(ModelState);

    //        var applicationId =
    //            await _licenseApplicationService
    //                .SaveWarehouseLicense(dto);

    //        return Ok(new
    //        {
    //            applicationId,
    //            message = "Warehouse details saved successfully"
    //        });
    //    }









    //    [HttpPost("ApplyCompanydetails")]
    //    public async Task<IActionResult> ApplyCompanydetails(
    //[FromForm] LicenseCompanyDetailsDto dto)
    //    {
    //        try
    //        {
    //            if (!ModelState.IsValid)
    //                return BadRequest(ModelState);

    //            // =========================================================
    //            // COMPANY DETAILS
    //            // INSERT IF NOT EXISTS
    //            // UPDATE IF EXISTS
    //            // =========================================================

    //            var company = await _context.LicenseCompanyDetails
    //                .FirstOrDefaultAsync(x =>
    //                    x.ApplicationIdNo == dto.ApplicationIdNo);

    //            if (company == null)
    //            {
    //                company = new LicenseCompanyDetails
    //                {
    //                    ApplicationIdNo = dto.ApplicationIdNo
    //                };

    //                _context.LicenseCompanyDetails.Add(company);
    //            }

    //            // ---------------------------------------------------------
    //            // Company fields
    //            // ---------------------------------------------------------

    //            company.RegistrationNo = dto.RegistrationNo;
    //            company.CompanyName = dto.CompanyName;
    //            company.ConstitutionType = dto.ConstitutionType;
    //            company.RegDate = dto.RegDate;
    //            company.CompanyPAN = dto.CompanyPAN;
    //            company.VATNO = dto.VATNO;
    //            company.CINNO = dto.CINNO;

    //            // ---------------------------------------------------------
    //            // Excise Nominee
    //            // ---------------------------------------------------------

    //            company.IsExciseNominee = dto.IsExciseNominee;
    //            company.ExciseNomineeName = dto.ExciseNomineeName;
    //            company.ExciseNomineeAddress = dto.ExciseNomineeAddress;
    //            company.ExciseNomineeEmailID = dto.ExciseNomineeEmailID;
    //            company.ExciseNomineeMobileNo = dto.ExciseNomineeMobileNo;


    //            string? panImageFileName = null;

    //            if (dto.ExciseNomineePanImage != null)
    //            {
    //                panImageFileName =
    //                    Guid.NewGuid().ToString() +
    //                    Path.GetExtension(dto.ExciseNomineePanImage.FileName);

    //                var folder = Path.Combine(
    //                    Directory.GetCurrentDirectory(),
    //                    "Documents",
    //                    "LicenseCompanyDocuments"
    //                );

    //                if (!Directory.Exists(folder))
    //                    Directory.CreateDirectory(folder);

    //                var filePath = Path.Combine(
    //                    folder,
    //                    panImageFileName
    //                );

    //                using (var stream = new FileStream(
    //                    filePath,
    //                    FileMode.Create))
    //                {
    //                    await dto.ExciseNomineePanImage.CopyToAsync(stream);
    //                }
    //            }


    //            // STRING filename goes into Entity
    //            company.ExciseNomineePanImage = panImageFileName;






    //            company.ExciseNomineePAN = dto.ExciseNomineePAN;

    //            // =========================================================
    //            // EXCISE NOMINEE PAN IMAGE
    //            // =========================================================



    //            // =========================================================
    //            // FSSAI
    //            // =========================================================

    //            company.FSSAILicenceNo =
    //                dto.FSSAILicenceNo;

    //            company.FSSAILicenceStartDate =
    //                dto.FSSAILicenceStartDate;

    //            company.FSSAILicenceEndDate =
    //                dto.FSSAILicenceEndDate;

    //            // =========================================================
    //            // VAT / GST
    //            // =========================================================

    //            company.VATGSTCertNo =
    //                dto.VATGSTCertNo;

    //            company.VATGSTCertEnddate =
    //                dto.VATGSTCertEnddate;

    //            // =========================================================
    //            // DISTILLERY
    //            // =========================================================

    //            company.DistilleryLicNo =
    //                dto.DistilleryLicNo;

    //            company.DistilleryLicEnddate =
    //                dto.DistilleryLicEnddate;

    //            // =========================================================
    //            // BWH
    //            // =========================================================

    //            company.BWHInsuranceEndDate =
    //                dto.BWHInsuranceEndDate;

    //            company.BWHRentAgreementEndDate =
    //                dto.BWHRentAgreementEndDate;

    //            company.BWHLeaseRentAgreementNo =
    //                dto.BWHLeaseRentAgreementNo;

    //            company.BWHInsuranceNo =
    //                dto.BWHInsuranceNo;


    //            // =========================================================
    //            // DIRECTORS / PARTNERS
    //            // =========================================================




    //            //            var existingPartners =
    //            //await _context.ApplicantLicensePartnersDetails
    //            //    .Where(x => x.ApplicationIdNo == dto.ApplicationIdNo)
    //            //    .Select(x => new ApplicantLicensePartnersDetails
    //            //    {
    //            //        ID = x.ID,
    //            //        ApplicationIdNo = x.ApplicationIdNo,
    //            //        PName = x.PName,
    //            //        PPerShare = x.PPerShare,
    //            //        PPanNo = x.PPanNo,
    //            //        PExciseNominee = x.PExciseNominee,
    //            //        PhotoURLPanNo = x.PhotoURLPanNo,
    //            //        PhotoURLAddressProof = x.PhotoURLAddressProof,
    //            //        DINNo = x.DINNo
    //            //    })
    //            //    .ToListAsync();



    //            var existingPartners =
    //await _context.ApplicantLicensePartnersDetails
    //    .Where(x => x.ApplicationIdNo == dto.ApplicationIdNo)
    //    .ToListAsync();







    //            foreach (var director in dto.CompanyPartnersDetails)
    //            {
    //                ApplicantLicensePartnersDetails? partnerEntity = null;

    //                // Existing record → UPDATE
    //                //if (director.ID.HasValue)
    //                //{
    //                //    partnerEntity =
    //                //        await _context.ApplicantLicensePartnersDetails
    //                //            .FirstOrDefaultAsync(x =>
    //                //                x.ID == director.ID.Value &&
    //                //                x.ApplicationIdNo == dto.ApplicationIdNo);
    //                //}



    //                // Existing director identify karne ke liye
    //                if (!string.IsNullOrWhiteSpace(director.PPanNo))
    //                {
    //                    partnerEntity = existingPartners
    //                        .FirstOrDefault(x =>
    //                            x.PPanNo == director.PPanNo);
    //                }



    //                // New record → INSERT
    //                if (partnerEntity == null)
    //                {
    //                    partnerEntity = new ApplicantLicensePartnersDetails
    //                    {
    //                        ApplicationIdNo = dto.ApplicationIdNo
    //                    };

    //                    _context.ApplicantLicensePartnersDetails.Add(partnerEntity);
    //                }

    //                // -----------------------------
    //                // BASIC DETAILS
    //                // -----------------------------

    //                partnerEntity.PName =
    //                    director.PName;

    //                partnerEntity.PPerShare =
    //                    director.PPerShare;

    //                partnerEntity.PPanNo =
    //                    director.PPanNo;

    //                partnerEntity.PExciseNominee =
    //                    director.PExciseNominee;

    //                partnerEntity.DINNo =
    //                    director.DINNo;

    //                // -----------------------------
    //                // PAN FILE
    //                // -----------------------------

    //                if (director.PanFile != null)
    //                {
    //                    var panFileName =
    //                        Guid.NewGuid().ToString() +
    //                        Path.GetExtension(
    //                            director.PanFile.FileName);

    //                    var folder = Path.Combine(
    //                        Directory.GetCurrentDirectory(),
    //                        "Documents",
    //                        "LicenseCompanyDocuments");

    //                    Directory.CreateDirectory(folder);

    //                    var path = Path.Combine(
    //                        folder,
    //                        panFileName);

    //                    using var stream =
    //                        new FileStream(path, FileMode.Create);

    //                    await director.PanFile.CopyToAsync(stream);

    //                    partnerEntity.PhotoURLPanNo =
    //                        panFileName;
    //                }
    //                else if (!string.IsNullOrWhiteSpace(
    //                    director.PanFileUploaded))
    //                {
    //                    partnerEntity.PhotoURLPanNo =
    //                        director.PanFileUploaded;
    //                }

    //                // -----------------------------
    //                // ADDRESS FILE
    //                // -----------------------------

    //                if (director.addressFile != null)
    //                {
    //                    var addressFileName =
    //                        Guid.NewGuid().ToString() +
    //                        Path.GetExtension(
    //                            director.addressFile.FileName);

    //                    var folder = Path.Combine(
    //                        Directory.GetCurrentDirectory(),
    //                        "Documents",
    //                        "LicenseCompanyDocuments");

    //                    Directory.CreateDirectory(folder);

    //                    var path = Path.Combine(
    //                        folder,
    //                        addressFileName);

    //                    using var stream =
    //                        new FileStream(path, FileMode.Create);

    //                    await director.addressFile.CopyToAsync(stream);

    //                    partnerEntity.PhotoURLAddressProof =
    //                        addressFileName;
    //                }
    //                else if (!string.IsNullOrWhiteSpace(
    //                    director.AddressFileUploaded))
    //                {
    //                    partnerEntity.PhotoURLAddressProof =
    //                        director.AddressFileUploaded;
    //                }
    //            }

    //            await _context.SaveChangesAsync();


    //            // =========================================================
    //            // UPDATE APPLICATION STEP
    //            // =========================================================

    //            //var licenseApplication =
    //            //    await _context.LicenseApplications
    //            //        .FirstOrDefaultAsync(x =>
    //            //            x.ApplicationIdNo ==
    //            //            dto.ApplicationIdNo);

    //            //if (licenseApplication != null)
    //            //{
    //            //    licenseApplication.CurrentStep = 4;
    //            //}


    //            // =========================================================
    //            // SAVE
    //            // =========================================================

    //            await _context.SaveChangesAsync();


    //            // =========================================================
    //            // RESPONSE
    //            // =========================================================

    //            return Ok(new
    //            {
    //                success = true,
    //                applicationId = dto.ApplicationIdNo,
    //                currentStep = 4
    //            });
    //        }
    //        catch (Exception ex)
    //        {
    //            Console.WriteLine(ex.ToString());

    //            return StatusCode(
    //                500,
    //                new
    //                {
    //                    success = false,
    //                    message = ex.Message
    //                });
    //        }
    //    }



        [HttpPost("ApplyCompanydetails")]
        public async Task<IActionResult> ApplyCompanydetails(
    [FromForm] LicenseCompanyDetailsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var applicationId =
                await _licenseApplicationService.SaveCompanyDetails(dto);

            return Ok(new
            {
                success = true,
                applicationId = applicationId,
               // currentStep = 4
            });
        }



        //[HttpGet("GetApplicantByRegId/{regId}")]
        //public async Task<IActionResult> GetApplicantByRegId(long regId)
        //{
        //    var user = await _context.MstUsReg
        //        .FirstOrDefaultAsync(x => x.RegId == regId);

        //    if (user == null)
        //        return NotFound();

        //    return Ok(user);
        //}


        [HttpGet("GetApplicantByRegId/{regId}")]
        public async Task<IActionResult> GetApplicantByRegId(long regId)
        {
            var user = await _licenseApplicationService
                .GetApplicantByRegId(regId);

            if (user == null)
                return NotFound();

            return Ok(user);
        }



    //    [HttpPost("UploadApplicationDocuments")]
    //    public async Task<IActionResult> UploadApplicationDocuments(
    //[FromForm] ApplicationDocumentUploadDto dto)
    //    {
    //        try
    //        {
    //            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
    //            {
    //                return BadRequest("ApplicationIdNo is required.");
    //            }

    //            var folder = Path.Combine(
    //                Directory.GetCurrentDirectory(),
    //                "Documents",
    //                "ApplicationDocuments"
    //            );

    //            if (!Directory.Exists(folder))
    //            {
    //                Directory.CreateDirectory(folder);
    //            }


    //            // =====================================================
    //            // LOOP DOCUMENTS
    //            // =====================================================

    //            foreach (var doc in dto.Documents)
    //            {
    //                // =================================================
    //                // FIND EXISTING DOCUMENT
    //                // ApplicationIdNo + DocId
    //                // =================================================

    //                var existingDocument =
    //                    await _context
    //                        .LicenseApplicationUploadedDocument
    //                        .FirstOrDefaultAsync(x =>
    //                            x.ApplicationIdNo ==
    //                                dto.ApplicationIdNo
    //                            &&
    //                            x.DocId ==
    //                                doc.DocId
    //                        );


    //                // =================================================
    //                // NEW FILE
    //                // =================================================

    //                string? newFileName = null;

    //                if (doc.DocumentFile != null)
    //                {
    //                    newFileName =
    //                        Guid.NewGuid().ToString()
    //                        +
    //                        Path.GetExtension(
    //                            doc.DocumentFile.FileName
    //                        );

    //                    var filePath =
    //                        Path.Combine(
    //                            folder,
    //                            newFileName
    //                        );

    //                    using var stream =
    //                        new FileStream(
    //                            filePath,
    //                            FileMode.Create
    //                        );

    //                    await doc.DocumentFile
    //                        .CopyToAsync(stream);
    //                }


    //                // =================================================
    //                // UPDATE EXISTING DOCUMENT
    //                // =================================================

    //                if (existingDocument != null)
    //                {
    //                    // ---------------------------------------------
    //                    // Existing basic details
    //                    // ---------------------------------------------

    //                    existingDocument.MobileNo =
    //                        dto.MobileNo;

    //                    existingDocument.ApplicantSl =
    //                        doc.ApplicantSl;

    //                    existingDocument.DocSl =
    //                        doc.DocSl;

    //                    existingDocument.Remarks =
    //                        doc.Remarks;

    //                    existingDocument.DateOfValidity =
    //                        doc.DateOfValidity;

    //                    existingDocument.LicenseeIdNo =
    //                        doc.LicenseeIdNo;

    //                    existingDocument.DocStatus =
    //                        "N";

    //                    existingDocument.IsValid =
    //                        "N";

    //                    existingDocument.DocumentvalidationYN =
    //                        "N";

    //                    existingDocument.SubmitDate = DateTime.Now;



    //                    // ---------------------------------------------
    //                    // IMPORTANT:
    //                    // New file hai to DocUrl replace karo
    //                    // New file nahi hai to old DocUrl preserve karo
    //                    // ---------------------------------------------

    //                    if (!string.IsNullOrWhiteSpace(
    //                        newFileName))
    //                    {
    //                        existingDocument.DocUrl = newFileName;
    //                    }

    //                    // No Add()
    //                    // EF automatically UPDATE karega
    //                }


    //                // =================================================
    //                // INSERT NEW DOCUMENT
    //                // =================================================

    //                else
    //                {
    //                    var entity =
    //                        new LicenseApplicationUploadedDocument
    //                        {
    //                            ApplicationIdNo =
    //                                dto.ApplicationIdNo,

    //                            MobileNo =
    //                                dto.MobileNo,

    //                            ApplicantSl =
    //                                doc.ApplicantSl,

    //                            DocId =
    //                                doc.DocId,

    //                            DocSl =
    //                                doc.DocSl,

    //                            Remarks =
    //                                doc.Remarks,

    //                            DateOfValidity =
    //                                doc.DateOfValidity,

    //                            LicenseeIdNo =
    //                                doc.LicenseeIdNo,

    //                            DocStatus =
    //                                "N",

    //                            IsValid =
    //                                "N",

    //                            DocumentvalidationYN =
    //                                "N",

    //                            DocUrl =
    //                                newFileName,

    //                            SubmitDate = DateTime.Now
    //                        };

    //                    _context
    //                        .LicenseApplicationUploadedDocument
    //                        .Add(entity);
    //                }
    //            }


    //            // =====================================================
    //            // SAVE
    //            // =====================================================

    //            await _context.SaveChangesAsync();


    //            return Ok(new
    //            {
    //                message =
    //                    "Documents uploaded/updated successfully."
    //            });
    //        }
    //        catch (Exception ex)
    //        {
    //            Console.WriteLine(ex);

    //            return StatusCode(
    //                500,
    //                new
    //                {
    //                    message =
    //                        "Error while uploading documents.",
    //                    error =
    //                        ex.Message
    //                }
    //            );
    //        }
    //    }



        [HttpPost("UploadApplicationDocuments")]
        public async Task<IActionResult> UploadApplicationDocuments(
    [FromForm] ApplicationDocumentUploadDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            await _licenseApplicationService
                .UploadApplicationDocuments(dto);

            return Ok(new
            {
                message = "Documents uploaded/updated successfully."
            });
        }









    }


}