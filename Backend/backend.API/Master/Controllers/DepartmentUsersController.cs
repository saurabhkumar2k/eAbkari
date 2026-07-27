using backend.Core.DTOs;
using backend.Core.Entities.Department;
using backend.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces.Department;

namespace backend.API.Master.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentUsersController : ControllerBase
    {
        private readonly IDepartmentUsersService _service;

        public DepartmentUsersController(IDepartmentUsersService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllAsync();

            if (!users.Any())
                return NotFound("No department users found.");

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
                return BadRequest("UserId is required.");

            var user = await _service.GetByIdAsync(userId);

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DepartmentUserDto userDto)
        {
           
            var result = await _service.CreateAsync(userDto);

            if (!result)
                return BadRequest("Unable to create user.");

            return Ok("User created successfully.");
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Update(DepartmentUserDto userDto)
        {

            var result = await _service.UpdateAsync(userDto);

            if (!result)
                return NotFound();

            return Ok("User updated successfully.");
        }

        //[HttpDelete("{userId}")]
        //public async Task<IActionResult> Delete(string userId)
        //{
        //    var result = await _repository.DeleteAsync(userId);

        //    if (!result)
        //        return NotFound();

        //    return Ok("User deleted successfully.");
        //}

        //[HttpPost("login")]
        //public async Task<IActionResult> Login(LoginDto dto)
        //{
        //    var user = await _repository.LoginAsync(dto.Email);

        //    if (user == null)
        //        return Unauthorized("Invalid email or password.");

        //    if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        //        return Unauthorized("Invalid email or password.");

        //    return Ok(new
        //    {
        //        user.UserId,
        //        user.UserName,
        //        user.Email,
        //        Roles = user.DeptUserRoles.Select(r => r.MstRoles.RoleName)
        //    });
        //}
    }
}
