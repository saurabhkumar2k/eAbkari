using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.API.ApplicationFlow.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PLAPullApplicationController : Controller
    {
        private readonly IPLAPullApplicationService _service;

        public PLAPullApplicationController(IPLAPullApplicationService service)
        {
            _service = service;
        }

        //[HttpGet("GetLicensePermitApplications")]
        //public async Task<IActionResult> GetLicensePermitApplications()
        //{
        //    var result = await _service.GetLicensePermitApplications();

        //    return Ok(result);
        //}


        //    [HttpPost("GetApplications")]
        //    public async Task<IActionResult> GetLicensePermitApplications(
        //[FromBody] string category)
        //    {
        //        var result = await _service.GetLicensePermitApplications(category);

        //        return Ok(result);
        //    }

        [HttpPost("GetApplications")]
        public async Task<IActionResult> GetLicensePermitApplications(
    [FromBody] GetApplicationsRequest request)
        {
            var result = await _service.GetLicensePermitApplications(
                request.Category,
                request.UserId);

            return Ok(result);
        }

        [HttpPost("PullApplications")]
        public async Task<IActionResult> PullApplications(
        [FromBody] PullApplicationRequest request)
        {
            if (request == null ||
                request.Applications == null ||
                request.Applications.Count == 0)
            {
                return BadRequest(new
                {
                    message = "Please select at least one application."
                });
            }

            var result = await _service.PullApplications(request);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }




    }
}
