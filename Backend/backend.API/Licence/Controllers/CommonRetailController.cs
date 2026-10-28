using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace backend.API.Licence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonRetailController : ControllerBase
    {
        private readonly ICommonRetailServices _RetailService;
        public CommonRetailController(ICommonRetailServices services)
        {
            _RetailService = services;
        }
        [HttpGet("GetRetailLicenseeCategory")]
        public async Task<IActionResult> GetRetailLicenseeCategory()
        {
            var data = await _RetailService.GetRetailLicenseeCategoryService();

            return Ok(data);
        }



        [HttpPost]
        [Route("SaveAdditionalRetailCompleteDetails")]
        [Consumes("multipart/form-data")]
        //For testing this api please Run the Frontend and fill the records from the From
        public async Task<IActionResult> SaveAdditionalRetailCompleteDetails([FromForm] RetailCompleteDto dto)
        {
            if (dto == null || dto.RetailDetails == null)
            {
                return BadRequest("Invalid Request");
            }

            if (string.IsNullOrWhiteSpace(dto.RetailDetails.ApplicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            Console.WriteLine(
                JsonSerializer.Serialize(dto, new JsonSerializerOptions
                {
                    WriteIndented = true
                })
            );
            var result = await _RetailService.SaveAdditionalRetailCompleteDetails(dto);

            // return Ok(result);
            return Ok(new
            {
                message = result
            });
        }

        [HttpGet]
        [Route("GetAdditionalRetailCompleteDetails")]
        public async Task<IActionResult> GetAdditionalRetailCompleteDetails([FromQuery] string applicationIdNo)
        {
            if (string.IsNullOrWhiteSpace(applicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            var result = await _RetailService.GetAdditionalRetailCompleteDetails(applicationIdNo);

            if (result == null)
            {
                return NotFound("Record Not Found");
            }

            return Ok(result);
        }
    }
}
