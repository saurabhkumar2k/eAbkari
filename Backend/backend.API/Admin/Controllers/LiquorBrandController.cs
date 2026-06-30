using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;
using backend.Core.Entities;

namespace backend.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LiquorBrandController : ControllerBase
{
    private readonly ILiquorBrandRepository _repository;

    public LiquorBrandController(
        ILiquorBrandRepository repository)
    {
        _repository = repository;
    }

    // Category Dropdown
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var data = await _repository.GetCategoriesAsync();
        return Ok(data);
    }

    // Kind Dropdown
    [HttpGet("kinds/{catCode}")]
    public async Task<IActionResult> GetKinds(string catCode)
    {
        var data = await _repository.GetKindsAsync(catCode);
        return Ok(data);
    }

    // Type Dropdown
    [HttpGet("types/{catCode}/{kindCode}")]
    public async Task<IActionResult> GetTypes(
        string catCode,
        string kindCode)
    {
        var data = await _repository.GetTypesAsync(
            catCode,
            kindCode);

        return Ok(data);
    }

    // Brand Grid
    [HttpGet]
    public async Task<IActionResult> GetBrands()
    {
        var data = await _repository.GetBrandsAsync();
        return Ok(data);
    }

    // Save Brand
    [HttpPost]
    public async Task<IActionResult> SaveBrand(
        CreateLiquorBrandDto dto)
    {
        var brand = await _repository.SaveBrandAsync(dto);
        return Ok(brand);
    }

    // Update Brand
    [HttpPut]
    public async Task<IActionResult> UpdateBrand(
        MstLiquorBrand model)
    {
        var result = await _repository.UpdateBrandAsync(model);

        if (!result)
            return NotFound();

        return Ok(new
        {
            message = "Brand updated successfully"
        });
    }

    // Delete Brand
    [HttpDelete]
    public async Task<IActionResult> DeleteBrand(
        string catCode,
        string kindCode,
        string typeCode,
        string brandCode)
    {
        var result = await _repository.DeleteBrandAsync(
            catCode,
            kindCode,
            typeCode,
            brandCode);

        if (!result)
            return NotFound();

        return Ok(new
        {
            message = "Brand deleted successfully"
        });
    }

    // Liquor Measure Dropdown
   [HttpGet("LiquorMeasure/{catCode}/{kindCode}/{typeCode}")]
public async Task<IActionResult> GetLiquorMeasure(string catCode,string kindCode,string typeCode)
{
    var data = await _repository.GetLiquorMeasureAsync(
        catCode,
        kindCode,
        typeCode);

    if (data == null || !data.Any())
    {
        return NotFound(new
        {
            message = "No liquor measure data found"
        });
    }

    return Ok(data);
}
}