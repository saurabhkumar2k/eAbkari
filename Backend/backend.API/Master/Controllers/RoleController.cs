using backend.Core.Entities.Department;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using backend.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.API.Master.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly IRolesRepository _repository;
        private readonly ApplicationDbContext _context;

        public RoleController(IRolesRepository repository, ApplicationDbContext context)
        {
            _repository = repository;
            _context = context;
        }



        [HttpGet("getRole")]
        public async Task<IActionResult> GetRole()
        {

            var data = await _repository.GetRolesAsync();

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No Role data found" });
            }

            return Ok(data);

        }


        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole(AddRoleDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool exists = await _repository.RoleExistsAsync(model.RoleName.Trim());

            if (exists)
            {
                return Conflict(new
                {
                    Success = false,
                    Message = "Role already exists."
                });
            }

            var role = await _repository.CreateRoleAsync(model);

            return Ok(new
            {
                Success = true,
                Message = "Role created successfully.",
                Data = role
            });
        }

    }
}
