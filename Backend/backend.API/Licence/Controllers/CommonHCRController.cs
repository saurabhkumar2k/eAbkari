using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Licence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonHCRController : ControllerBase
    {
        private readonly ICommonHCRServices _HCRservice;    
        public CommonHCRController(ICommonHCRServices repository)
        {
            _HCRservice = repository;
        }

        [HttpPost]
        [Route("SaveSiteDetails")]
        public async Task<IActionResult> SaveApplicantSiteDetails(LicenseSiteDetailsDto dto)
        {
            if (!ModelState.IsValid)
            {          
                return BadRequest(ModelState);
            }

            var user = await _HCRservice.SaveApplicantSiteDetails(dto);

            return Ok(user);
        }
    }
}