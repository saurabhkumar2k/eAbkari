using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using backend.Infrastructure.Repositories;
using backend.Core.Entities;

namespace backend.API.Controllers
{


[ApiController]
[Route("api/[controller]")]
public class UserRegistrationController : ControllerBase
{
    private readonly IUserRegistrationRepository _repository;

    public UserRegistrationController(IUserRegistrationRepository repository)
    {
        _repository = repository;
    }

    // [HttpPost("register")]
    // public async Task<IActionResult> Register([FromBody] MstUsReg model)
    // {
    //     var regId = await _repository.CreateAsync(model);

    //     return Ok(new
    //     {
    //         Success = true,
    //         Message = "User registered successfully",
    //         RegId = regId
    //     });
    // }

[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] MstUsReg model)
{
    try
    {
        if (model == null)
        {
            return BadRequest("Model is null");
        }

        var regId = await _repository.CreateAsync(model);

        return Ok(new
        {
            Success = true,
            Message = "User registered successfully",
            RegId = regId
        });
    }
    catch (Exception ex)
    {
        // Log error (important)
        Console.WriteLine("ERROR: " + ex.Message);

        return StatusCode(500, new
        {
            Success = false,
            Message = ex.Message
        });
    }
}







}



}