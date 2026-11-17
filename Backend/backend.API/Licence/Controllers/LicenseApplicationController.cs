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


        



        [HttpPost("ApplyLicense")]
        public async Task<IActionResult> CreateApplyLicense( [FromBody] LicenseApplicationUserDetailsDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

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
        public async Task<IActionResult> CreateWarehouseLicense([FromBody] WarehouseDetailsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var applicationId =await _licenseApplicationService.SaveWarehouseLicense(dto);

            return Ok(new
            {
                applicationId,
                message = "Warehouse details saved successfully"
            });
        }





    



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



        


        [HttpGet("GetApplicantByRegId/{regId}")]
        public async Task<IActionResult> GetApplicantByRegId(long regId)
        {
            var user = await _licenseApplicationService.GetApplicantByRegId(regId);

            if (user == null)
                return NotFound();

            return Ok(user);
        }



    



        [HttpPost("UploadApplicationDocuments")]
        public async Task<IActionResult> UploadApplicationDocuments(
    [FromForm] ApplicationDocumentUploadDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            await _licenseApplicationService.UploadApplicationDocuments(dto);

            return Ok(new
            {
                message = "Documents uploaded/updated successfully."
            });
        }









    }


}