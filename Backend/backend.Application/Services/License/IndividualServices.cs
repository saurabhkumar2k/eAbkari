using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;

namespace backend.Application.Services.License
{
    public class IndividualServices : IIndividualServices
    {
        private readonly IIndividualRepository _repository;

        public IndividualServices(IIndividualRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> SaveApplicantSiteDetails(
            IndividualDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ApplicationIdNo))
            {
                throw new ArgumentException(
                    "ApplicationIdNo is required.");
            }

            if (string.IsNullOrWhiteSpace(dto.LicenseValidFor) ||
                (dto.LicenseValidFor != "3" &&
                 dto.LicenseValidFor != "5"))
            {
                throw new ArgumentException(
                    "Licence duration must be 3 or 5 years.");
            }

           

            // Expected format: 2026-2027
            var financialYearParts = dto.FinYear.Split('-');

            if (financialYearParts.Length != 2 ||
                !int.TryParse(
                    financialYearParts[0], out var startYear) ||
                !int.TryParse(
                    financialYearParts[1], out var endYear) ||
                endYear != startYear + 1)
            {
                // throw new ArgumentException(
                //     "Financial year must be in format YYYY-YYYY, " +
                //     "e.g. 2026-2027.");
            }

            var commercialActivity =
                string.IsNullOrWhiteSpace(dto.IsCommercialActivity)
                    ? null
                    : dto.IsCommercialActivity
                        .Trim()
                        .ToUpperInvariant();

            if (commercialActivity != null &&
                commercialActivity != "Y" &&
                commercialActivity != "N")
            {
                throw new ArgumentException(
                    "Commercial activity must be Y or N.");
            }

            var entity = new LicenseSiteDetails
            {
                Regnumber = dto.Regnumber,
                ApplicationIdNo = dto.ApplicationIdNo,
                FinYear = dto.FinYear,
                CatCode = dto.CatCode,

                SiteName = dto.SiteName,
                SiteAddress = dto.SiteAddress,
                SiteAddress2 = dto.SiteAddress2,

                State = dto.State,
                DistrictCode = dto.DistrictCode,
                SubDivisionCode = dto.SubDivisionCode,
                PoliceStationCode = dto.PoliceStationCode,

                SitePin = dto.SitePin,
                SiteAssembly = dto.SiteAssembly,
                SiteWard = dto.SiteWard,

                SiteEmail = dto.SiteEmail,
                SiteMobile = dto.SiteMobile,
                SiteLandline = dto.SiteLandline,
                SiteFax = dto.SiteFax,
                SitePan = dto.SitePan,

                LicenseValidFor = dto.LicenseValidFor,
                IsCommercialActivity = commercialActivity
            };

            return await _repository
                .SaveApplicantSiteDetails(entity);
        }

        public async Task<IndividualDTO?> GetSiteDetails(string appId)
        {
            if (string.IsNullOrWhiteSpace(appId))
            {
                throw new ArgumentException(
                    "Application ID is required.");
            }

            return await _repository.GetSiteDetailsRepo(appId);
        }
    }
}