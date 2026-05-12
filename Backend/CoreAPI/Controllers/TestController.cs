using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DOTNETAPI.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestController : ControllerBase
    {
        // GET endpoint for browser testing
        [HttpGet]
        public IActionResult GetTest()
        {
            // 🔴 Breakpoint here
            Debug.WriteLine("GET endpoint hit"); // Optional log
            return Ok("GET HIT");
        }

        // POST endpoint for API testing
        [HttpPost]
        public IActionResult PostTest()
        {
            // 🔴 Breakpoint here
            Debug.WriteLine("POST endpoint hit"); // Optional log
            return Ok("POST HIT");
        }
    }
}
