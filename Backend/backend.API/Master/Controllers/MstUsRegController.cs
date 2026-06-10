using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MstUsRegController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMstUsRegRepository _MstUsRegRepository;

    public MstUsRegController(ApplicationDbContext context, IMstUsRegRepository mstUsRegRepository)
    {
        _context = context;
        _MstUsRegRepository = mstUsRegRepository;
    }

    [HttpGet("{regId}")]
    public async Task<ActionResult<MstUsRegDto>> GetUser(long regId)
    {
       var user = await _MstUsRegRepository.GetUser(regId);

        if (user == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "User not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Data = user
        });
    }
}