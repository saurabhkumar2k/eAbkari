using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using System.Linq;

namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicenseeCategoriesController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public LicenseeCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IWebHostEnvironment _env;



        [HttpPost("ApplyLicense")]
public async Task<IActionResult> CreateApplyLicense([FromBody] LicenseApplicationUserDetailsDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

            //generate application id
            string? lastappid = await _context.LicenseApplication
                .OrderByDescending(x => x.ApplicationIdNo)
                .Select(x => x.ApplicationIdNo)
                .FirstOrDefaultAsync();

            string newappid;

            if (string.IsNullOrWhiteSpace(lastappid))
            {
                newappid = "REFL10001";
            }
            else
            {
                int number = int.Parse(lastappid.Substring(4));
                newappid = $"REFL{(number + 1):00000}";
            }


            var user = await _context.MstUsReg.FirstOrDefaultAsync(x => x.RegId == dto.RegId);

    
            var license = new LicenseApplicationUserDetails
    {
                //ApplicationIdNo = newAppId,
                //RegNumber = user.RegId.ToString(),
                RegId = dto.RegId.ToString(),
                ApplicantName =dto.ApplicantName,
        //CompanyName = dto.CompanyName??"",
        DateOfBirth = dto.Dob,
        FatherHusbandName = dto.FatherHusbandName??"",
        Occupation = dto.Occupation??"",
        PanNo=dto.PanNo??"",
        PresentAddress = dto.PresentAddress??"",
        PermanentAddress = dto.PermanentAddress??"",
        StateUT = dto.StateUT??"",
        District = dto.District??"",
        SubDivision=dto.SubDivision??"",
        PIN = dto.PIN??"",
        //PoliceStation = dto.PoliceStation ??"",
        Email = dto.Email??"",
        Mobile = dto.Mobile ?? "", 
        LandLine=dto.LandLine??"",
        //OprDate= DateTime.Now
                // Map other fields
            };

            var application = new LicenseApplication
            {
                IPAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
                RegId = (int)dto.RegId,
                ApplicationIdNo = newappid,
                ApplicationDate = DateTime.Now,
                FinYear = "2026-27",
                ApplicationStatus = "P",
                CatCode = dto.CatCode,
                LicenseType = dto.OwnerType,
                IsApplicationCompleted = "N",
                ApplicationFlag = "A",
                IsLicenseGenerated = "N",
                IsApproveYN = "N"
            };
            Console.WriteLine(application.Id);
            _context.LicenseApplications.Add(application);

            _context.LicenseApplicationUserDetails.Add(license);
            _context.ChangeTracker.Entries();
    await _context.SaveChangesAsync();

            return Ok(new
            {
                applicationId = application.ApplicationIdNo
            });
        }





 [HttpPost("ApplyWarehouseLicense")]
public async Task<IActionResult> CreateWarehouseLicense([FromBody] WarehouseDetailsDto dto)
{

if (!ModelState.IsValid)
        return BadRequest(ModelState);

            var WarehouseLicense = new WarehouseDetails
            {
                RegId=dto.RegId,
                CatCode=dto.CatCode,
                ApplicationIdNo=dto.ApplicationIdNo,
                   WarehouseName = dto.WarehouseName,
                 WarehouseAddress1 = dto.WarehouseAddress1,
                 WarehouseAddress2 = dto.WarehouseAddress2,
                    //WarehouseCity = dto.WarehouseCity,
                    WarehouseState = dto.WarehouseState,
                    WarehouseDistrict = dto.WarehouseDistrict,
                    WarehousePin = dto.WarehousePin,
                    WarehouseMobile = dto.WarehouseMobile,
                    WarehouseEmail = dto.WarehouseEmail,
                   // LicenseYear = dto.LicenseYear,
                    WarehouseSubDivision = dto.WarehouseSubDivision,
                    WarehousePoliceStation = dto.WarehousePoliceStation,
                  //  WarehouseConstituency = dto.WarehouseConstituency,
                   // WarehouseWardName = dto.WarehouseWardName,
                   /// WarehouseFAX = dto.WarehouseFAX,
                    LeaseRegistration = dto.LeaseRegistration,
                LeasePremise=dto.LeasePremise,
                    LeaseRegistrationDate = dto.LeaseRegistrationDate,
                    LeaseRegistrationExpiryDate = dto.LeaseRegistrationExpiryDate,
                    ArchitectRegistrationNo = dto.ArchitectRegistrationNo,
                    ArchitectRegistrationNoValidUpto = dto.ArchitectRegistrationNoValidUpto,
                    SuperAreaofLicensePremise = dto.SuperAreaofLicensePremise,
                    CarpetAreaofLicensePremise = dto.CarpetAreaofLicensePremise,
                DistanceofDistilleryCP = Convert.ToInt64(dto.DistanceofDistillery),
                    HoursofSale = dto.HoursofSale,
                    CreatedDateAt = DateTime.Now,
                
            };
             _context.WarehouseDetails.Add(WarehouseLicense);
              await _context.SaveChangesAsync();

          return Ok(new
            {
                //applicationId = WarehouseLicense.ApplicationIdNo
            });



}

        [HttpPost("ApplyCompanydetails")]
        [HttpPost]
        public async Task<IActionResult> CreateCompanydetails([FromForm] LicenseCompanyDetailsDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                // Company table save
                var company = new LicenseCompanyDetails
                {
                    ApplicationIdNo = dto.ApplicationIdNo,
                    RegistrationNo = dto.RegistrationNo,
                    CompanyName=dto.CompanyName,
                    ConstitutionType=dto.ConstitutionType,
                    RegDate = dto.RegDate,
                    CompanyPAN = dto.CompanyPAN,
                    VATNO = dto.VATNO,
                    CINNO=dto.CINNO,
                    IsExciseNominee = dto.IsExciseNominee,
                    ExciseNomineeName = dto.ExciseNomineeName,
                    ExciseNomineeAddress = dto.ExciseNomineeAddress,
                    ExciseNomineeEmailID = dto.ExciseNomineeEmailID,
                    ExciseNomineeMobileNo = dto.ExciseNomineeMobileNo,
                    ExciseNomineePAN = dto.ExciseNomineePAN,
                    ExciseNomineePanImage = dto.ExciseNomineePanImage,
                    FSSAILicenceNo = dto.FSSAILicenceNo,
                    FSSAILicenceStartDate = dto.FSSAILicenceStartDate,
                    FSSAILicenceEndDate = dto.FSSAILicenceEndDate,
                    VATGSTCertNo = dto.VATGSTCertNo,
                    VATGSTCertEnddate = dto.VATGSTCertEnddate,
                    DistilleryLicNo = dto.DistilleryLicNo,
                    DistilleryLicEnddate = dto.DistilleryLicEnddate,
                    BWHInsuranceEndDate = dto.BWHInsuranceEndDate,
                    BWHRentAgreementEndDate = dto.BWHRentAgreementEndDate,
                    BWHLeaseRentAgreementNo=dto.BWHLeaseRentAgreementNo,
                    BWHInsuranceNo=dto.BWHInsuranceNo


                };

                _context.LicenseCompanyDetails.Add(company);





                //foreach (var partner in dto.CompanyPartnersDetails)
                //{

                //    if (partner.PanFile != null)
                //    {
                //        var fileName = Guid.NewGuid() +
                //            Path.GetExtension(partner.PanFile.FileName);

                //        var folder = Path.Combine(_env.WebRootPath, "Uploads", "PartnerPAN");

                //        if (!Directory.Exists(folder))
                //            Directory.CreateDirectory(folder);

                //        var path = Path.Combine(folder, fileName);

                //        using (var stream = new FileStream(path, FileMode.Create))
                //        {
                //            await partner.PanFile.CopyToAsync(stream);
                //        }

                //        // Database me filename save hoga
                //        partner.PhotoURLPanNo = fileName;
                //    }


                //    _context.AdditionalCompanyPartnersDetails.Add(partner);
                //}


                //await _context.SaveChangesAsync();



                foreach (var director in dto.CompanyPartnersDetails)
                {
                    string? panFileName = null;

                    if (director.PanFile != null)
                    {
                        // Save file...

                        panFileName = Guid.NewGuid() +
                            Path.GetExtension(director.PanFile.FileName);

                        var folder = Path.Combine(
                            Directory.GetCurrentDirectory(),
                            "Documents",
                            "LicenseCompanyDocuments");

                        if (!Directory.Exists(folder))
                            Directory.CreateDirectory(folder);

                        var path = Path.Combine(folder, panFileName);

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await director.PanFile.CopyToAsync(stream);
                        }
                    }

                    string? AddressFileName = null;

                    if (director.addressFile != null)
                    {
                        AddressFileName = Guid.NewGuid() +
                                      Path.GetExtension(director.addressFile.FileName);

                        var folder = Path.Combine(
        Directory.GetCurrentDirectory(),
        "Documents",
        "LicenseCompanyDocuments"
    );

                        if (!Directory.Exists(folder))
                        {
                            Directory.CreateDirectory(folder);
                        }

                        var fileName = Guid.NewGuid().ToString() +
                                       Path.GetExtension(director.addressFile.FileName);

                        var filePath = Path.Combine(folder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await director.addressFile.CopyToAsync(stream);
                        }
                    }



                    var partnerEntity = new AdditionalCompanyPartnersDetails
                    {
                        ApplicationIdNo = dto.ApplicationIdNo,
                        PName = director.PName,
                        PPerShare = director.PPerShare,
                        PPanNo = director.PPanNo,
                        PExciseNominee = director.PExciseNominee,
                        DINNo = director.DINNo,
                        PhotoURLPanNo = panFileName,
                        PhotoURLAddressProof = AddressFileName
                        
                    };

                    _context.AdditionalCompanyPartnersDetails.Add(partnerEntity);
                }
                var entity = _context.Model.FindEntityType(typeof(AdditionalCompanyPartnersDetails));

                foreach (var p in entity.GetProperties())
                {
                    Console.WriteLine($"{p.Name} - Shadow: {p.IsShadowProperty()}");
                }

                await _context.SaveChangesAsync();


                return Ok(new
                {
                    //applicationId = WarehouseLicense.ApplicationIdNo
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }


            [HttpGet("GetApplicantByRegId/{regId}")]
        public async Task<IActionResult> GetApplicantByRegId(long regId)
        {
            var user = await _context.MstUsReg
                .FirstOrDefaultAsync(x => x.RegId == regId);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        

        [HttpPost("UploadApplicationDocuments")]
        public async Task<IActionResult> UploadApplicationDocuments([FromForm] ApplicationDocumentUploadDto dto)
        {
            //string folder = Path.Combine(_env.WebRootPath, "Documents", "ApplicationDocuments");

            var folder = Path.Combine(
    Directory.GetCurrentDirectory(),
    "Documents",
    "ApplicationDocuments");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            foreach (var doc in dto.Documents)
            {
                string? fileName = null;

                if (doc.DocumentFile != null)
                {
                    fileName = Guid.NewGuid() + Path.GetExtension(doc.DocumentFile.FileName);

                    string filePath = Path.Combine(folder, fileName);

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await doc.DocumentFile.CopyToAsync(stream);
                }

                var entity = new Core.Entities.Licence.LicenseApplicationUploadedDocument
                {
                    ApplicationIdNo = dto.ApplicationIdNo, // Wrapper se
                    MobileNo = dto.MobileNo,               // Wrapper se

                    ApplicantSl = doc.ApplicantSl,
                    DocId = doc.DocId,
                    DocSl = doc.DocSl,
                    //DocStatus = doc.DocStatus,
                    //MobileNoReleaseStatus = doc.MobileNoReleaseStatus,
                    //IsValid = doc.IsValid,
                    Remarks = doc.Remarks,
                    DateOfValidity = doc.DateOfValidity,
                    //DocumentvalidationYN = doc.DocumentvalidationYN,
                    LicenseeIdNo = doc.LicenseeIdNo,
                    DocStatus = "N",
                    IsValid = false,
                    DocumentvalidationYN = "N",
                    DocUrl = fileName
                };
                _context.LicenseApplicationUploadedDocument.Add(entity);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Documents uploaded successfully."
            });
        }






    }

  
}