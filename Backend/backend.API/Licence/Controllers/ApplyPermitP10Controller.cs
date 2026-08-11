using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using backend.Core.DTOs;
using backend.Infrastructure.Repositories;
using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.API.Controllers
{

[ApiController]
[Route("api/[controller]")]
public class ApplyPermitP10Controller : ControllerBase
{
    private readonly IPermitP10Repository _repository;

    public ApplyPermitP10Controller(IPermitP10Repository repository)
    {
        _repository = repository;
    }



        [HttpPost]
        public async Task<IActionResult> ApplyPermitP10([FromForm] ApplyPermitP10Dto dto)
        {
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

            var count = dto.LicenseApplicationUploadedDocument?.Count ?? 0;

            var id = await _repository.ApplyPermitP10Async(dto, ipAddress);
            return Ok(new 
            {
                Success = true, 
                ApplicationId = id 
            });

        }



        [HttpGet("GetPremise")]
        public async Task<IActionResult> GetPremise()
        {
            var data = await _repository.GetPremiseAsync();
            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No Premises found" });
            }
            return Ok(data);
        }




        [HttpGet("GetPermitP10/{applid}")]
        public async Task<IActionResult> GetPermitP10(string applid)
        {
            var data = await _repository.GetPermitP10Async(applid);

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No Permit P10 found" });
            }

            return Ok(data);
        }

    }

}