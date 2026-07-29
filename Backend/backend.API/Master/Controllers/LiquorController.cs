using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;
using backend.Infrastructure.Repositories;
using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.API.Controllers
{

[Route("api/[controller]")]
[ApiController]
public class LiquorMasterController : ControllerBase
{
 
private readonly ILiquorMasterRepository _LiquorMasterRepository;

// private readonly ILiquorCategoryRepository _liquorCategoryRepository;

// private readonly ILiquorTypeRepository _liquorTypeRepository;
// private readonly ILiquorMeasureRepository _liquorMeasureRepository;

public LiquorMasterController(ILiquorMasterRepository liquorKindRepository

    // ILiquorCategoryRepository liquorCategoryRepository,
   
    // ILiquorTypeRepository liquorTypeRepository,
    // ILiquorMeasureRepository liquorMeasureRepository
)
{
 _LiquorMasterRepository = liquorKindRepository;



    // _liquorCategoryRepository = liquorCategoryRepository;
   
    // _liquorTypeRepository = liquorTypeRepository;
    // _liquorMeasureRepository = liquorMeasureRepository;
}





[HttpGet("kind")]
  public async Task<IActionResult> GetKind()
  {
    
        var data = await _LiquorMasterRepository.GetLiquorKindAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }

[HttpGet("Category")]
  public async Task<IActionResult> GetCategory()
  {
    
        var data = await _LiquorMasterRepository.GetLiquorCategoryAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }


   
[HttpGet("LiquorBottler")]
  public async Task<IActionResult> GetLiquorBottler()
  {
    
        var data = await _LiquorMasterRepository.GetLiquorBottlerAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }

   
   [HttpGet("LicenseeCategory")]
  public async Task<IActionResult> GetLicenseeCategory()
  {
    
        var data = await _LiquorMasterRepository.GetLicenseeCategoryAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }

        [HttpGet("GetWholesaleLicenseeCategory")]
        public async Task<IActionResult> GetWholesaleLicenseeCategory()
        {
            var data = await _LiquorMasterRepository.GetWholesaleLicenseeCategoryAsync();

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No wholesale license category found" });
            }

            return Ok(data);
        }

        [HttpGet("GetHCRLicenseeCategory")]
        public async Task<IActionResult> GetHCRLicenseeCategory()
        {
            var data = await _LiquorMasterRepository.GetHCRLicenseeCategoryAsync();

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "No HCR license category found" });
            }

            return Ok(data);
        }






        [HttpGet("LiquorMeasure")]
  public async Task<IActionResult> GetLiquorMeasure()
  {
    
        var data = await _LiquorMasterRepository.GetLiquorMeasureAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }
   

   [HttpGet("LiquorType")]
  public async Task<IActionResult> GetLiquorType()
  {
    
        var data = await _LiquorMasterRepository.GetLiquorTypeAsync();

        if (data == null || !data.Any())
        {
            return NotFound(new { message = "No state data found" });
        }

        return Ok(data);

  }






  
    
}

}