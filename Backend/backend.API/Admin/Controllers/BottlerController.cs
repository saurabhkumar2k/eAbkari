using Microsoft.AspNetCore.Mvc;
using backend.Core.Entities;
using backend.Core.Interfaces;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BottlerController : ControllerBase
    {
        private readonly IMstLiquorBottlerRepository _repository;

        public BottlerController(IMstLiquorBottlerRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repository.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var data = await _repository.GetByCodeAsync(code);

            if (data == null)
                return NotFound();

            return Ok(data);
        }

        [HttpGet("lookup")]
        public async Task<IActionResult> GetByCodeQuery([FromQuery] string code)
        {
            if (string.IsNullOrWhiteSpace(code))
                return BadRequest("code is required");

            var data = await _repository.GetByCodeAsync(code);

            if (data == null)
                return NotFound();

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Save(MstLiquorBottler model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool duplicate = await _repository.IsDuplicateAsync(model.LiquorBottlerCode);

            if (duplicate)
                return BadRequest("Bottler Code already exists.");

            var result = await _repository.SaveAsync(model);

            if (!result)
                return BadRequest();

            return Ok("Saved Successfully");
        }

        [HttpPut]
        public async Task<IActionResult> Update(MstLiquorBottler model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _repository.UpdateAsync(model);

            if (!result)
                return BadRequest();

            return Ok("Updated Successfully");
        }

        [HttpDelete("{code}")]
        public async Task<IActionResult> Delete(string code)
        {
            var result = await _repository.DeleteAsync(code);

            if (!result)
                return BadRequest();

            return Ok("Deleted Successfully");
        }

        [HttpGet("origins")]
        public async Task<IActionResult> GetOrigins()
        {
            return Ok(await _repository.GetOriginsAsync());
        }

        [HttpGet("states")]
        public async Task<IActionResult> GetStates()
        {
            return Ok(await _repository.GetStatesAsync());
        }

        [HttpGet("codes")]
        public async Task<IActionResult> GetCodes([FromQuery] string? origin, [FromQuery] string? stateCode)
        {
            return Ok(await _repository.GetBottlerCodesAsync(origin, stateCode));
        }
        [HttpGet("grid")]
        public async Task<IActionResult> GetGrid([FromQuery] string origin,[FromQuery] string? stateCode)
        {
            var result = await _repository.GetGridAsync(origin, stateCode);
            return Ok(result);
        }
    }
}