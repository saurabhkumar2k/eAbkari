using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Repositories.License
{
    public class LicenseApplicationRepository
       : ILicenseApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public LicenseApplicationRepository(
            ApplicationDbContext context)
        {
            _context = context;
        }

        // ---------------------------------------------
        // Get Existing Draft Application
        // ---------------------------------------------
        public async Task<LicenseApplication?>
            GetDraftApplication(
                long regId,
                string catCode)
        {
            return await _context.LicenseApplications
                .FirstOrDefaultAsync(x =>
                    x.RegId == regId &&
                    x.CatCode == catCode &&
                    x.ApplicationStatus == "P");
        }

        // ---------------------------------------------
        // Get Applicant License Details
        // ---------------------------------------------
        public async Task<LicenseApplicationUserDetails?>
            GetLicenseDetails(
                string applicationId)
        {
            return await _context
                .LicenseApplicationUserDetails
                .FirstOrDefaultAsync(x =>
                    x.ApplicationIdNo == applicationId);
        }

        // ---------------------------------------------
        // Get Last Application ID
        // ---------------------------------------------
        public async Task<string?>
            GetLastApplicationId()
        {
            return await _context
                .LicenseApplications
                .OrderByDescending(x => x.Id)
                .Select(x => x.ApplicationIdNo)
                .FirstOrDefaultAsync();
        }

        // ---------------------------------------------
        // Save New Application
        // ---------------------------------------------
        public async Task SaveApplication(
            LicenseApplication application,
            LicenseApplicationUserDetails licenseDetails)
        {
            _context.LicenseApplications.Add(application);

            _context.LicenseApplicationUserDetails
                .Add(licenseDetails);

            await _context.SaveChangesAsync();
        }

        // ---------------------------------------------
        // Save Existing Draft Changes
        // ---------------------------------------------
        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }


        public async Task<string?> GetFinYear()
        {
            return await _context.MstFinancialYear.Where(x => x.ActiveStatus == "Y").Select(x => x.FinYear).FirstOrDefaultAsync();
        }


        public async Task<MstUsReg?> GetApplicantByRegId(long regId)
        {
            return await _context.MstUsReg
                .FirstOrDefaultAsync(x => x.RegId == regId);
        }

        public async Task<string?> GetActiveFinancialYear()
        {
            return await _context.MstFinancialYear
                .Where(x => x.ActiveStatus == "Y")
                .Select(x => x.FinYear)
                .FirstOrDefaultAsync();
        }

        public async Task<WarehouseDetails?> GetWarehouseDetails(
    string applicationIdNo)
        {
            return await _context.WarehouseDetails
                .FirstOrDefaultAsync(x =>
                    x.ApplicationIdNo == applicationIdNo);
        }


        public async Task AddWarehouseDetails(WarehouseDetails warehouse)
        {
            _context.WarehouseDetails.Add(warehouse);
            await Task.CompletedTask;
        }



        public async Task<LicenseCompanyDetails?> GetCompanyDetails(
    string applicationIdNo)
        {
            return await _context.LicenseCompanyDetails
                .FirstOrDefaultAsync(x =>
                    x.ApplicationIdNo == applicationIdNo);
        }

        public async Task AddCompanyDetails(
    LicenseCompanyDetails company)
        {
            _context.LicenseCompanyDetails.Add(company);

            await Task.CompletedTask;
        }

        public async Task<List<ApplicantLicensePartnersDetails>>
    GetCompanyPartners(string applicationIdNo)
        {
            return await _context
                .ApplicantLicensePartnersDetails
                .Where(x =>
                    x.ApplicationIdNo == applicationIdNo)
                .ToListAsync();
        }


        public async Task AddCompanyPartner(
    ApplicantLicensePartnersDetails partner)
        {
            _context.ApplicantLicensePartnersDetails
                .Add(partner);

            await Task.CompletedTask;
        }


        public async Task<string> SaveCompanyDocument(
    IFormFile file)
        {
            var fileName =
                Guid.NewGuid().ToString() +
                Path.GetExtension(file.FileName);

            var folder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Documents",
                "LicenseCompanyDocuments");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var filePath = Path.Combine(
                folder,
                fileName);

            using var stream =
                new FileStream(
                    filePath,
                    FileMode.Create);

            await file.CopyToAsync(stream);

            return fileName;
        }

        public async Task<LicenseApplicationUploadedDocument?>
          GetApplicationDocument(
              string applicationIdNo,
              string docId)
        {
            return await _context
                .LicenseApplicationUploadedDocument
                .FirstOrDefaultAsync(x =>
                    x.ApplicationIdNo == applicationIdNo &&
                    x.DocId == docId);
        }

        public async Task AddApplicationDocument(
    LicenseApplicationUploadedDocument document)
        {
            _context
                .LicenseApplicationUploadedDocument
                .Add(document);

            await Task.CompletedTask;
        }

        public async Task<string?> SaveApplicationDocumentFile(
    IFormFile file)
        {
            if (file == null)
                return null;

            var fileName =
                Guid.NewGuid().ToString()
                + Path.GetExtension(file.FileName);

            var folder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Documents",
                "ApplicationDocuments");

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            var filePath =
                Path.Combine(folder, fileName);

            using var stream =
                new FileStream(
                    filePath,
                    FileMode.Create);

            await file.CopyToAsync(stream);

            return fileName;
        }

        //public async Task SaveChanges()
        //{
        //    await _context.SaveChangesAsync();
        //}
        public async Task AddLicenseSiteDetails(LicenseSiteDetails siteDetails)
        {
            await _context.LicenseSiteDetails.AddAsync(siteDetails);
            await _context.SaveChangesAsync();
        }

        public async Task<string?> GetFlowUpto(string CatCode, string ActivityId)
        {
            return await _context.MstFlowApplicable.Where(x => x.ActivityId == ActivityId && x.LicenseCategory == CatCode).Select(x => x.FlowUptoCode).FirstOrDefaultAsync();
        }

    }
}
