using backend.Application.Interfaces.Department;
using backend.Core.Entities.Department;
using backend.Core.Interfaces.Department;
using backend.Infrastructure.Data;
using backend.Infrastructure.Repositories.Department;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.API.Master.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleservice;

        public RoleController(IRoleService RoleService)
        {
            _roleservice = RoleService;
        }



        [HttpGet("getRole")]
        public async Task<IActionResult> GetRole()
        {

            var data = await _roleservice.GetAllAsync();

            if (data == null || !data.Any())
            {
                return NotFound("No Role data found");
            }

            return Ok(data);

        }


        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole(AddRoleDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var role = await _roleservice.CreateAsync(model);

            return Ok(new
            {
                Success = true,
                Message = "Role created successfully.",
                Data = role
            });
        }

        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole(RoleDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

   

            // Check if another role already has the same name

            var updatedRole = await _roleservice.UpdateAsync(model);

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
