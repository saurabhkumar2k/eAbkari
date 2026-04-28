using Microsoft.AspNetCore.Mvc;
using CoreApi.Data;
using CoreApi.Models;
using CoreApi.DTOs;
using System.Diagnostics.Contracts;

namespace CoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegistrationModel model)
        {
            try
            {
                // ✅ Handle file upload
                string photoPath = "";
                if (model.Photo != null)
                {
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                    if (!Directory.Exists(folderPath))
                        Directory.CreateDirectory(folderPath);

                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Photo.FileName);
                    var filePath = Path.Combine(folderPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.Photo.CopyToAsync(stream);
                    }

                    photoPath = fileName;
                }

                // ✅ TODO: Save into database (using EF / SQL)
                // Example placeholder:
                var response = new
                {
                    message = "Registration successful",
                    data = model.FirstName + " " + model.LastName
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}