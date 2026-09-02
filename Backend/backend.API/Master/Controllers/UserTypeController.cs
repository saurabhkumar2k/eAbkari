using Microsoft.AspNetCore.Mvc;
using backend.Core.Entities.Department;
using backend.Core.Interfaces.Admin;
using backend.Infrastructure.Data;
using backend.Infrastructure.Repositories.Department;
using Microsoft.EntityFrameworkCore;

namespace backend.API.Master.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserTypeController : Controller
    {
        private readonly IUserTypeRepository _repository;

        public UserTypeController(IUserTypeRepository repository)
        {
            _repository = repository;
        }


        [HttpGet("getUserType")]
        public async Task<IActionResult> GetUserType()
        {

            var data = await _repository.GetUserTypeAsync();

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No User Type data found" });
            }

            return Ok(data);

        }

    }
}












