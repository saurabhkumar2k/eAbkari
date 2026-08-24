using backend.Core.DTOs;
using backend.Core.Interfaces;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using backend.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.API.Master.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationProgressController : Controller
    {

        //private readonly IApplicationProgressRepository _ApplicationPRepository;

        //private readonly ApplicationDbContext _context;

        //public ApplicationProgressController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}

        //public ApplicationProgressController(IApplicationProgressRepository ApplicationPRepository)
        //{
        //    _ApplicationPRepository = ApplicationPRepository;
        //}





        private readonly ApplicationDbContext _context;
        private readonly IApplicationProgressRepository _ApplicationPRepository;

        public ApplicationProgressController(
            ApplicationDbContext context,
            IApplicationProgressRepository ApplicationPRepository)
        {
            _context = context;
            _ApplicationPRepository = ApplicationPRepository;
        }



        //[HttpGet("GetCurrentStep/{applicationId}")]
        //public async Task<IActionResult> GetCurrentStep(string applicationId)
        //{
        //    var step = await _ApplicationPRepository.GetCurrentStepAsync(applicationId);

        //    return Ok(new
        //    {
        //        currentStep = step
        //    });
        //}

        [HttpGet("GetWarehouseByApplicationId/{applicationId}")]
        public async Task<IActionResult> GetWarehouseByApplicationId(string applicationId)
        {
            var data = await _ApplicationPRepository.GetWarehouseByApplicationIdAsync(applicationId);

            if (data == null)
                return NotFound();

            return Ok(data);
        }



        [HttpGet("GetCompanyDetailsByApplicationId/{applicationId}")]
        public async Task<IActionResult> GetCompanyDetailsByApplicationId(string applicationId)
        {
            var data = await _ApplicationPRepository.GetCompanyDetailsByApplicationIdAsync(applicationId);

            if (data == null)
                return NotFound();

            return Ok(data);
        }


        [HttpGet("GetUploadedDocumentsByApplicationId/{applicationId}")]
        public async Task<IActionResult> GetUploadedDocumentsByApplicationId( string applicationId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(applicationId))
                {
                    return BadRequest("ApplicationId is required.");
                }

                var documents =
                    await _ApplicationPRepository.GetUploadedDocumentsByApplicationIdAsync( applicationId);

                return Ok(documents);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(
                    500,
                    "Error while getting uploaded documents.");
            }
        }






        [HttpPut("UpdateApplicationStatus")]
        public async Task<IActionResult> UpdateApplicationStatus(
    [FromBody] UpdateApplicationStatusDto dto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
                {
                    return BadRequest("ApplicationIdNo is required.");
                }

                var rows =
                    await _context.LicenseApplications
                        .Where(x =>
                            x.ApplicationIdNo ==
                            dto.ApplicationIdNo)
                        .ExecuteUpdateAsync(setters =>
                            setters.SetProperty(
                                x => x.ApplicationStatus,
                                dto.ApplicationStatus
                            )
                        );

                if (rows == 0)
                {
                    return NotFound(new
                    {
                        message = "Application not found.",
                        applicationIdNo =
                            dto.ApplicationIdNo
                    });
                }

                return Ok(new
                {
                    message =
                        "Application status updated successfully.",
                    applicationIdNo =
                        dto.ApplicationIdNo,
                    applicationStatus =
                        dto.ApplicationStatus
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message =
                        "Error updating application status.",
                    error = ex.Message
                });
            }
        }









    }
}
