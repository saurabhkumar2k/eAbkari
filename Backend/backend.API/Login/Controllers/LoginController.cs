using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Microsoft.AspNetCore.Http;
using backend.Infrastructure.Data;
using backend.API.Services;



namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _LoginRepository;
        private readonly IJwtService _jwtService;
        //private readonly ApplicationDbContext _context;
        public LoginController(ILoginRepository LoginRepository, IJwtService jwtService)
        {
            _LoginRepository = LoginRepository;
            _jwtService = jwtService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { Success = false, Message = "Username and password are required" });
            }

            var user = await _LoginRepository.AuthenticateAsync(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized(new { Success = false, Message = "Invalid username or password" });
            }

            var token = _jwtService.GenerateToken(user.User_Id);
            // Save token to database
            await _LoginRepository.SaveTokenAsync(user.User_Id, token);

            return Ok(new { Success = true, Message = "Login successful", Token = token, UserId = user.User_Id, RedirectUrl = "/index.html" });
        }
    }

    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}