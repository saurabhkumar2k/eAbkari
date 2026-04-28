using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreAPI.Data;
using CoreAPI.DTOs;
using Microsoft.Data.SqlClient;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("liquor-categories")]
        public async Task<IActionResult> GetLiquorCategories()
        {
            var categories = new List<LiquorCategoryDto>();

            using (var connection = _context.Database.GetDbConnection())
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "select Liquor_Cat_code,Liquor_Cat_Desc as Category from MM_Liquor_Category order by Category";
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            categories.Add(new LiquorCategoryDto
                            {
                                LiquorCatCode = reader.GetString(0),
                                Category = reader.GetString(1).Trim()
                            });
                        }
                    }
                }
            }

            return Ok(categories);
        }
    }
}