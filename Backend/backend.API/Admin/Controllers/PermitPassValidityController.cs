using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermitPassValidityController : ControllerBase
    {
        private readonly IPermitPassValidityRepository _repository;

        public PermitPassValidityController(IPermitPassValidityRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("states")]
        public async Task<IActionResult> GetStates()
        {
            var states = await _repository.GetStatesAsync();

            var result = states.Select(x => new
            {
                stateCode = (x.StateCode ?? string.Empty).Trim(),
                stateName = x.StateDesc ?? string.Empty
            });

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{stateCode}")]
        public async Task<IActionResult> GetByStateCode(string stateCode)
        {
            var data = await _repository.GetByStateCodeAsync(stateCode);
            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PermitPassValidityUpsertDto dto)
        {
            var validationError = ValidateDto(dto);
            if (!string.IsNullOrWhiteSpace(validationError))
            {
                return BadRequest(validationError);
            }

            var stateCode = dto.StateCode!.Trim();
            var exists = await _repository.ExistsAsync(stateCode);
            if (exists)
            {
                return BadRequest("Data Already Exist");
            }

            var model = ToEntity(dto);
            var result = await _repository.SaveAsync(model);

            if (!result)
            {
                return BadRequest("Server Error, Try After Some Time");
            }

            return Ok("Record Saved Successfully");
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PermitPassValidityUpsertDto dto)
        {
            var validationError = ValidateDto(dto);
            if (!string.IsNullOrWhiteSpace(validationError))
            {
                return BadRequest(validationError);
            }

            var model = ToEntity(dto);
            var result = await _repository.UpdateAsync(model);

            if (!result)
            {
                return NotFound("Record not found");
            }

            return Ok("Record Updated Successfully");
        }

        [HttpDelete("{stateCode}")]
        public async Task<IActionResult> Delete(string stateCode)
        {
            var result = await _repository.DeleteAsync(stateCode);

            if (!result)
            {
                return NotFound("Record not found");
            }

            return Ok("Record Deleted Successfully");
        }

        private static MstLiquorStateIpValidity ToEntity(PermitPassValidityUpsertDto dto)
        {
            return new MstLiquorStateIpValidity
            {
                StateCode = dto.StateCode!.Trim(),
                DaysIpValidity = (short)dto.DaysIpValidity,
                DaysIpValidityEoIssue = (short)dto.DaysIpValidityEoIssue,
                DaysIpValidityIpRecv = (short)dto.DaysIpValidityIpRecv,
                EoRequired = dto.EoRequired!.Trim().ToUpperInvariant()
            };
        }

        private static string? ValidateDto(PermitPassValidityUpsertDto dto)
        {
            if (dto == null)
            {
                return "Invalid payload";
            }

            if (string.IsNullOrWhiteSpace(dto.StateCode))
            {
                return "Please choose the State Name";
            }

            if (!IsValidDay(dto.DaysIpValidity) || !IsValidDay(dto.DaysIpValidityEoIssue) || !IsValidDay(dto.DaysIpValidityIpRecv))
            {
                return "No of days should not greater than Ninetynine days";
            }

            if (string.IsNullOrWhiteSpace(dto.EoRequired))
            {
                return "EO Required value is required";
            }

            var eoReq = dto.EoRequired.Trim().ToUpperInvariant();
            if (eoReq != "Y" && eoReq != "N")
            {
                return "EO Required value must be Y or N";
            }

            return null;
        }

        private static bool IsValidDay(int value)
        {
            return value >= 0 && value <= 99;
        }
    }
}