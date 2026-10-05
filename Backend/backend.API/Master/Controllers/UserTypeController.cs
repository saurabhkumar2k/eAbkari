using Microsoft.AspNetCore.Mvc;
using backend.Core.Entities.Department;
using backend.Core.Interfaces.Admin;
using backend.Infrastructure.Data;
using backend.Infrastructure.Repositories.Department;
using Microsoft.EntityFrameworkCore;
using backend.Application.Interfaces.Department;

namespace backend.API.Master.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserTypeController : Controller
    {
        private readonly IUserTypeService _UserTypeService;

        public UserTypeController(IUserTypeService UserTypeService)
        {
            _UserTypeService = UserTypeService;
        }


        [HttpGet("getUserType")]
        public async Task<IActionResult> GetUserType()
        {

            var data = await _UserTypeService.GetUserType();

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No User Type data found" });
            }

            return Ok(data);

        }

    }
}












