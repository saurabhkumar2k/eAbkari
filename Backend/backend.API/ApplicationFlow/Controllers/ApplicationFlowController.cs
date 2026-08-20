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
        public async Task<IActionResult> CreateAccessPermissionHistory([FromBody] PlaAccessPermissionHistoryDto historyDto)
        {
            if (historyDto == null)
            {
                return BadRequest("Invalid access permission history data.");
            }

            //await _applicationFlowService.CreateAccessPermissionHistory(historyDto);
            return CreatedAtAction(nameof(GetAccessPermissionHistory), new { applicationIdNo = historyDto.ApplicationIdNo }, historyDto);
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