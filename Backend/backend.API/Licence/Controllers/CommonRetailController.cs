using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace backend.API.Licence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     public class CommonRetailController : ControllerBase
    {
        private readonly ICommonRetailServices _RetailService;    
        public CommonRetailController(ICommonRetailServices services)
        {
            _RetailService = services;
        }
    }
}