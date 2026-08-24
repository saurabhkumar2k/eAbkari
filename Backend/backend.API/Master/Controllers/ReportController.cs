using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;
using backend.Core.Interfaces;
using backend.Core.DTOs;

namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;

        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }


        //public async Task<IActionResult> GetL1Report(string applicationId)
        //{
        //    try
        //    {
        //        var result = await _reportRepository.GetL1ReportAsync(applicationId);

        //        if (result == null)
        //        {
        //            return NotFound(new
        //            {
        //                message = "Application not found."
        //            });
        //        }

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new
        //        {
        //            message = ex.Message
        //        });
        //    }
        //}


        [HttpGet("L1/{applicationId}")]
        public async Task<ReportDto?> GetL1Report(string applicationId)
        {
            var report = await _reportRepository.GetBasicReport(applicationId);

            if (report == null)
                return null;

            report.LicenseCompanyDetails = await _reportRepository.GetCompanyDetails(applicationId);

            report.WarehouseDetails = await _reportRepository.GetWarehouseDetails(applicationId);

            report.Directors = await _reportRepository.GetDirectors(applicationId);

            report.Documents = await _reportRepository.GetDocuments(applicationId);

            return report;
        }













        // Dashboard - Applied Licenses
        [HttpGet("GetMyApplications/{regId}")]
        public async Task<IActionResult> GetMyApplications(long regId)
        {
            var result = await _reportRepository.GetMyApplicationsAsync(regId);

            if (result == null || !result.Any())
            {
                return NotFound(new
                {
                    message = "No applications found."
                });
            }

            return Ok(result);
        }


        [HttpGet("GetMyDraftApplications/{regId}")]
        public async Task<IActionResult> GetMyDraftApplications(long regId)
        {
            var result = await _reportRepository.GetMyApplicationsAsync(regId);
            return Ok(result);
        }




    }
}