using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonHCRRepositories : ICommonHCRRepository
    {
        private readonly ApplicationDbContext _context;

        public CommonHCRRepositories(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> SaveApplicantSiteDetails(LicenseSiteDetails dto)
        {                                                   
            _context.LicenseSiteDetails.Add(dto);          
            _context.ChangeTracker.Entries();
            await _context.SaveChangesAsync();

            return dto.ApplicationIdNo;
           
        }
    }
}