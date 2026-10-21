using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Licence.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IndividualController : ControllerBase
    {
        private readonly IIndividualServices _individualService;

        public IndividualController(IIndividualServices individualService)
        {
            _individualService = individualService;
        }

        [HttpPost("SaveSiteDetails")]
        public async Task<IActionResult> SaveSiteDetails(
            [FromBody] IndividualDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
            {
                return BadRequest(new
                {
                    message = "Application ID is required."
                });
            }

            try
            {
                var appId = await _individualService
                    .SaveApplicantSiteDetails(dto);

                return Ok(new
                {
                    success = true,
                    AppId = appId,
                    message = "L30 site details saved successfully."
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(
                    $"L30 SaveSiteDetails failed: {ex}");

                return StatusCode(500, new
                {
                    success = false,
                    message =
                        "Unable to save L30 site details. " +
                        "Check the backend console for the database error."
                });
            }
        }

        [HttpGet("GetSiteDetails/{appId}")]
        public async Task<IActionResult> GetSiteDetails(string appId)
        {
            if (string.IsNullOrWhiteSpace(appId))
            {
                return BadRequest(new
                {
                    message = "Application ID is required."
                });
            }

            var result = await _individualService
                .GetSiteDetails(appId);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "Site details not found."
                });
            }

            return Ok(result);
        }
    }
}