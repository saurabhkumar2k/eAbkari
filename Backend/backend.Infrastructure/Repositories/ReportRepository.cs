using backend.Core.DTOs;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Repositories
{

        public class ReportRepository : IReportRepository
        {
            private readonly ApplicationDbContext _context;

            public ReportRepository(ApplicationDbContext context)
            {
                _context = context;
            }

        public async Task<ReportDto?> GetL1ReportAsync(string applicationId)
        {
            var report = await (
                from la in _context.LicenseApplications

                join mur in _context.MstUsReg
                    on la.RegId equals mur.RegId

                join mc in _context.MstLicenseeCategory
 on la.CatCode equals mc.LicenseeCatCode into categoryGroup
                from mc in categoryGroup.DefaultIfEmpty()



                join wd in _context.WarehouseDetails
                    on la.ApplicationIdNo equals wd.ApplicationIdNo into warehouseGroup
                from wd in warehouseGroup.DefaultIfEmpty()

                join lc in _context.LicenseCompanyDetails
                    on la.ApplicationIdNo equals lc.ApplicationIdNo into companyGroup
                from lc in companyGroup.DefaultIfEmpty()

                join ap in _context.ApplicantLicensePartnersDetails
                    on la.ApplicationIdNo equals ap.ApplicationIdNo into partnerGroup
                from ap in partnerGroup.DefaultIfEmpty()

                where la.ApplicationIdNo == applicationId

                select new ReportDto
                {
                    // LicenseApplication
                    ApplicationIdNo = la.ApplicationIdNo,
                    ApplicationDate = la.ApplicationDate,
                    ApplicationFlag = la.ApplicationFlag,
                    CatCode = la.CatCode,
                    CategoryDescription = mc != null ? mc.LicenseeCatDesc : "",
                    // MstUsReg
                    ApplicantName = mur.FirstName + " " + mur.LastName,
                    FatherName = mur.FatherHusbandName,
                    Mobile = mur.Mobile,
                    Email = mur.Email,
                    AddressLine1 = mur.AddressLine1,
                    AddressLine2 = mur.AddressLine2,
                    State = mur.StateUT,
                    District = mur.District,
                    PIN = mur.PIN,
                    PanNo = mur.PanNo,
             
                    LicenseCompanyDetails = lc == null ? null : new LicenseCompanyDetailsDto
                    {
                        ConstitutionType = lc.ConstitutionType,
                        CINNO = lc.CINNO,
                        RegistrationNo = lc.RegistrationNo,
                        CompanyPAN = lc.CompanyPAN,
                        VATNO = lc.VATNO,
                        IsExciseNominee = lc.IsExciseNominee,
                        ExciseNomineeName = lc.ExciseNomineeName,
                        ExciseNomineeAddress = lc.ExciseNomineeAddress,
                        ExciseNomineeEmailID = lc.ExciseNomineeEmailID,
                        ExciseNomineeMobileNo = lc.ExciseNomineeMobileNo,
                        ExciseNomineePAN = lc.ExciseNomineePAN,
                        FSSAILicenceNo = lc.FSSAILicenceNo,
                        FSSAILicenceStartDate = lc.FSSAILicenceStartDate,
                        FSSAILicenceEndDate = lc.FSSAILicenceEndDate,
                        VATGSTCertNo = lc.VATGSTCertNo,
                        VATGSTCertEnddate = lc.VATGSTCertEnddate,
                        DistilleryLicNo = lc.DistilleryLicNo,
                        DistilleryLicEnddate = lc.DistilleryLicEnddate,
                        BWHInsuranceEndDate = lc.BWHInsuranceEndDate,
                        BWHRentAgreementEndDate = lc.BWHRentAgreementEndDate,
                        BWHInsuranceNo = lc.BWHInsuranceNo,
                        BWHLeaseRentAgreementNo = lc.BWHLeaseRentAgreementNo,
                        MobileNo = lc.MobileNo,
                        RegDate=lc.RegDate

                        // baki company fields
                    }



                }
                
                )


                .FirstOrDefaultAsync();


            if (report == null)
                return null;
            var directorList = await _context.ApplicantLicensePartnersDetails
    .Where(x => x.ApplicationIdNo == applicationId)
    .Select(x => new AdditionalCompanyPartnersDetailsDto
    {
        PName = x.PName,
        PPerShare = x.PPerShare,
        PPanNo = x.PPanNo,

        PExciseNominee = !string.IsNullOrEmpty(x.PExciseNominee) && x.PExciseNominee == "1"
    ? "Yes"
    : "No",

        PanFileUploaded = !string.IsNullOrEmpty(x.PhotoURLPanNo) ? "Yes" : "No",

        AddressFileUploaded = !string.IsNullOrEmpty(x.PhotoURLAddressProof) ? "Yes" : "No",

        DINNo = x.DINNo
    })
    .ToListAsync();
            report.Directors = directorList;


            report.Documents = await (
                from dm in _context.MstLicenseApplicationDocument

                join ud in _context.LicenseApplicationUploadedDocument
                    .Where(x => x.ApplicationIdNo == applicationId)
                on dm.DocId equals ud.DocId

                where dm.DocStatus != "B"

                orderby dm.DocId

                select new DocumentDto
                {
                    DocId = dm.DocId,
                    DocDesc = dm.DocDesc.Replace("<br/>", ""),
                    DocAppl = "Yes" +
                        (ud.DateOfValidity != null
                            ? $" (Date of validity {ud.DateOfValidity.Value:dd/MM/yyyy})"
                            : "")
                }
            ).Distinct().ToListAsync();

            report.WarehouseDetails = await (
    from w in _context.WarehouseDetails

    join s in _context.MstStates
        on w.WarehouseState equals s.StateCode into stateJoin
    from s in stateJoin.DefaultIfEmpty()

    join d in _context.MstDistrict
        on w.WarehouseDistrict equals d.DistrictCode into districtJoin
    from d in districtJoin.DefaultIfEmpty()

    join sd in _context.MstSubDivisions
        on w.WarehouseSubDivision equals sd.SubDivisionCode into subDivisionJoin
    from sd in subDivisionJoin.DefaultIfEmpty()

    join ps in _context.MstPoliceStation
        on new
        {
            DistrictCode = w.WarehouseDistrict,
            PsCode = w.WarehousePoliceStation
        }
        equals new
        {
            DistrictCode = ps.DistrictCode,
            PsCode = ps.PsCode
        }
        into policeJoin
    from ps in policeJoin.DefaultIfEmpty()

    where w.ApplicationIdNo == applicationId

    select new WarehouseDetailsDto
    {
        LicenseYear = w.FinYear,
        WarehouseName = w.WarehouseName,
    
        WarehouseAddress1 = w.WarehouseAddress1,
        WarehouseAddress2 = w.WarehouseAddress2,
        WarehouseState = s != null ? s.StateName : "",
        WarehouseDistrict = d != null ? d.DistrictName : "",
        WarehouseSubDivision = sd != null ? sd.SubDivisionName : "",
        WarehousePoliceStation = ps != null ? ps.PsName : "",
        WarehousePin = w.WarehousePin,
        WarehouseEmail = w.WarehouseEmail,
        WarehouseMobile = w.WarehouseMobile,
        //additional
        LeasePremise = w.LeasePremise,
        LeaseRegistration=w.LeaseRegistration,
        LeaseRegistrationDate=w.LeaseRegistrationDate,
        LeaseRegistrationExpiryDate = w.LeaseRegistrationExpiryDate,
        ArchitectRegistrationNo = w.ArchitectRegistrationNo,
        ArchitectRegistrationNoValidUpto = w.ArchitectRegistrationNoValidUpto,
        SuperAreaofLicensePremise = w.SuperAreaofLicensePremise,
        CarpetAreaofLicensePremise = w.CarpetAreaofLicensePremise,
        DistanceofDistilleryCP = w.DistanceofDistilleryCP,
        HoursofSale = w.HoursofSale,

    }

).FirstOrDefaultAsync();







            //report.Documents = documents;

            return report;
        }




        public async Task<ReportDto?> GetBasicReport(string applicationId)
        {
            return await (

                from la in _context.LicenseApplications

                join mur in _context.MstUsReg
                    on la.RegId equals mur.RegId

                join mc in _context.MstLicenseeCategory
                    on la.CatCode equals mc.LicenseeCatCode into catGroup
                from mc in catGroup.DefaultIfEmpty()

                join st in _context.MstStates
                    on mur.StateUT equals st.StateCode into stateGroup
                from st in stateGroup.DefaultIfEmpty()

                join dt in _context.MstDistrict
                    on mur.District equals dt.DistrictCode into districtGroup
                from dt in districtGroup.DefaultIfEmpty()

                join sd in _context.MstSubDivisions
        on mur.SubDivision equals sd.SubDivisionCode into subDivisionJoin
                from sd in subDivisionJoin.DefaultIfEmpty()


                where la.ApplicationIdNo == applicationId

                select new ReportDto
                {
                    ApplicationIdNo = la.ApplicationIdNo,
                    ApplicationDate = la.ApplicationDate,
                    ApplicationFlag = la.ApplicationFlag,

                    CatCode = la.CatCode,
                    CategoryDescription = mc != null ? mc.LicenseeCatDesc : "",

                    ApplicantName = mur.FirstName + " " + mur.LastName,
                    FatherName = mur.FatherHusbandName,

                    Mobile = mur.Mobile,
                    Email = mur.Email,

                    AddressLine1 = mur.AddressLine1,
                    AddressLine2 = mur.AddressLine2,

                    State = st != null ? st.StateName : "",
                    District = dt != null ? dt.DistrictName : "",
                    SubDivision= sd != null ? sd.SubDivisionName : "",

                    PIN = mur.PIN,
                    PanNo = mur.PanNo
                }

            ).FirstOrDefaultAsync();
        }




        public async Task<LicenseCompanyDetailsDto?> GetCompanyDetails(string applicationId)
        {
            return await _context.LicenseCompanyDetails

                .Where(x => x.ApplicationIdNo == applicationId)

                .Select(lc => new LicenseCompanyDetailsDto
                {
                    CompanyName = lc.CompanyName,
                    ConstitutionType = lc.ConstitutionType,
                    CINNO = lc.CINNO,
                    RegistrationNo = lc.RegistrationNo,
                    CompanyPAN = lc.CompanyPAN,
                    VATNO = lc.VATNO,

                    //IsExciseNominee = lc.IsExciseNominee,
                    IsExciseNominee = lc.IsExciseNominee == "1" ? "Yes" : "No",

                    ExciseNomineeName = lc.ExciseNomineeName,
                    ExciseNomineeAddress = lc.ExciseNomineeAddress,
                    ExciseNomineeEmailID = lc.ExciseNomineeEmailID,
                    ExciseNomineeMobileNo = lc.ExciseNomineeMobileNo,
                    ExciseNomineePAN = lc.ExciseNomineePAN,

                    FSSAILicenceNo = lc.FSSAILicenceNo,
                    FSSAILicenceStartDate = lc.FSSAILicenceStartDate,
                    FSSAILicenceEndDate = lc.FSSAILicenceEndDate,

                    VATGSTCertNo = lc.VATGSTCertNo,
                    VATGSTCertEnddate = lc.VATGSTCertEnddate,

                    DistilleryLicNo = lc.DistilleryLicNo,
                    DistilleryLicEnddate = lc.DistilleryLicEnddate,

                    BWHInsuranceNo = lc.BWHInsuranceNo,
                    BWHInsuranceEndDate = lc.BWHInsuranceEndDate,

                    BWHLeaseRentAgreementNo = lc.BWHLeaseRentAgreementNo,
                    BWHRentAgreementEndDate = lc.BWHRentAgreementEndDate,

                    MobileNo = lc.MobileNo,

                    RegDate = lc.RegDate
                })

                .FirstOrDefaultAsync();
        }





        public async Task<WarehouseDetailsDto?> GetWarehouseDetails(string applicationId)
        {
            return await (

                from w in _context.WarehouseDetails

                join s in _context.MstStates
                on w.WarehouseState equals s.StateCode into stateJoin
                from s in stateJoin.DefaultIfEmpty()

                join d in _context.MstDistrict
                on w.WarehouseDistrict equals d.DistrictCode into districtJoin
                from d in districtJoin.DefaultIfEmpty()

                join sd in _context.MstSubDivisions
                on w.WarehouseSubDivision equals sd.SubDivisionCode into subdivisionJoin
                from sd in subdivisionJoin.DefaultIfEmpty()

                join ps in _context.MstPoliceStation

                on new
                {
                    DistrictCode = w.WarehouseDistrict,
                    PsCode = w.WarehousePoliceStation
                }

                equals new
                {
                    DistrictCode = ps.DistrictCode,
                    PsCode = ps.PsCode
                }

                into policeJoin

                from ps in policeJoin.DefaultIfEmpty()

                where w.ApplicationIdNo == applicationId

                select new WarehouseDetailsDto
                {
                    LicenseYear = w.FinYear,

                    WarehouseName = w.WarehouseName,

                    WarehouseAddress1 = w.WarehouseAddress1,
                    WarehouseAddress2 = w.WarehouseAddress2,

                    WarehouseState = s != null ? s.StateName : "",

                    WarehouseDistrict = d != null ? d.DistrictName : "",

                    WarehouseSubDivision = sd != null ? sd.SubDivisionName : "",

                    WarehousePoliceStation = ps != null ? ps.PsName : "",

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

                    HoursofSale = w.HoursofSale

                }

            ).FirstOrDefaultAsync();
        }



        public async Task<List<AdditionalCompanyPartnersDetailsDto>> GetDirectors(string applicationId)
        {
            return await _context.ApplicantLicensePartnersDetails

                .Where(x => x.ApplicationIdNo == applicationId)

                .Select(x => new AdditionalCompanyPartnersDetailsDto
                {
                    PName = x.PName,

                    PPerShare = x.PPerShare,

                    PPanNo = x.PPanNo,

                    PExciseNominee =
                        x.PExciseNominee == "1"
                        ? "Yes"
                        : "No",

                    PanFileUploaded =
                        !string.IsNullOrEmpty(x.PhotoURLPanNo)
                        ? "Yes"
                        : "No",

                    AddressFileUploaded =
                        !string.IsNullOrEmpty(x.PhotoURLAddressProof)
                        ? "Yes"
                        : "No",

                    DINNo = x.DINNo

                })

                .ToListAsync();
        }




        public async Task<List<DocumentDto>> GetDocuments(string applicationId)
        {
            return await (

                from dm in _context.MstLicenseApplicationDocument

                join ud in _context.LicenseApplicationUploadedDocument

                .Where(x => x.ApplicationIdNo == applicationId)

                on dm.DocId equals ud.DocId

                where dm.DocStatus != "B"

                orderby dm.DocId

                select new DocumentDto
                {
                    DocId = dm.DocId,

                    DocDesc = dm.DocDesc.Replace("<br/>", ""),

                    DocAppl =

                        "Yes"

                        +

                        (

                        ud.DateOfValidity != null

                        ?

                        $" (Date of validity {ud.DateOfValidity.Value:dd/MM/yyyy})"

                        :

                        ""

                        )

                }

            )

            .Distinct()

            .ToListAsync();
        }



        public async Task<List<AppliedLicenseDto>> GetMyApplicationsAsync(long regId)
        {
            var applications = await (
                from la in _context.LicenseApplications

                join lc in _context.MstLicenseeCategory
                    on la.CatCode equals lc.LicenseeCatCode

                where la.RegId == regId

                orderby la.ApplicationDate descending

                select new AppliedLicenseDto
                {
                    ApplicationIdNo = la.ApplicationIdNo,

                    ApplicationDate = la.ApplicationDate,

                    LicenseeCatDesc = lc.LicenseeCatDesc,

                    ApplicationStatus = la.ApplicationStatus,

                    //CurrentStage = la.CurrentStage
                }

            ).ToListAsync();

            return applications;
        }



    }
    }

