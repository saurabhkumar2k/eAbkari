using backend.Core.Entities.Licence;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Interfaces.License
{
    
        public interface ILicenseApplicationRepository
        {
            Task<LicenseApplication?> GetDraftApplication(
                long regId,
                string catCode);

            Task<LicenseApplicationUserDetails?> GetLicenseDetails(
                string applicationId);

            Task<string?> GetLastApplicationId();

            Task SaveApplication(
                LicenseApplication application,
                LicenseApplicationUserDetails licenseDetails);

            Task SaveChanges();

        Task<string?> GetFinYear();

        Task<MstUsReg?> GetApplicantByRegId(long regId);

        Task<string?> GetActiveFinancialYear();

        Task<WarehouseDetails?> GetWarehouseDetails(
            string applicationIdNo);

        Task AddWarehouseDetails(  WarehouseDetails warehouse);

        Task<LicenseCompanyDetails?> GetCompanyDetails(
      string applicationIdNo);

        Task AddCompanyDetails(
            LicenseCompanyDetails company);

        Task<List<ApplicantLicensePartnersDetails>> GetCompanyPartners(
            string applicationIdNo);

        Task AddCompanyPartner(
            ApplicantLicensePartnersDetails partner);

        Task<string> SaveCompanyDocument(
           IFormFile file,
           string appId,
           string documentType,
           int? partnerIndex = null);

       // Task<LicenseApplicationUploadedDocument?>
       //GetApplicationDocument(
       //    string applicationIdNo,
       //    string docId);


        Task<List<LicenseApplicationUploadedDocument>>
    GetApplicationDocumentsByApplicationId(string applicationIdNo);

        Task<string?> SaveApplicationDocumentFile(
    IFormFile file,
    string fileName);

        Task AddApplicationDocument(
            LicenseApplicationUploadedDocument document);

        //Task<string?> SaveApplicationDocumentFile(
        //    IFormFile file);
        Task AddLicenseSiteDetails(LicenseSiteDetails siteDetails);

        Task<string?> GetFlowUpto(string CatCode, string ActivityId);




    }
    
}
