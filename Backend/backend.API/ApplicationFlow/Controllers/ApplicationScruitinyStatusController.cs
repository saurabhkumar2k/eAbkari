using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace backend.API.ApplicationFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationScruitinyStatusController : ControllerBase
    {
        private readonly IApplicationScruitinyStatusService _applicationScruitinyStatusService;

        public ApplicationScruitinyStatusController(IApplicationScruitinyStatusService applicationScruitinyStatusService)
        {

            this._applicationScruitinyStatusService = applicationScruitinyStatusService;

        }

        // [HttpPost("ApplicationScruitinyStatus")]
        // public async Task<IActionResult> ApplicationScruitinyStatus([FromBody] ApplicationScruitinyStatusDto Dto)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }

        //     if (Dto == null)
        //     {
        //         return BadRequest("Scrutiny Not Done.");
        //     }

        //     var user = await _applicationScruitinyStatusService.ApplicationScruitinyStatus(Dto);
        //     return Ok(new
        //     {
        //         applicationId = user,
        //         //message = "Access Permission History Saved Successfully"
        //         message = "Application Scrutiny Successfully Done"
        //     });

        // }

        [HttpPost("ApplicationScruitinyStatus")]
        public async Task<IActionResult> ApplicationScruitinyStatus([FromBody] List<ApplicationScruitinyStatusDto> dtos)
        {
            if (dtos == null || !dtos.Any())
            {
                return BadRequest("Scrutiny data cannot be empty.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var applicationIds = dtos
                .Select(x => x.ApplicationIdNo)
                .Distinct()
                .ToList();

            if (applicationIds.Count != 1 ||
                string.IsNullOrWhiteSpace(applicationIds[0]))
            {
                return BadRequest("All records must have the same Application ID.");
            }

            var result = await _applicationScruitinyStatusService
                .ApplicationScruitinyStatus(dtos);

            return Ok(new
            {
                applicationId = result,
                totalRecords = dtos.Count,
                message = "Application Scrutiny Successfully Done"
            });
        }


        [HttpGet("GetApplicationScruitinyStatus")]
        public async Task<IActionResult> GetApplicationScruitinyStatus(
            [FromQuery] string applicationIdNo)
        {
            if (string.IsNullOrWhiteSpace(applicationIdNo))
            {
                return BadRequest("Application ID is required.");
            }

            var result = await _applicationScruitinyStatusService
                .GetApplicationScruitinyStatus(applicationIdNo);

            if (result == null || !result.Any())
            {
                return NotFound("No scrutiny records found.");
            }

            return Ok(result);
        }


    }
}