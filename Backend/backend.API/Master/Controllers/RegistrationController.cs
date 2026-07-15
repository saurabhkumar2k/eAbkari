using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using backend.Infrastructure.Repositories;
using backend.Core.Entities;
using System.Net;

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
//     try
//     {
//         if (model == null)
//         {
//             return BadRequest("Model is null");
//         }

//         var regId = await _repository.CreateAsync(model);

//         return Ok(new
//         {
           
//         });
//     }
//     catch (Exception ex)
//     {
//         // Log error (important)
//         Console.WriteLine("ERROR: " + ex.Message);

//         return StatusCode(500, new
//         {
//             Success = false,
//             Message = ex.Message
//         });
//     }
// }


[HttpPost("register")]
[Consumes("multipart/form-data")]
public async Task<IActionResult> Register(
    [FromForm] MstUsReg model,
    IFormFile? photo)
{
    if (photo != null && photo.Length > 0)
    {
        string folder = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Documents",
            "Registration");

        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }

      
string extension = Path.GetExtension(photo.FileName);

string fileName = $"{model.UserId}_{model.Mobile}{extension}";

string filePath = Path.Combine(folder, fileName);

using (var stream = new FileStream(filePath, FileMode.Create))
{
    await photo.CopyToAsync(stream);
}

// Save relative path in database
model.Photo = Path.Combine("Photo_", fileName);
                
    }

            model.RegIP = HttpContext.Connection.RemoteIpAddress?.ToString();

            var regId = await _repository.CreateAsync(model);

    return Ok(new
    {
        Success = true,
        RegId = regId,
        PhotoPath = model.Photo,
        userId = model.UserId
    });
}








}



}