using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Licence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonLicenseController : ControllerBase
    {
        private readonly ICommonLicenseServices _LicenseService;    
        public CommonLicenseController(ICommonLicenseServices services)
        {
            _LicenseService = services;
        }

        [HttpPost("ApplyLicense")]
        public async Task<IActionResult> CreateApplyLicense(LicenseApplicationUserDetailsDto dto)
        {
            if (!ModelState.IsValid)
            {          
                return BadRequest(ModelState);
            }

            var user = await _LicenseService.SaveApplicantDetails(dto);
            return Ok(new
                    {
                        applicationId = user,
                        message = "Application Saved Successfully"
                    });
        }

        [HttpGet("GetApplicantDetails/{AppId}")]
        public async Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId)
        {
            var user = await _LicenseService.GetApplicantDetails(AppId);

            return user;
        }
    }
}