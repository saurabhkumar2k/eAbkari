using Microsoft.AspNetCore.Mvc;
using DOTNETAPI.Data;
using DOTNETAPI.Models;
using DOTNETAPI.DTOs;
using System.Diagnostics.Contracts;

namespace DOTNETAPI.Controllers
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

        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _context.Licensee_Category
                                     .Select(c => new { c.licensee_cat_code, c.licensee_cat_desc })
                                     .ToList();

            return Ok(categories);
        }



[HttpPost("ApplyLicense")]
public async Task<IActionResult> CreateApplyLicense([FromBody] ApplyLicenseDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var license = new ApplyLicense_L1_L31
    {
        ApplicantName = dto.ApplicantName,
        CompanyName = dto.CompanyName,
        Dob = dto.Dob,
        FatherName = dto.FatherName,
        Occupation = dto.Occupation,
        Address1 = dto.Address1,
        Address2 = dto.Address2,
        State = dto.State,
        District = dto.District,
        Pin = dto.Pin,
        Contact = dto.Contact,
        PoliceStation = dto.PoliceStation,
        Email = dto.Email,
        Mobile=dto.Mobile,


        // Map other fields
    };

    _context.ApplyLicense_L1_L31.Add(license);
    await _context.SaveChangesAsync();

    return Ok(new { id = license.ApplyLicenseId });
}






    }
}
