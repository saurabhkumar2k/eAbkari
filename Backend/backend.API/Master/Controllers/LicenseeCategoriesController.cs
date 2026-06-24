using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

                   WarehouseName = dto.WarehouseName,
                 WarehouseAddress1 = dto.WarehouseAddress1,
                 WarehouseAddress2 = dto.WarehouseAddress2,
                    //WarehouseCity = dto.WarehouseCity,
                    WarehouseState = dto.WarehouseState,
                    WarehouseDistrict = dto.WarehouseDistrict,
                    WarehousePin = dto.WarehousePin,
                    WarehouseMobile = dto.WarehouseMobile,
                    WarehouseEmail = dto.WarehouseEmail,
                    LicenseYear = dto.LicenseYear,
                    WarehouseSubDivision = dto.WarehouseSubDivision,
                    WarehousePoliceStation = dto.WarehousePoliceStation,
                    WarehouseConstituency = dto.WarehouseConstituency,
                    WarehouseWardName = dto.WarehouseWardName,
                    WarehouseFAX = dto.WarehouseFAX,
                    LeaseRegistration = dto.LeaseRegistration,
                    LeaseRegistrationDate = dto.LeaseRegistrationDate,
                    LeaseRegistrationExpiryDate = dto.LeaseRegistrationExpiryDate,
                    ArchitectRegistrationNo = dto.ArchitectRegistrationNo,
                    ArchitectRegistrationNoValidUpto = dto.ArchitectRegistrationNoValidUpto,
                    SuperAreaofLicensePremise = dto.SuperAreaofLicensePremise,
                    CarpetAreaofLicensePremise = dto.CarpetAreaofLicensePremise,
                    DistanceofDistillery = Convert.ToInt64(dto.DistanceofDistillery),
                    HoursofSale = dto.HoursofSale,
                    CreatedDateAt = DateTime.UtcNow,
                
            };
             _context.WarehouseDetails.Add(WarehouseLicense);
              await _context.SaveChangesAsync();

          return Ok(new
            {
                //applicationId = WarehouseLicense.ApplicationIdNo
            });



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





    }

  
}