using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.License
{
    public class IndividualRepositories : IIndividualRepository
    {
        private readonly ApplicationDbContext _context;

        public IndividualRepositories(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> SaveApplicantSiteDetails(
            LicenseSiteDetails entity)
        {
            var existing = await _context.LicenseSiteDetails
                .FirstOrDefaultAsync(x =>
                    x.ApplicationIdNo == entity.ApplicationIdNo);

            if (existing == null)
            {
                // First save: insert new application site details.
                entity.CreatedDate = DateTime.Now;

                _context.LicenseSiteDetails.Add(entity);
            }
            else
            {
                // Subsequent save: update the existing application.
                existing.Regnumber = entity.Regnumber;
                existing.FinYear = entity.FinYear;
                existing.CatCode = entity.CatCode;

                existing.SiteName = entity.SiteName;
                existing.SiteAddress = entity.SiteAddress;
                existing.SiteAddress2 = entity.SiteAddress2;

                existing.State = entity.State;
                existing.DistrictCode = entity.DistrictCode;
                existing.SubDivisionCode = entity.SubDivisionCode;
                existing.PoliceStationCode = entity.PoliceStationCode;

                existing.SitePin = entity.SitePin;
                existing.SiteAssembly = entity.SiteAssembly;
                existing.SiteWard = entity.SiteWard;

                existing.SiteEmail = entity.SiteEmail;
                existing.SiteMobile = entity.SiteMobile;
                existing.SiteLandline = entity.SiteLandline;
                existing.SiteFax = entity.SiteFax;
                existing.SitePan = entity.SitePan;

                existing.LicenseValidFor = entity.LicenseValidFor;
                existing.IsCommercialActivity =
                    entity.IsCommercialActivity;

                // Preserve CreatedDate when updating.
            }

            await _context.SaveChangesAsync();

            return entity.ApplicationIdNo;
        }

        public async Task<IndividualDTO?> GetSiteDetailsRepo(
            string appId)
        {
            var site = await _context.LicenseSiteDetails
                .AsNoTracking()
                .FirstOrDefaultAsync(x =>
                    x.ApplicationIdNo == appId);

            if (site == null)
            {
                return null;
            }

            return new IndividualDTO
            {
                Regnumber = site.Regnumber,
                ApplicationIdNo = site.ApplicationIdNo,
                FinYear = site.FinYear ?? string.Empty,
                CatCode = site.CatCode ?? string.Empty,

                SiteName = site.SiteName ?? string.Empty,
                SiteAddress = site.SiteAddress ?? string.Empty,
                SiteAddress2 = site.SiteAddress2,

                State = site.State ?? string.Empty,
                DistrictCode = site.DistrictCode ?? string.Empty,
                SubDivisionCode = site.SubDivisionCode ?? string.Empty,
                PoliceStationCode =
                    site.PoliceStationCode ?? string.Empty,

                SitePin = site.SitePin ?? string.Empty,
                SiteAssembly = site.SiteAssembly ?? string.Empty,
                SiteWard = site.SiteWard,

                SiteEmail = site.SiteEmail ?? string.Empty,
                SiteMobile = site.SiteMobile ?? string.Empty,
                SiteLandline = site.SiteLandline,
                SiteFax = site.SiteFax,
                SitePan = site.SitePan,

                LicenseValidFor = site.LicenseValidFor,
                IsCommercialActivity = site.IsCommercialActivity
            };
        }
    }
}