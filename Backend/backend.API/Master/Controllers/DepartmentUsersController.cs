using backend.Core.DTOs;
using backend.Core.Entities.Department;
using backend.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Master.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentUsersController : ControllerBase
    {
        private readonly IDepartmentUserRepository _repository;

        public DepartmentUsersController(IDepartmentUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _repository.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(string userId)
        {
            var user = await _repository.GetByIdAsync(userId);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DepartmentUserDto dto)
        {
           
            var result = await _repository.CreateAsync(dto);

            if (!result)
                return BadRequest("Unable to create user.");

            return Ok("User created successfully.");
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Update(DepartmentUserDto dto)
        {
            var user = new DepartmentUserDto
            {
                UserId = dto.UserId,
                UserName = dto.UserName,
                UserDesignation = dto.UserDesignation,
                Email = dto.Email,
                IsActive = dto.IsActive,
                //UpdatedDate = DateTime.UtcNow
            };

            var result = await _repository.UpdateAsync(user);

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
