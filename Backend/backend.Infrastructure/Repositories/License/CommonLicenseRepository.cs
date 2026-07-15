using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonLicenseRepository : ICommonLicenseRepository
    {
        private readonly ApplicationDbContext _context;
        public CommonLicenseRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task<string?> GetLastApplicationId()
        {
            return await _context.LicenseApplications
                .OrderByDescending(x => x.ApplicationIdNo)
                .Select(x =>  x.ApplicationIdNo)
                .FirstOrDefaultAsync();
        }

        public async Task<string> SaveApplicantDetails(LicenseApplicationUserDetails userDetails, LicenseApplication application)
        {
            _context.LicenseApplicationUserDetails.Add(userDetails);
            _context.LicenseApplications.Add(application);
            _context.ChangeTracker.Entries();
            await _context.SaveChangesAsync();

            return application.ApplicationIdNo;
        }
    }
}
