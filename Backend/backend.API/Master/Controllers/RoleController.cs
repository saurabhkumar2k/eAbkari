using backend.Core.Entities.Department;
using backend.Core.Interfaces.Department;
using backend.Infrastructure.Data;
using backend.Infrastructure.Repositories.Department;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Application.Interfaces.Department;
using backend.Core.DTOs;

namespace backend.API.Master.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly IRoleService _service;

        public RoleController(IRoleService service)
        {
            _service = service;
        }



        [HttpGet("getRole")]
        public async Task<IActionResult> GetRole()
        {

            var data = await _service.GetAllAsync();

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

            var exists = (await _service.GetAllAsync())
                .Any(role => role.RoleName == model.RoleName);

            if (exists)
            {
                return Conflict(new
                {
                    Success = false,
                    Message = "Role already exists."
                });
            }

            var role = await _service.CreateAsync(model);

            return Ok(new
            {
                Success = true,
                Message = "Role created successfully.",
                Data = role
            });
        }

        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole(UpdateRoleDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if the role exists
            var existRole = await _service.GetByIdAsync(model.RoleId);

            if (existRole == null)
            {
                return NotFound(new
                {
                    Success = false,
                    Message = "Role not found."
                });
            }

            // Check if another role already has the same name

            var updatedRole = await _service.UpdateAsync(model);

            return Ok(new
            {
                Success = true,
                Message = "Role updated successfully.",
                Data = updatedRole
            });
        }

        //[HttpDelete("DeleteRole/{roleId}")]
        //public async Task<IActionResult> DeleteRole(int roleId)
        //{
        //    var role = await _repository.GetRoleByRoleId(roleId);

        //    if (role == null)
        //    {
        //        return NotFound(new
        //        {
        //            Success = false,
        //            Message = "Role not found."
        //        });
        //    }

        //    await _repository.DeleteRoleAsync(roleId);

        //    return Ok(new
        //    {
        //        Success = true,
        //        Message = "Role deleted successfully."
        //    });


        //}

    }
}
