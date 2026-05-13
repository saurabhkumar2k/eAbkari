using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using backend.Infrastructure.Repositories;
using backend.Core.Entities;

namespace backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LGDiretoryController : ControllerBase
    {
        // private readonly ISubDivisionRepository   _SubDivisionRepository;

        // private readonly IDistrictRepository   _DistrictRepository;

        // private readonly IStateRepository _stateRepository;


        // private readonly IUserQuesRepository _userQuestionRepository;


private readonly ILGDiretoryRepository _LiquorMasterRepository;



public LGDiretoryController(ILGDiretoryRepository  lGDiretoryRepository)
{
    _LiquorMasterRepository = lGDiretoryRepository;
}


        // [HttpGet("getState")]
        // public async Task<IActionResult> GetState()
        // {
        //     var data = await _stateRepository.GetStateAsync();
        //     return Ok(data);
        // }

[HttpGet("getState")]
  public async Task<IActionResult> GetState()
  {
    
        var data = await _LiquorMasterRepository.GetStateAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }

        [HttpGet("getSubDivision")]
        public async Task<IActionResult> GetSubDivision(string districtCode)
        { 
       var data = await _LiquorMasterRepository.GetSubDivisionAsync(districtCode);

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No SubDivision found" });
        }

        return Ok(data);
    }        
        

           [HttpGet("GetDistrict")]
        public async Task<IActionResult> GetDistrict(string  Statecode)
        {
            var data = await _LiquorMasterRepository.GetDistrictAsync(Statecode);

            if (data == null || !data.Any())
        {
            return NotFound(new { message = "No District found" });
        }
            return Ok(data);
        }

        [HttpGet("Question")]
        public async Task<IActionResult> GetQuestions()
        {
            var data = await _LiquorMasterRepository.GetQuestionsAsync();
            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No Questions found" });
            }
            return Ok(data);
        }

    }
}