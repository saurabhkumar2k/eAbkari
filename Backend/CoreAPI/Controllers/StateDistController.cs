using Microsoft.AspNetCore.Mvc;
using DOTNETAPI.Models;
using DOTNETAPI.Data;
using System.Linq;

using DOTNETAPI.Data;



namespace DOTNETAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateDistController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StateDistController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("States")]
        public IActionResult GetStates()
        {
            var states = _context.States
                .Where(s => s.EntType != "D")
                .Select(s => new { id = s.StateCode, name = s.StateName })
                .OrderBy(s => s.name)
                .ToList();

            return Ok(states);
        }

        [HttpGet("Districts/{stateCode}")]
        public IActionResult GetDistricts(string stateCode)
        {
            var districts = _context.Districts
                .Where(d => d.EntType != "D" && d.StateCode == stateCode)
                .Select(d => new { id = d.DistCode, name = d.DistName })
                .OrderBy(d => d.name)
                .ToList();

            return Ok(districts);
        }










        // // Get SubDivisions by district code
        [HttpGet("SubDivisions/{district_code}")]
        public IActionResult GetSubDivisions(string district_code)
        {
            var subdivisions = _context.SiteSubdivisions
                .Where(s => s.district_code == district_code && s.delete_status == "N")
                .Select(s => new { id = s.sd_code, name = s.sd_name }) // ✅ use correct property names
                .OrderBy(s => s.name)
                .ToList();

            return Ok(subdivisions);
        }


        // ✅ POLICE STATION
        [HttpGet("PoliceStations/{district_code}")]
        public IActionResult GetPoliceStations(string district_code)
        {
            var stations = _context.SitePoliceStation
                .Where(p => p.district_code == district_code)
                .Select(p => new
                {
                    id = p.ps_code,
                    name = p.ps_name
                })
                .Distinct()
                .OrderBy(p => p.name)
                .ToList();

            return Ok(stations);
        }




    }
}
