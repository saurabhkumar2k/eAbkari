using Microsoft.AspNetCore.Mvc;
using DOTNETAPI.Data;
using DOTNETAPI.Models;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DOTNETAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DOTNETAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LicenseDocumentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LicenseDocumentController(ApplicationDbContext context)
        {
            _context = context;
        }




        [HttpGet("documents")]
        public async Task<IActionResult> GetDocuments()
        {
            var documents = await _context.ApplicationLicenseDocumentMasters
                .Where(x => x.DocStatus == "C" && x.DeleteStatus == "N")
                .OrderBy(x => x.DocId)
                .Select(x => new DocumentDto
                {
                    DocId = x.DocId,                           // string now, matches DB
                    DocDesc = x.DocDesc
    .Replace("<br>", "")
    .Replace("<br/>", "")
    .Replace("<br />", "")
    .Trim(),

                    Key = x.DocDesc.ToLower().Replace(" ", ""),
                    IsMandatory = x.IsValid
                })
                .ToListAsync();

            return Ok(documents);
        }



        [HttpGet("test")]
        public IActionResult Test() => Ok("LicenseDocument API works!");



    }

}
