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

        public async Task<LicenseSiteDetailsDto?> GetSiteDetailsRepo(string AppId)
        {
            var site = await _context.LicenseSiteDetails.FirstOrDefaultAsync(x => x.ApplicationIdNo == AppId);

            if (site == null)
            {
                return null;
            }

            var dto = new LicenseSiteDetailsDto
            {
                
                Regnumber = site.Regnumber,
                ApplicationIdNo = site.ApplicationIdNo,
                FinYear = site.FinYear,
                CatCode = site.CatCode,
                SiteName = site.SiteName,
                SiteAddress = site.SiteAddress,
                SiteAddress2 = site.SiteAddress2,
                State = site.State,
                DistrictCode = site.DistrictCode,
                SubDivisionCode = site.SubDivisionCode,
                PoliceStationCode = site.PoliceStationCode,
                SitePin = site.SitePin,
                SiteAssembly = site.SiteAssembly,
                SiteWard = site.SiteWard,
                SiteEmail = site.SiteEmail,
                SiteMobile = site.SiteMobile,
                SiteLandline = site.SiteLandline,
                SiteFax = site.SiteFax,
                SitePan = site.SitePan
            };

            return dto;
        }
    }
}