using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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


        [HttpPost]
        [Route("SaveAdditionalHCRCompleteDetails")]
        public async Task<IActionResult> SaveAdditionalHCRCompleteDetails([FromForm] AdditionalHCRCompleteDto dto)
        // public async Task<IActionResult> SaveAdditionalHCRCompleteDetails(AdditionalHCRCompleteDto dto)
        {
            if (dto == null || dto.AdditionalDetails == null)
            {
                return BadRequest("Invalid Request");
            }

            if (string.IsNullOrWhiteSpace(dto.AdditionalDetails.ApplicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            Console.WriteLine(
                JsonSerializer.Serialize(dto, new JsonSerializerOptions
                {
                    WriteIndented = true
                })
            );
            var result = await _HCRservice.SaveAdditionalHCRCompleteDetails(dto);

            // return Ok(result);
            return Ok(new
            {
                message = result
            });
        }

        [HttpGet]
        [Route("GetAdditionalHCRCompleteDetails")]
        public async Task<IActionResult> GetAdditionalHCRCompleteDetails([FromQuery] string applicationIdNo)
        {
            if (string.IsNullOrWhiteSpace(applicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            var result = await _HCRservice.GetAdditionalHCRCompleteDetails(applicationIdNo);

            if (result == null)
            {
                return NotFound("Record Not Found");
            }

            return Ok(result);
        }
        [HttpPost]
        [Route("DeletePartner")]
        public async Task<IActionResult> DeletePartner(DeletePartnerDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid Request");
            }

            if (dto.ID <= 0)
            {
                return BadRequest("Invalid Partner Id");
            }

            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            var result = await _HCRservice.DeletePartner(dto.ID, dto.ApplicationIdNo);

            return Ok(result);
        }

    }
}