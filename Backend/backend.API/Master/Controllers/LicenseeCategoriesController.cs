using backend.Core.DTOs;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            // Generate Application Id
            string? lastAppId = await _context.LicenseApplicationUserDetails
                .OrderByDescending(x => x.ApplicationIdNo)
                .Select(x => x.ApplicationIdNo)
                .FirstOrDefaultAsync();

            string newAppId;

            if (string.IsNullOrWhiteSpace(lastAppId))
            {
                newAppId = "REFL10001";
            }
            else
            {
                int number = int.Parse(lastAppId.Substring(4));
                newAppId = $"REFL{(number + 1):00000}";
            }


            //var user = await _context.MstUsReg.FirstOrDefaultAsync(x => x.RegId == dto.RegId);


            var license = new LicenseApplicationUserDetails
    {
                ApplicationIdNo = newAppId,
                //RegNumber = user.RegId.ToString(),
                RegNumber = dto.RegId.ToString(),
                ApplicantName =dto.ApplicantName,
        //CompanyName = dto.CompanyName??"",
        Dob = dto.Dob,
        FatherHusbandName = dto.FatherHusbandName??"",
        Occupation = dto.Occupation??"",
        PanNo=dto.PanNo??"",
        PresentAddress = dto.PresentAddress??"",
        PermanentAddress = dto.PermanentAddress??"",
        StateUT = dto.StateUT??"",
        District = dto.District??"",
        PIN = dto.PIN??"",
        PoliceStation = dto.PoliceStation ??"",
        EmailId = dto.EmailId??"",
        MobileNo = dto.MobileNo??"",
        LandLine=dto.LandLine??""


        // Map other fields
    };

    _context.LicenseApplicationUserDetails.Add(license);
    await _context.SaveChangesAsync();

            return Ok(new
            {
                applicationId = license.ApplicationIdNo
            });
        }


    }

  
}