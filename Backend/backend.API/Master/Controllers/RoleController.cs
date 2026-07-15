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

        public RoleController(IRolesRepository repository)
        {
            _repository = repository;
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

            bool exists = await _repository.RoleExistsByNameAsync(model.RoleName);

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

        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole(UpdateRoleDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if the role exists
            var existRole = await _repository.RoleExistsAsync(model.RoleId);

            if (!existRole)
            {
                return NotFound(new
                {
                    Success = false,
                    Message = "Role not found."
                });
            }

            // Check if another role already has the same name

            var updatedRole = await _repository.UpdateRoleAsync(model);

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
