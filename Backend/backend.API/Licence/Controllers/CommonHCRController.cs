using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Licence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonHCRController : ControllerBase
    {
        private readonly ICommonHCRServices _HCRservice;
        public CommonHCRController(ICommonHCRServices repository)
        {
            _HCRservice = repository;
        }

        [HttpPost]
        [Route("SaveSiteDetails")]
        public async Task<IActionResult> SaveApplicantSiteDetails(LicenseSiteDetailsDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var AppId = await _HCRservice.SaveApplicantSiteDetails(dto);

            return Ok(new { AppId });
        }

        [HttpPost]
        [Route("GetSiteDetails")]
        [HttpGet("GetSiteDetails/{appId}")]
        public async Task<IActionResult> GetSiteDetails(string appId)
        {
            var siteDetails = await _HCRservice.GetSiteDetails(appId);

            if (siteDetails == null)
                return NotFound();

            return Ok(siteDetails);
        }

        [HttpGet]
        [Route("GetCategoryWiseQuestions")]
        public async Task<IActionResult> GetCategoryWiseQuestions(string catCode)
        {
            var result = await _HCRservice.GetCategoryWiseQuestions(catCode);

            if (result == null || result.Count == 0)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        [Route("SaveCategoryWiseAnswers")]
        public async Task<IActionResult> SaveCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _HCRservice.SaveCategoryWiseAnswers(dto);

            return Ok(result);
        }

        [HttpPost]
        [Route("GetAppIdWiseAnswers")]
        public async Task<IActionResult> GetAppIdWiseAnswers(GetApplicationAnswerRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
                return BadRequest("ApplicationIdNo is required.");

            var result = await _HCRservice.GetAppIdWiseAnswers(dto.ApplicationIdNo);

            return Ok(result);
        }

        [HttpPut]
        [Route("UpdateCategoryWiseAnswers")]
        public async Task<IActionResult> UpdateCategoryWiseAnswers(List<CategoryWiseAnswersDto> dto)
        {
            var result = await _HCRservice.UpdateCategoryWiseAnswers(dto);

            return Ok(result);
        }
    }
}