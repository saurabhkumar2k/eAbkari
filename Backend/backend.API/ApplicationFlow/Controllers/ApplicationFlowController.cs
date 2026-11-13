using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace backend.API.ApplicationFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationFlowController : ControllerBase
    {
        private readonly IApplicationFlowService _applicationFlowService;

        // private readonly IApplicationScruitinyStatusService _applicationScruitinyStatusService;

        public ApplicationFlowController(IApplicationFlowService applicationFlowService)
        {
            _applicationFlowService = applicationFlowService;
            // this._applicationScruitinyStatusService = applicationScruitinyStatusService;

        }

        [HttpPost("AccessPermissionHistory")]
        public async Task<IActionResult> CreateAccessPermissionHistory([FromBody] PlaAccessPermissionHistoryDto Dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (Dto == null)
            {
                return BadRequest("Invalid access permission history data.");
            }

            //await _applicationFlowService.CreateAccessPermissionHistory(Dto);
            //return CreatedAtAction(nameof(GetAccessPermissionHistory), new { applicationIdNo = Dto.ApplicationIdNo }, Dto);

            var user = await _applicationFlowService.SaveAccessPermissionHistory(Dto);
            return Ok(new
            {
                applicationId = user,
                //message = "Access Permission History Saved Successfully"
                message = "Application Forwarded Successfully"
            });
        }

        // [HttpGet("GetAccessPermissionHistory/{applicationIdNo}")]
        // public async Task<IActionResult> GetAccessPermissionHistory(string applicationIdNo)
        // {
        //     if (string.IsNullOrWhiteSpace(applicationIdNo))
        //     {
        //         return BadRequest("ApplicationIdNo is required.");
        //     }

        //     var history = await _applicationFlowService.GetAccessPermissionHistory(applicationIdNo);

        //     if (history == null || !history.Any())
        //     {
        //         return NotFound("No access permission history found for the given ApplicationIdNo.");
        //     }

        //     return Ok(history);
        // }

        [HttpGet("GetAccessPermissionHistory")]
        public async Task<IActionResult> GetAccessPermissionHistory(
            [FromQuery] string userId,
            [FromQuery] DateTime fromDate,
            [FromQuery] DateTime toDate)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("UserId is required.");
            }

            if (fromDate > toDate)
            {
                return BadRequest("FromDate cannot be greater than ToDate.");
            }

            var history = await _applicationFlowService
                .GetAccessPermissionHistory(userId, DateOnly.FromDateTime(fromDate), DateOnly.FromDateTime(toDate));

            if (history == null || !history.Any())
            {
                return NotFound("No access permission history found.");
            }

            return Ok(history);
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


        // [HttpGet("GetApplicationScruitinyStatus")]
        // public async Task<IActionResult> GetApplicationScruitinyStatus(
        //     [FromQuery] string applicationIdNo)
        // {
        //     if (string.IsNullOrWhiteSpace(applicationIdNo))
        //     {
        //         return BadRequest("Application ID is required.");
        //     }

        //     var result = await _applicationScruitinyStatusService
        //         .GetApplicationScruitinyStatus(applicationIdNo);

        //     if (result == null || !result.Any())
        //     {
        //         return NotFound("No scrutiny records found.");
        //     }

        //     return Ok(result);
        // }


    }
}