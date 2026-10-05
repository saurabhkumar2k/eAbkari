using backend.Application.Interfaces.License;
using backend.Core.DTOs;
using backend.Core.Interfaces.License;
using backend.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.Entities.Licence;
using backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Services.License
{
        public class LicenseApplicationServices : ILicenseApplicationServices
        {
            private readonly ILicenseApplicationRepository _repository;
           

            public LicenseApplicationServices(
                ILicenseApplicationRepository repository  )
            {
                _repository = repository;
               
            }

            public async Task<string> ApplyLicense(
                LicenseApplicationUserDetailsDto dto,
                string? ipAddress)
            {
                // -------------------------------------------------
                // 1. Check Existing Draft
                // -------------------------------------------------

                var existingApplication =
                    await _repository.GetDraftApplication(
                        dto.RegId,
                        dto.CatCode);

                string applicationId;

                // -------------------------------------------------
                // 2. If Draft Already Exists
                // -------------------------------------------------

                if (existingApplication != null)
                {
                    applicationId =
                        existingApplication.ApplicationIdNo;

                    var licenseDetails =
                        await _repository.GetLicenseDetails(
                            applicationId);

                    if (licenseDetails != null)
                    {
                        licenseDetails.ApplicantName =
                            dto.ApplicantName;

                        licenseDetails.DateOfBirth =
                            dto.Dob;

                        licenseDetails.FatherHusbandName =
                            dto.FatherHusbandName ?? "";

                        licenseDetails.Occupation =
                            dto.Occupation ?? "";

                        licenseDetails.PanNo =
                            dto.PanNo ?? "";

                        licenseDetails.PresentAddress =
                            dto.PresentAddress ?? "";

                        licenseDetails.PermanentAddress =
                            dto.PermanentAddress ?? "";

                        licenseDetails.StateUT =
                            dto.StateUT ?? "";

                        licenseDetails.District =
                            dto.District ?? "";

                        licenseDetails.SubDivision =
                            dto.SubDivision ?? "";

                        licenseDetails.PIN =
                            dto.PIN ?? "";

                        licenseDetails.Email =
                            dto.Email ?? "";

                        licenseDetails.Mobile =
                            dto.Mobile ?? "";

                        licenseDetails.LandLine =
                            dto.LandLine ?? "";
                    }

                    existingApplication.LicenseType =
                        dto.OwnerType;

                    await _repository.SaveChanges();

                    return applicationId;
                }

                // -------------------------------------------------
                // 3. Generate New Application ID
                // -------------------------------------------------

                string? lastAppId =
                    await _repository.GetLastApplicationId();

                // Get Financial Year
                var finYear =
                    await _repository.GetFinYear();

                if (string.IsNullOrWhiteSpace(finYear))
                {
                    throw new Exception(
                        "Financial Year is not available.");
                }

                // Example:
                // 2026-27 → 26
                string activeYear =
                    finYear.Substring(2, 2);

                // Example:
                // CatCode = L1
                // REF + L1 + 26
                // REFL126
                string prefix =
                    $"REF{dto.CatCode}{activeYear}";

                int sequence = 1;

                // -------------------------------------------------
                // 4. Get Next Sequence
                // -------------------------------------------------

                if (!string.IsNullOrWhiteSpace(lastAppId))
                {
                    string lastFive =
                        lastAppId.Substring(
                            lastAppId.Length - 5);

                    if (int.TryParse(
                        lastFive,
                        out int lastSequence))
                    {
                        sequence =
                            lastSequence + 1;
                    }
                }

                applicationId =
                    $"{prefix}{sequence:00000}";



            var ApplicationFlowUpto =
                    await _repository.GetFlowUpto(
                        dto.CatCode,
                        dto.ActivityId);



            // -------------------------------------------------
            // 5. Create Applicant Details
            // -------------------------------------------------

            var licenseDetailsNew =
                    new LicenseApplicationUserDetails
                    {
                        RegId = dto.RegId,

                        ApplicantName =
                            dto.ApplicantName,

                        ApplicationIdNo =
                            applicationId,

                        DateOfBirth =
                            dto.Dob,

                        FatherHusbandName =
                            dto.FatherHusbandName ?? "",

                        Occupation =
                            dto.Occupation ?? "",

                        PanNo =
                            dto.PanNo ?? "",

                        PresentAddress =
                            dto.PresentAddress ?? "",

                        PermanentAddress =
                            dto.PermanentAddress ?? "",

                        StateUT =
                            dto.StateUT ?? "",

                        District =
                            dto.District ?? "",

                        SubDivision =
                            dto.SubDivision ?? "",

                        PIN =
                            dto.PIN ?? "",

                        Email =
                            dto.Email ?? "",

                        Mobile =
                            dto.Mobile ?? "",

                        LandLine =
                            dto.LandLine ?? ""
                    };

                // -------------------------------------------------
                // 6. Create License Application
                // -------------------------------------------------

                var application =
                    new LicenseApplication
                    {
                        IPAddress =
                            ipAddress,

                        RegId =
                            dto.RegId,

                        ApplicationIdNo =
                            applicationId,

                        ApplicationDate =
                            DateTime.Now,

                        FinYear =
                            finYear,

                        CatCode =
                            dto.CatCode,

                        LicenseType =
                            dto.OwnerType,

                        IsApplicationCompleted =
                            "N",

                        ApplicationFlag =
                            "A",

                        ApplicationStatus =
                            "01",

                        IsLicenseGenerated =
                            "N",

                        IsApproveYN =
                            "N",

                      FlowUptoCode = ApplicationFlowUpto
                    };

                // -------------------------------------------------
                // 7. Save Through Repository
                // -------------------------------------------------

                await _repository.SaveApplication(
                    application,
                    licenseDetailsNew);

                // -------------------------------------------------
                // 8. Return Application ID
                // -------------------------------------------------

                return applicationId;
            }




        public async Task<MstUsReg?> GetApplicantByRegId(long regId)
        {
            return await _repository.GetApplicantByRegId(regId);
        }


        public async Task<string> SaveWarehouseLicense(WarehouseDetailsDto dto)
        {
            // -----------------------------------------
            // 1. Get Active Financial Year
            // -----------------------------------------

            var finYear =
                await _repository.GetActiveFinancialYear();

            // -----------------------------------------
            // 2. Check Existing Warehouse Details
            // -----------------------------------------

            var warehouse =
                await _repository.GetWarehouseDetails(
                    dto.ApplicationIdNo);

            // -----------------------------------------
            // 3. INSERT
            // -----------------------------------------

            if (warehouse == null)
            {
                warehouse = new WarehouseDetails
                {
                    RegId = dto.RegId,
                    CatCode = dto.CatCode,
                    FinYear = finYear,
                    ApplicationIdNo = dto.ApplicationIdNo,

                    WarehouseName =
                        dto.WarehouseName,

                    WarehouseAddress1 =
                        dto.WarehouseAddress1,

                    WarehouseAddress2 =
                        dto.WarehouseAddress2,

                    WarehouseState =
                        dto.WarehouseState,

                    WarehouseDistrict =
                        dto.WarehouseDistrict,

                    WarehousePin =
                        dto.WarehousePin,

                    WarehouseMobile =
                        dto.WarehouseMobile,

                    WarehouseEmail =
                        dto.WarehouseEmail,

                    WarehouseSubDivision =
                        dto.WarehouseSubDivision,

                    WarehousePoliceStation =
                        dto.WarehousePoliceStation,

                    LeaseRegistration =
                        dto.LeaseRegistration,

                    LeasePremise =
                        dto.LeasePremise,

                    LeaseRegistrationDate =
                        dto.LeaseRegistrationDate,

                    LeaseRegistrationExpiryDate =
                        dto.LeaseRegistrationExpiryDate,

                    ArchitectRegistrationNo =
                        dto.ArchitectRegistrationNo,

                    ArchitectRegistrationNoValidUpto =
                        dto.ArchitectRegistrationNoValidUpto,

                    SuperAreaofLicensePremise =
                        dto.SuperAreaofLicensePremise,

                    CarpetAreaofLicensePremise =
                        dto.CarpetAreaofLicensePremise,

                    DistanceofDistilleryCP =
                        dto.DistanceofDistilleryCP,

                    HoursofSale =
                        dto.HoursofSale,

                    CreatedDateAt =
                        DateTime.Now
                };

                await _repository.AddWarehouseDetails(
                    warehouse);


                // 2. Site Details
                var siteDetails = new LicenseSiteDetails
                {
                    Regnumber = Convert.ToString( dto.RegId),
                    ApplicationIdNo = dto.ApplicationIdNo,
                    FinYear = finYear,
                    CatCode = dto.CatCode,

                    SiteName = dto.WarehouseName,
                    SiteAddress = dto.WarehouseAddress1,
                    SiteAddress2 = dto.WarehouseAddress2,

                    State = dto.WarehouseState,
                    DistrictCode = dto.WarehouseDistrict,
                    SubDivisionCode = dto.WarehouseSubDivision,
                    PoliceStationCode = dto.WarehousePoliceStation,

                    SitePin = dto.WarehousePin,
                    SiteEmail = dto.WarehouseEmail,
                    SiteMobile = dto.WarehouseMobile,

                    // agar Warehouse DTO me ye fields hain
                    //SiteLandline = dto.SiteLandline,
                    //SiteFax = dto.SiteFax,
                    //SitePan = dto.SitePan
                };

                await _repository.AddLicenseSiteDetails(siteDetails);


            }
            else
            {
                // -----------------------------------------
                // 4. UPDATE
                // -----------------------------------------

                warehouse.RegId =
                    dto.RegId;

                warehouse.CatCode =
                    dto.CatCode;

                warehouse.FinYear =
                    finYear;

                warehouse.WarehouseName =
                    dto.WarehouseName;

                warehouse.WarehouseAddress1 =
                    dto.WarehouseAddress1;

                warehouse.WarehouseAddress2 =
                    dto.WarehouseAddress2;

                warehouse.WarehouseState =
                    dto.WarehouseState;

                warehouse.WarehouseDistrict =
                    dto.WarehouseDistrict;

                warehouse.WarehousePin =
                    dto.WarehousePin;

                warehouse.WarehouseMobile =
                    dto.WarehouseMobile;

                warehouse.WarehouseEmail =
                    dto.WarehouseEmail;

                warehouse.WarehouseSubDivision =
                    dto.WarehouseSubDivision;

                warehouse.WarehousePoliceStation =
                    dto.WarehousePoliceStation;

                warehouse.LeaseRegistration =
                    dto.LeaseRegistration;

                warehouse.LeasePremise =
                    dto.LeasePremise;

                warehouse.LeaseRegistrationDate =
                    dto.LeaseRegistrationDate;

                warehouse.LeaseRegistrationExpiryDate =
                    dto.LeaseRegistrationExpiryDate;

                warehouse.ArchitectRegistrationNo =
                    dto.ArchitectRegistrationNo;

                warehouse.ArchitectRegistrationNoValidUpto =
                    dto.ArchitectRegistrationNoValidUpto;

                warehouse.SuperAreaofLicensePremise =
                    dto.SuperAreaofLicensePremise;

                warehouse.CarpetAreaofLicensePremise =
                    dto.CarpetAreaofLicensePremise;

                warehouse.DistanceofDistilleryCP =
                    dto.DistanceofDistilleryCP;

                warehouse.HoursofSale =
                    dto.HoursofSale;

                // CreatedDateAt ko change nahi karenge
            }

            // -----------------------------------------
            // 5. Save
            // -----------------------------------------

            await _repository.SaveChanges();

            return dto.ApplicationIdNo;
        }



        public async Task<string> SaveCompanyDetails(LicenseCompanyDetailsDto dto)
        {
            var company = await _repository
                .GetCompanyDetails(dto.ApplicationIdNo);

            if (company == null)
            {
                company = new LicenseCompanyDetails
                {
                    ApplicationIdNo = dto.ApplicationIdNo
                };

                await _repository.AddCompanyDetails(company);
            }

            // -----------------------------
            // COMPANY DETAILS
            // -----------------------------

            company.RegistrationNo = dto.RegistrationNo;
            company.CompanyName = dto.CompanyName;
            company.ConstitutionType = dto.ConstitutionType;
            company.RegDate = dto.RegDate;
            company.CompanyPAN = dto.CompanyPAN;
            company.VATNO = dto.VATNO;
            company.CINNO = dto.CINNO;

            // -----------------------------
            // EXCISE NOMINEE
            // -----------------------------

            company.IsExciseNominee = dto.IsExciseNominee;
            company.ExciseNomineeName = dto.ExciseNomineeName;
            company.ExciseNomineeAddress = dto.ExciseNomineeAddress;
            company.ExciseNomineeEmailID = dto.ExciseNomineeEmailID;
            company.ExciseNomineeMobileNo = dto.ExciseNomineeMobileNo;
            company.ExciseNomineePAN = dto.ExciseNomineePAN;

            // -----------------------------
            // EXCISE NOMINEE PAN IMAGE
            // -----------------------------

            if (dto.ExciseNomineePanImage != null)
            {
                company.ExciseNomineePanImage =
                    await _repository.SaveCompanyDocument(
                        dto.ExciseNomineePanImage);
            }

            // -----------------------------
            // FSSAI
            // -----------------------------

            company.FSSAILicenceNo =
                dto.FSSAILicenceNo;

            company.FSSAILicenceStartDate =
                dto.FSSAILicenceStartDate;

            company.FSSAILicenceEndDate =
                dto.FSSAILicenceEndDate;

            // -----------------------------
            // VAT / GST
            // -----------------------------

            company.VATGSTCertNo =
                dto.VATGSTCertNo;

            company.VATGSTCertEnddate =
                dto.VATGSTCertEnddate;

            // -----------------------------
            // DISTILLERY
            // -----------------------------

            company.DistilleryLicNo =
                dto.DistilleryLicNo;

            company.DistilleryLicEnddate =
                dto.DistilleryLicEnddate;

            // -----------------------------
            // BWH
            // -----------------------------

            company.BWHInsuranceEndDate =
                dto.BWHInsuranceEndDate;

            company.BWHRentAgreementEndDate =
                dto.BWHRentAgreementEndDate;

            company.BWHLeaseRentAgreementNo =
                dto.BWHLeaseRentAgreementNo;

            company.BWHInsuranceNo =
                dto.BWHInsuranceNo;

            // -----------------------------
            // DIRECTORS / PARTNERS
            // -----------------------------

            var existingPartners =
                await _repository.GetCompanyPartners(
                    dto.ApplicationIdNo);

            foreach (var director in dto.CompanyPartnersDetails)
            {
                ApplicantLicensePartnersDetails? partnerEntity = null;

                if (!string.IsNullOrWhiteSpace(director.PPanNo))
                {
                    partnerEntity = existingPartners
                        .FirstOrDefault(x =>
                            x.PPanNo == director.PPanNo);
                }

                if (partnerEntity == null)
                {
                    partnerEntity =
                        new ApplicantLicensePartnersDetails
                        {
                            ApplicationIdNo =
                                dto.ApplicationIdNo
                        };

                    await _repository.AddCompanyPartner(
                        partnerEntity);
                }

                // Basic details
                partnerEntity.PName =
                    director.PName;

                partnerEntity.PPerShare =
                    director.PPerShare;

                partnerEntity.PPanNo =
                    director.PPanNo;

                partnerEntity.PExciseNominee =
                    director.PExciseNominee;

                partnerEntity.DINNo =
                    director.DINNo;

                // PAN file
                if (director.PanFile != null)
                {
                    partnerEntity.PhotoURLPanNo =
                        await _repository.SaveCompanyDocument(
                            director.PanFile);
                }
                else if (!string.IsNullOrWhiteSpace(
                    director.PanFileUploaded))
                {
                    partnerEntity.PhotoURLPanNo =
                        director.PanFileUploaded;
                }

                // Address file
                if (director.addressFile != null)
                {
                    partnerEntity.PhotoURLAddressProof =
                        await _repository.SaveCompanyDocument(
                            director.addressFile);
                }
                else if (!string.IsNullOrWhiteSpace(
                    director.AddressFileUploaded))
                {
                    partnerEntity.PhotoURLAddressProof =
                        director.AddressFileUploaded;
                }
            }

            await _repository.SaveChanges();

            return dto.ApplicationIdNo;
        }

        public async Task UploadApplicationDocuments(
     ApplicationDocumentUploadDto dto)
        {
            foreach (var doc in dto.Documents)
            {
                // ---------------------------------------------
                // Find existing document
                // ---------------------------------------------

                var existingDocument =
                    await _repository.GetApplicationDocument(
                        dto.ApplicationIdNo,
                        doc.DocId);

                // ---------------------------------------------
                // Upload new file if selected
                // ---------------------------------------------

                string? newFileName = null;

                if (doc.DocumentFile != null)
                {
                    newFileName =
                        await _repository.SaveApplicationDocumentFile(
                            doc.DocumentFile);
                }

                // ---------------------------------------------
                // UPDATE EXISTING
                // ---------------------------------------------

                if (existingDocument != null)
                {
                    existingDocument.MobileNo =
                        dto.MobileNo;

                    existingDocument.ApplicantSl =
                        doc.ApplicantSl;

                    existingDocument.DocSl =
                        doc.DocSl;

                    existingDocument.Remarks =
                        doc.Remarks;

                    existingDocument.DateOfValidity =
                        doc.DateOfValidity;

                    existingDocument.LicenseeIdNo =
                        doc.LicenseeIdNo;

                    existingDocument.DocStatus =
                        "N";

                    existingDocument.IsValid =
                        "N";

                    existingDocument.DocumentvalidationYN =
                        "N";

                    existingDocument.SubmitDate =
                        DateTime.Now;

                    // New file selected
                    // => replace old filename
                    if (!string.IsNullOrWhiteSpace(newFileName))
                    {
                        existingDocument.DocUrl =
                            newFileName;
                    }

                    // No repository Update needed.
                    // EF will track existing entity.
                }

                // ---------------------------------------------
                // INSERT NEW
                // ---------------------------------------------

                else
                {
                    var entity =
                        new LicenseApplicationUploadedDocument
                        {
                            ApplicationIdNo =
                                dto.ApplicationIdNo,

                            MobileNo =
                                dto.MobileNo,

                            ApplicantSl =
                                doc.ApplicantSl,

                            DocId =
                                doc.DocId,

                            DocSl =
                                doc.DocSl,

                            Remarks =
                                doc.Remarks,

                            DateOfValidity =
                                doc.DateOfValidity,

                            LicenseeIdNo =
                                doc.LicenseeIdNo,

                            DocStatus =
                                "N",

                            IsValid =
                                "N",

                            DocumentvalidationYN =
                                "N",

                            DocUrl =
                                newFileName,

                            SubmitDate =
                                DateTime.Now
                        };

                    await _repository
                        .AddApplicationDocument(entity);
                }
            }

            await _repository.SaveChanges();
        }


    }
    }

