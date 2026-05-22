using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Microsoft.AspNetCore.Http;
using backend.Infrastructure.Data;
using backend.API.Services;
using backend.API.Helpers;



namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _LoginRepository;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;
        //private readonly ApplicationDbContext _context;
        public LoginController(ILoginRepository LoginRepository, IJwtService jwtService, IConfiguration configuration)
        {
            _LoginRepository = LoginRepository;
            _jwtService = jwtService;
            _configuration = configuration;
        }

        [HttpPost("Login")]
              public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { Success = false, Message = "Username and password are required" });
            }

               string hashedPassword = PasswordHelper.HashPassword(request.Password);

            // LIC Login
              var licUser = await _LoginRepository.AuthenticateAsync( request.Username,hashedPassword);

         if (licUser != null)
          {
    var tokenPair = _jwtService.GenerateTokenPair(licUser.UserId);

    var refreshTokenExpiryDays = int.Parse(
        _configuration.GetSection("JwtSettings")["RefreshTokenExpiryDays"] ?? "7"
    );

    var refreshTokenExpiry = DateTime.UtcNow.AddDays(refreshTokenExpiryDays);

    await _LoginRepository.SaveTokenAsync(
        licUser.UserId,
        tokenPair.AccessToken
    );

    await _LoginRepository.SaveTokenPairAsync(
        licUser.UserId,
        tokenPair.AccessToken,
        tokenPair.RefreshToken,
        refreshTokenExpiry
    );

    return Ok(new
    {
        Success = true,
        Message = "LIC Login successful",
        AccessToken = tokenPair.AccessToken,
        RefreshToken = tokenPair.RefreshToken,
        ExpiresAt = tokenPair.ExpiresAt,
        UserId = licUser.UserId,
        UserType = "LIC",
        RedirectUrl = "/welcome.html"
    });
}


// Applicant Login


var applicantUser = await _LoginRepository.LoginAuthenticateAsync(
    request.Username, hashedPassword
);

if (applicantUser != null)
{
    var tokenPair = _jwtService.GenerateTokenPair(applicantUser.UserId);

    var refreshTokenExpiryDays = int.Parse(
        _configuration.GetSection("JwtSettings")["RefreshTokenExpiryDays"] ?? "7"
    );

    var refreshTokenExpiry = DateTime.UtcNow.AddDays(refreshTokenExpiryDays);

    await _LoginRepository.SaveTokenAsync(
        applicantUser.UserId,
        tokenPair.AccessToken
    );

    await _LoginRepository.SaveTokenPairAsync(
        applicantUser.UserId,
        tokenPair.AccessToken,
        tokenPair.RefreshToken,
        refreshTokenExpiry
    );

    return Ok(new
    {
        Success = true,
        Message = "Applicant Login successful",
        AccessToken = tokenPair.AccessToken,
        RefreshToken = tokenPair.RefreshToken,
        ExpiresAt = tokenPair.ExpiresAt,
        UserId = applicantUser.UserId,
        UserType = "Applicant",
        RedirectUrl = "/welcome.html"
    });
}


// Invalid Login
return Unauthorized(new
{
    Success = false,
    Message = "Invalid username or password"
});
            //return Ok(new { Success = true, Message = "Login successful", Token = token, UserId = user.User_Id, RedirectUrl = "/index.html" });
        }
    }

    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}