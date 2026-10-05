using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Interfaces.License
{
  
        public interface ILicenseApplicationServices
        {
            Task<string> ApplyLicense(
                LicenseApplicationUserDetailsDto dto,
                string? ipAddress);

        Task<MstUsReg?> GetApplicantByRegId(long regId);


        Task<string> SaveWarehouseLicense(WarehouseDetailsDto dto);

        Task<string> SaveCompanyDetails(LicenseCompanyDetailsDto dto);

        Task UploadApplicationDocuments(
    ApplicationDocumentUploadDto dto);

        //Task AddLicenseSiteDetails(LicenseSiteDetails siteDetails);


        //    Task<LicenseCompanyDetails?> GetCompanyDetails(
        //string applicationIdNo);

        //Task AddCompanyDetails(
        //    LicenseCompanyDetails company);

        //Task<List<ApplicantLicensePartnersDetails>> GetCompanyPartners(
        //    string applicationIdNo);

        //Task AddCompanyPartner(
        //    ApplicantLicensePartnersDetails partner);

        //Task<string> SaveCompanyDocument(
        //    IFormFile file);

        // Task SaveChanges();




    }
    }

