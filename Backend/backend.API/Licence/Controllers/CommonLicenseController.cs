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
            return Ok(user);
        }

        [HttpGet("GetApplicantDetails/{AppId}")]
        public async Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId)
        {
            var user = await _LicenseService.GetApplicantDetails(AppId);

            return user;
        }

        [HttpPost]
        [Route("SubmitApplication")]
        public async Task<IActionResult> SubmitApplication(SubmitApplicationDTO dto)
        {
            var result = await _LicenseService.SubmitApplication(dto);

            return Ok(result);
        }
        [HttpGet("GetPendingApplicationIds")]
        public async Task<IActionResult> GetPendingApplicationId(string catCode, int regId)
        {
            var result = await _LicenseService.GetPendingApplicationId(catCode, regId);

            return Ok(result);
        }
        [HttpGet("GetDocDescriptionCatWise")]
        public async Task<IActionResult> GetDocDescriptionCatWise(string applicationIdNo,string CatCode, string DocType)
        {
            var result = await _LicenseService.GetDocDescriptionCatWiseService(applicationIdNo,CatCode, DocType);

            return Ok(result);
        }

        [HttpPost("SaveAndUpdateApplicantDocuments")]        
        public async Task<IActionResult> SaveAndUpdateApplicantDocuments( [FromForm] SaveAndUpdateApplicantDocumentsDto dto)
        {
            var result = await _LicenseService.SaveAndUpdateApplicantDocumentsService(dto);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "No Document Found."
                });
            }

            return Ok(result);
        }
    }
}