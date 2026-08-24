using backend.Core.DTOs;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Repositories.License
{
    public class ApplicationProgressRepository : IApplicationProgressRepository
    {

        private readonly ApplicationDbContext _context;

        public ApplicationProgressRepository(ApplicationDbContext context)
        {
            _context = context;
        }





        //public async Task<int> GetCurrentStepAsync(string applicationId)
        //{
        //    return await _context.LicenseApplications
        //        .Where(x => x.ApplicationIdNo == applicationId)
        //        .Select(x => x.CurrentStep)
        //        .FirstOrDefaultAsync();
        //}

        public async Task<WarehouseDetailsDto?> GetWarehouseByApplicationIdAsync(string applicationId)
        {
            // return await (

            //from w in _context.WarehouseDetails

            //join s in _context.MstStates
            //on w.WarehouseState equals s.StateCode into stateJoin
            //from s in stateJoin.DefaultIfEmpty()

            //join d in _context.MstDistrict
            //on w.WarehouseDistrict equals d.DistrictCode into districtJoin
            //from d in districtJoin.DefaultIfEmpty()

            //join sd in _context.MstSubDivisions
            //on w.WarehouseSubDivision equals sd.SubDivisionCode into subdivisionJoin
            //from sd in subdivisionJoin.DefaultIfEmpty()

            //join ps in _context.MstPoliceStation

            //on new
            //{
            //    DistrictCode = w.WarehouseDistrict,
            //    PsCode = w.WarehousePoliceStation
            //}

            //equals new
            //{
            //    DistrictCode = ps.DistrictCode,
            //    PsCode = ps.PsCode
            //}

            //into policeJoin

            //from ps in policeJoin.DefaultIfEmpty()

            //where w.ApplicationIdNo == applicationId

            return await _context.WarehouseDetails
 .Where(w => w.ApplicationIdNo == applicationId)
 .Select(w => new WarehouseDetailsDto
 {
                    LicenseYear = w.FinYear,

                    WarehouseName = w.WarehouseName,

                    WarehouseAddress1 = w.WarehouseAddress1,
                    WarehouseAddress2 = w.WarehouseAddress2,

     WarehouseState = w.WarehouseState,
     WarehouseDistrict = w.WarehouseDistrict,
     WarehouseSubDivision = w.WarehouseSubDivision,
     WarehousePoliceStation = w.WarehousePoliceStation,

     //WarehouseState = s != null ? s.StateCode : "",

     //WarehouseDistrict = d != null ? d.DistrictCode : "",

     //WarehouseSubDivision = sd != null ? sd.SubDivisionCode : "",

     //WarehousePoliceStation = ps != null ? ps.PsCode : "",


     WarehousePin = w.WarehousePin,

                    WarehouseEmail = w.WarehouseEmail,

                    WarehouseMobile = w.WarehouseMobile,

                    LeasePremise = w.LeasePremise,

                    LeaseRegistration = w.LeaseRegistration,

                    LeaseRegistrationDate = w.LeaseRegistrationDate,

                    LeaseRegistrationExpiryDate = w.LeaseRegistrationExpiryDate,

                    ArchitectRegistrationNo = w.ArchitectRegistrationNo,

                    ArchitectRegistrationNoValidUpto = w.ArchitectRegistrationNoValidUpto,

                    SuperAreaofLicensePremise = w.SuperAreaofLicensePremise,

                    CarpetAreaofLicensePremise = w.CarpetAreaofLicensePremise,

                    DistanceofDistilleryCP = w.DistanceofDistilleryCP,

                    HoursofSale = w.HoursofSale,

                    ApplicationIdNo =w.ApplicationIdNo,

                    CatCode=w.CatCode


                }

            ).FirstOrDefaultAsync();
        }







        //public async Task<LicenseCompanyDetailsDto?> GetCompanyDetailsByApplicationIdAsync( string applicationId)
        //{
        //    try
        //    {
        //        return await _context.LicenseCompanyDetails
        //            .Where(x => x.ApplicationIdNo == applicationId)
        //            .Select(x => new LicenseCompanyDetailsDto
        //            {
        //                ApplicationIdNo = x.ApplicationIdNo,
        //                RegistrationNo = x.RegistrationNo,
        //                CompanyName = x.CompanyName,
        //                ConstitutionType = x.ConstitutionType,
        //                RegDate = x.RegDate,

        //                CompanyPAN = x.CompanyPAN,
        //                VATNO = x.VATNO,
        //                CINNO = x.CINNO,

        //                IsExciseNominee = x.IsExciseNominee,
        //                ExciseNomineeName = x.ExciseNomineeName,
        //                ExciseNomineeAddress = x.ExciseNomineeAddress,
        //                ExciseNomineeEmailID = x.ExciseNomineeEmailID,
        //                ExciseNomineeMobileNo = x.ExciseNomineeMobileNo,
        //                ExciseNomineePAN = x.ExciseNomineePAN,
        //                ExciseNomineePanImage = x.ExciseNomineePanImage,

        //                FSSAILicenceNo = x.FSSAILicenceNo,
        //                FSSAILicenceStartDate = x.FSSAILicenceStartDate,
        //                FSSAILicenceEndDate = x.FSSAILicenceEndDate,

        //                VATGSTCertNo = x.VATGSTCertNo,
        //                VATGSTCertEnddate = x.VATGSTCertEnddate,

        //                DistilleryLicNo = x.DistilleryLicNo,
        //                DistilleryLicEnddate = x.DistilleryLicEnddate,

        //                BWHInsuranceEndDate = x.BWHInsuranceEndDate,
        //                BWHRentAgreementEndDate = x.BWHRentAgreementEndDate,
        //                BWHLeaseRentAgreementNo = x.BWHLeaseRentAgreementNo,
        //                BWHInsuranceNo = x.BWHInsuranceNo
        //            })
        //            .FirstOrDefaultAsync();
















        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.ToString());
        //        throw;
        //    }
        //}


        public async Task<LicenseCompanyDetailsDto?> GetCompanyDetailsByApplicationIdAsync(string applicationId)
        {
            try
            {
                // =====================================================
                // 1. GET COMPANY DETAILS
                // =====================================================

                var company = await _context.LicenseCompanyDetails
                    .Where(x => x.ApplicationIdNo == applicationId)
                    .Select(x => new LicenseCompanyDetailsDto
                    {
                        ApplicationIdNo = x.ApplicationIdNo,

                        RegistrationNo = x.RegistrationNo,

                        CompanyName = x.CompanyName,

                        ConstitutionType = x.ConstitutionType,

                        RegDate = x.RegDate,

                        CompanyPAN = x.CompanyPAN,

                        VATNO = x.VATNO,

                        CINNO = x.CINNO,

                        IsExciseNominee = x.IsExciseNominee,

                        ExciseNomineeName = x.ExciseNomineeName,

                        ExciseNomineeAddress = x.ExciseNomineeAddress,

                        ExciseNomineeEmailID =
                            x.ExciseNomineeEmailID,

                        ExciseNomineeMobileNo =
                            x.ExciseNomineeMobileNo,

                        ExciseNomineePAN =
                            x.ExciseNomineePAN,

                        //ExciseNomineePAN = x.ExciseNomineePAN,

                        // DB filename → string property
                        ExciseNomineePanImageUploaded =
        x.ExciseNomineePanImage,

                        // ============================
                        // FSSAI
                        // ============================

                        FSSAILicenceNo =
                            x.FSSAILicenceNo,

                        FSSAILicenceStartDate =
                            x.FSSAILicenceStartDate,

                        FSSAILicenceEndDate =
                            x.FSSAILicenceEndDate,

                        // ============================
                        // VAT / GST
                        // ============================

                        VATGSTCertNo =
                            x.VATGSTCertNo,

                        VATGSTCertEnddate =
                            x.VATGSTCertEnddate,

                        // ============================
                        // DISTILLERY
                        // ============================

                        DistilleryLicNo =
                            x.DistilleryLicNo,

                        DistilleryLicEnddate =
                            x.DistilleryLicEnddate,

                        // ============================
                        // BWH
                        // ============================

                        BWHInsuranceEndDate =
                            x.BWHInsuranceEndDate,

                        BWHRentAgreementEndDate =
                            x.BWHRentAgreementEndDate,

                        BWHLeaseRentAgreementNo =
                            x.BWHLeaseRentAgreementNo,

                        BWHInsuranceNo =
                            x.BWHInsuranceNo
                    })
                    .FirstOrDefaultAsync();


                // =====================================================
                // 2. COMPANY NOT FOUND
                // =====================================================

                if (company == null)
                {
                    return null;
                }


                // =====================================================
                // 3. GET ALL PARTNERS
                // =====================================================

                var partners =
                    await _context.ApplicantLicensePartnersDetails
                        .Where(x =>
                            x.ApplicationIdNo == applicationId)
                        .Select(x => new AdditionalCompanyPartnersDetailsDto
                        {
                            ID = x.ID,

                            PName = x.PName,

                            PPerShare = x.PPerShare,

                            PPanNo = x.PPanNo,

                            PExciseNominee =
                                x.PExciseNominee,

                            DINNo = x.DINNo,

                            // Existing uploaded files
                            PanFileUploaded =
                                x.PhotoURLPanNo,

                            AddressFileUploaded =
                                x.PhotoURLAddressProof
                        })
                        .ToListAsync();


                // =====================================================
                // 4. ADD PARTNERS TO COMPANY DTO
                // =====================================================

                company.CompanyPartnersDetails = partners;


                // =====================================================
                // 5. DEBUG
                // =====================================================

                Console.WriteLine(
                    $"Company ApplicationId: {company.ApplicationIdNo}");

                Console.WriteLine(
                    $"Partners Count: {partners.Count}");

                foreach (var partner in partners)
                {
                    Console.WriteLine(
                        $"Partner ID: {partner.ID}, " +
                        $"Name: {partner.PName}");
                }


                // =====================================================
                // 6. RETURN
                // =====================================================

                return company;
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    "GetCompanyDetailsByApplicationIdAsync Error:");

                Console.WriteLine(ex.ToString());

                throw;
            }
        }



        public async Task<ApplicationDocumentUploadDto?>GetUploadedDocumentsByApplicationIdAsync(string applicationId)
        {
            var result = await _context
                .LicenseApplicationUploadedDocument
                .Where(x => x.ApplicationIdNo == applicationId)
                .Select(x => new LicenseApplicationUploadedDocumentDto
                {
                    ApplicationIdNo = x.ApplicationIdNo,
                    MobileNo = x.MobileNo,

                    ApplicantSl = x.ApplicantSl,
                    DocId = x.DocId,
                    DocSl = x.DocSl,

                    Remarks = x.Remarks,
                    DateOfValidity = x.DateOfValidity,

                    LicenseeIdNo = x.LicenseeIdNo,

                    DocStatus = x.DocStatus,
                    IsValid = x.IsValid,
                    DocumentvalidationYN = x.DocumentvalidationYN,

                    // DB me saved filename
                    DocUrl = x.DocUrl
                })
                .ToListAsync();

            if (result.Count == 0)
                return null;

            return new ApplicationDocumentUploadDto
            {
                ApplicationIdNo = applicationId,

                MobileNo = result
                    .FirstOrDefault()?.MobileNo,

                Documents = result
            };
        }




    }
}
