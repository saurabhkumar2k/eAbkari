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
        private readonly ISubDivisionRepository   _SubDivisionRepository;

        private readonly IDistrictRepository   _DistrictRepository;

        private readonly IStateRepository _stateRepository;

         private readonly IPoliceStationRepository _policeStationRepository;

public LGDiretoryController(ISubDivisionRepository subDivisionRepository,IDistrictRepository districtRepository,IStateRepository stateRepository, IPoliceStationRepository policeStationRepository)
{
    _SubDivisionRepository = subDivisionRepository;
    _DistrictRepository = districtRepository;
     _stateRepository = stateRepository;
        _policeStationRepository = policeStationRepository;
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
    
        var data = await _stateRepository.GetStateAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }

        [HttpGet("getSubDivision")]
        public async Task<IActionResult> GetSubDivision(string districtCode)
        { 
       var data = await _SubDivisionRepository.GetSubDivisionAsync(districtCode);

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No SubDivision found" });
        }

        return Ok(data);
    }        
        

           [HttpGet("GetDistrict")]
        public async Task<IActionResult> GetDistrict(string  Statecode)
        {
            var data = await _DistrictRepository.GetDistrictAsync(Statecode);

            if (data == null || !data.Any())
        {
            return NotFound(new { message = "No District found" });
        }
            return Ok(data);
        }


         [HttpGet("getPoliceStation")]
     public async Task<IActionResult> GetPoliceStation(string districtCode)
     {            
         if (string.IsNullOrWhiteSpace(districtCode))
         {
             return BadRequest(new 
             { 
                 message = "District code is required." 
             });
         }
         var data = await _policeStationRepository
             .GetPoliceStationAsync(districtCode);
 
        if (data == null || !data.Any())
         {
             return NotFound(new 
             { 
                 message = "No police stations found for given district code." 
             });
         }            
        return Ok(data);
     }




    }
}