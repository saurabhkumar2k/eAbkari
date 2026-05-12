using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;

namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IStateRepository _stateRepository;

        public StateController(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        [HttpGet("getState")]
        public async Task<IActionResult> GetState()
        {
            var data = await _stateRepository.GetStateAsync();
            return Ok(data);
        }
    }
}