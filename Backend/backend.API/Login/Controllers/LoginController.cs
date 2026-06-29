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

            string username = request.Username!;
            string password = request.Password!;
            string hashedPassword = PasswordHelper.HashPassword(password);
            var userTypeCode = await _LoginRepository.GetUserTypeAsync(username);//MM_US_MT

               //Department Login
            var licUser1 = await _LoginRepository.AuthenticateAsyncs(username,hashedPassword);

         if (licUser1 != null)
          {
    var tokenPair = _jwtService.GenerateTokenPair(licUser1.UserId);

    var refreshTokenExpiryDays = int.Parse(
        _configuration.GetSection("JwtSettings")["RefreshTokenExpiryDays"] ?? "7"
    );

    var refreshTokenExpiry = DateTime.UtcNow.AddDays(refreshTokenExpiryDays);

    await _LoginRepository.SaveTokenAsyncDEP(
        licUser1.UserId,      
     tokenPair.AccessToken
    );

    await _LoginRepository.SaveTokenPairAsyncDEP(
        licUser1.UserId,
        tokenPair.AccessToken,
        tokenPair.RefreshToken,
        refreshTokenExpiry
    );

    await _LoginRepository.CreateUserSessionAsync(
        licUser1.UserId,
        DateTime.UtcNow,
        tokenPair.ExpiresAt,
        DateTime.UtcNow
    );

    return Ok(new
    {
        Success = true,
        Message = "Department Login successful",
        AccessToken = tokenPair.AccessToken,
        RefreshToken = tokenPair.RefreshToken,
        ExpiresAt = tokenPair.ExpiresAt,
        UserId = licUser1.UserId,
        UserType = "Department Login",
        RedirectUrl = "/welcome.html"
    });
}
 // LIC Login
    var licUser = await _LoginRepository.AuthenticateAsync(username,hashedPassword);

         if (licUser != null)
          {
    var tokenPairL = _jwtService.GenerateTokenPair(licUser.User_Id);

    var refreshTokenExpiryDays = int.Parse(
        _configuration.GetSection("JwtSettings")["RefreshTokenExpiryDays"] ?? "7"
    );

    var refreshTokenExpiry = DateTime.UtcNow.AddDays(refreshTokenExpiryDays);

    await _LoginRepository.SaveTokenAsyncLIC(
        licUser.User_Id,      
     tokenPairL.AccessToken
    );

    await _LoginRepository.SaveTokenPairAsyncLIC(
        licUser.User_Id,
        tokenPairL.AccessToken,
        tokenPairL.RefreshToken,
        refreshTokenExpiry
    );

    await _LoginRepository.CreateUserSessionAsync(
        licUser.User_Id,
        DateTime.UtcNow,
        tokenPairL.ExpiresAt,
        DateTime.UtcNow
    );

    return Ok(new
    {
        Success = true,
        Message = "LIC Login successful",
        AccessToken = tokenPairL.AccessToken,
        RefreshToken = tokenPairL.RefreshToken,
        ExpiresAt = tokenPairL.ExpiresAt,
        UserId = licUser.User_Id,
        UserType = "License Login",
        RedirectUrl = "/welcome.html"
    });
}

// Applicant Login


var applicantUser = await _LoginRepository.LoginAuthenticateAsync(
    username, hashedPassword
);

if (applicantUser != null)
{
    var userId = applicantUser.UserId!;
    var tokenPair = _jwtService.GenerateTokenPair(userId);

    var refreshTokenExpiryDays = int.Parse(
        _configuration.GetSection("JwtSettings")["RefreshTokenExpiryDays"] ?? "7"
    );

    var refreshTokenExpiry = DateTime.UtcNow.AddDays(refreshTokenExpiryDays);

    await _LoginRepository.SaveTokenAsync(
        userId,
        tokenPair.AccessToken
    );

    await _LoginRepository.SaveTokenPairAsync(
        userId,
        tokenPair.AccessToken,
        tokenPair.RefreshToken,
        refreshTokenExpiry
    );

    await _LoginRepository.CreateUserSessionAsync(
        userId,
        DateTime.UtcNow,
        tokenPair.ExpiresAt,
        DateTime.UtcNow
    );

    return Ok(new
    {
        Success = true,
        Message = "Applicant Login successful",
        AccessToken = tokenPair.AccessToken,
        RefreshToken = tokenPair.RefreshToken,
        ExpiresAt = tokenPair.ExpiresAt,
        UserId = userId,
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