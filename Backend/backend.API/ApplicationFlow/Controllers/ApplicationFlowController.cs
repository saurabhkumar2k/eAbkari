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

        public ApplicationFlowController(IApplicationFlowService applicationFlowService)
        {
            _applicationFlowService = applicationFlowService;
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
                        message = "Access Permission History Saved Successfully"
                    });
        }

        [HttpGet("GetAccessPermissionHistory/{applicationIdNo}")]
        public async Task<IActionResult> GetAccessPermissionHistory(string applicationIdNo)
        {
            if (string.IsNullOrWhiteSpace(applicationIdNo))
            {
                return BadRequest("ApplicationIdNo is required.");
            }

            var history = await _applicationFlowService.GetAccessPermissionHistory(applicationIdNo);

            if (history == null || !history.Any())
            {
                return NotFound("No access permission history found for the given ApplicationIdNo.");
            }

            return Ok(history);
        }
    }
}