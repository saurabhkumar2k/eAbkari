using Microsoft.AspNetCore.Mvc;


using System.Collections.Generic;
using System;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using backend.Infrastructure.Data;

namespace backend.API.Controllers
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
        public async Task<IActionResult> GetDocuments(string applicationIdNo, string catCode,string docStatus)
        {
            var documents = await (
                from a in _context.MstLicenseApplicationDocument
                join b in _context.LicenseApplicationCategoryDocument
                    on a.DocId equals b.DocId

                where a.DocStatus == docStatus
                   && a.DeleteStatus == "N"
                   && b.LicenseeCatCode == catCode
                   && b.ActiveStatus == "Y"
                   && (b.LicenseeTypeFlag == "A" || b.LicenseeTypeFlag == "I")

                join c in _context.LicenseApplicationUploadedDocument
                     //.Where(x => x.ApplicationIdNo == applicationIdNo &&
                     //            x.MobileNoReleaseStatus == "N")
                     .Where(x => x.ApplicationIdNo == applicationIdNo )
                               
                    on a.DocId equals c.DocId into gj

                from c in gj.DefaultIfEmpty()

                orderby (Convert.ToInt32(a.DocId) == 186 ? 999 : 1),
                        Convert.ToInt32(a.DocId)

                select new DocumentDto
                {
                    DocId = a.DocId,
                    DocDesc = a.DocDesc,
                    DocUrl = c != null ? c.DocUrl : "",
                    DocAppl = c != null && c.DocStatus == "N" ? "Yes" : "No",
                    DocSl = c != null ? c.DocSl : null,
                    SDate = c == null
                                ? "View"
                                : (c.SubmitDate == null
                                    ? "View"
                                    : "Submitted on : " + c.SubmitDate.Value.ToString("dd/MM/yyyy")),
                    IsMandatory = b.IsMandatory
                }).ToListAsync();

            return Ok(documents);

        }


        [HttpGet("test")]
        public IActionResult Test() => Ok("LicenseDocument API works!");



    }

}
