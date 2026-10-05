using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Repositories.ApplicationFlow
{
    public class PLAPullApplicationRepository : IPLAPullApplicationRepository
    {
        private readonly ApplicationDbContext _context;
        public PLAPullApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        //    public async Task<List<PLAPullApplicationDto>>
        //GetLicensePermitApplications(
        //    string category,
        //    string userId)
        //    {


        //        if (category == "License/Permit")
        //        {
        //            // aapki LINQ query


        //            var result = await (
        //                from A in _context.LicenseApplications

        //                join P in _context.MstFlowApplicable
        //                    on new
        //                    {
        //                        LicenseCategory = A.CatCode,
        //                        FlowUptoCode = A.FlowUptoCode
        //                    }
        //                    equals new
        //                    {
        //                        LicenseCategory = P.LicenseCategory,
        //                        FlowUptoCode = P.FlowUptoCode
        //                    }

        //                join L in _context.MstLicenseeCategory
        //                    on A.CatCode equals L.LicenseeCatCode

        //                join PA in _context.PlaAccessPermissionHistory
        //                    on A.ApplicationIdNo equals PA.ApplicationIdNo

        //                join FData in
        //            (
        //                        from F in _context.FlowHierarchyMapping
        //                        where F.UserID == "DA-ASHISHK"
        //                              && (F.Active == "Y" || F.Active == null)
        //                        group F by new
        //                        {
        //                            F.FlowUpto,
        //                            F.UserID
        //                        }
        //                        into G
        //                        select new
        //                        {
        //                            FlowUpto = G.Key.FlowUpto,
        //                            UserID = G.Key.UserID,
        //                            HierarchyID = G.Min(x => x.HierarchyID)
        //                        }
        //                    )
        //                    on P.FlowUptoCode equals FData.FlowUpto
        //                    into FJoin

        //                from F in FJoin.DefaultIfEmpty()

        //                join CD in _context.LicenseCompanyDetails
        //                    on A.ApplicationIdNo equals CD.ApplicationIdNo
        //                    into CDJoin

        //                from CD in CDJoin.DefaultIfEmpty()

        //                select new PLAPullApplicationDto
        //                {
        //                    ApplicationIdNo = A.ApplicationIdNo,
        //                    FlowUptoCode = P.FlowUptoCode,
        //                    HierarchyID = F != null ? F.HierarchyID : null,
        //                    CompanyName = CD != null ? CD.CompanyName : null,
        //                    //LicenseeCatDesc =
        //                    //    L.LicenseeCatDesc + " " +
        //                    //    (
        //                    //(
        //                    //            from ALM in _context.LicenseApplications
        //                    //            join UR in _context.MstUsReg
        //                    //                on ALM.RegId equals UR.RegId
        //                    //            where ALM.ApplicationIdNo == PA.ApplicationIdNo
        //                    //            select UR.UserId
        //                    //        ).FirstOrDefault() ?? ""
        //                    //    ),

        //                    LicenseeCatDesc = L.LicenseeCatDesc,

        //                    UserId =
        //    (
        //        from ALM in _context.LicenseApplications
        //        join UR in _context.MstUsReg
        //            on ALM.RegId equals UR.RegId
        //        where ALM.ApplicationIdNo == PA.ApplicationIdNo
        //        select UR.UserId
        //    ).FirstOrDefault(),


        //                    ApplicationDate = A.ApplicationDate
        //                }
        //            )
        //            .Distinct()
        //            .ToListAsync();

        //            return result;
        //        }
        //        else
        //        {

        //        }

        //        return new List<PLAPullApplicationDto>();

        //    }

        public async Task<List<PLAPullApplicationDto>> GetLicensePermitApplications(string category, string userId)


        {
            var query =
    from A in _context.LicenseApplications

    join P in _context.MstFlowApplicable
        on new
        {
            CatCode = A.CatCode,
            FlowUptoCode = A.FlowUptoCode
        }
        equals new
        {
            CatCode = P.LicenseCategory,
            FlowUptoCode = P.FlowUptoCode
        }

    join LSData in _context.LicenseSiteDetails
        on A.ApplicationIdNo equals LSData.ApplicationIdNo into LSGroup

    from LS in LSGroup.DefaultIfEmpty()

    join URData in _context.MstUsReg
        on LS.Regnumber equals URData.RegId.ToString() into URGroup

    from UR in URGroup.DefaultIfEmpty()

    join L in _context.MstLicenseeCategory
        on A.CatCode equals L.LicenseeCatCode

    join PA in _context.PlaAccessPermissionHistory
        on A.ApplicationIdNo equals PA.ApplicationIdNo

    join FData in
        (
            from F in _context.FlowHierarchyMapping
            where F.UserID == userId
                  && (F.Active == null || F.Active == "Y")
            group F by new
            {
                F.FlowUpto,
                F.UserID
            }
            into FG
            select new
            {
                FlowUpto = FG.Key.FlowUpto,
                UserID = FG.Key.UserID,
                HierarchyID = FG.Min(x => x.HierarchyID)
            }
        )
        on P.FlowUptoCode equals FData.FlowUpto into FGroup

    from F in FGroup.DefaultIfEmpty()

        // IMPORTANT: ApplicationHierarchyMapping
    join HData in _context.ApplicationHierarchyMapping
        on A.ApplicationIdNo equals HData.AppID into HGroup

    from H in HGroup.DefaultIfEmpty()

    where H == null
          && (A.ApplicationFlag == null
              || !new[] { "R", "C", "E", "H" }
                  .Contains(A.ApplicationFlag))
          && A.ApplicationStatus != "72"

    select new PLAPullApplicationDto
    {
        ApplicationIdNo = A.ApplicationIdNo,

        SiteName = LS != null
            ? LS.SiteName
            : "",

        SiteEmail = LS != null
            ? LS.SiteEmail
            : "",

        FlowUptoCode = P.FlowUptoCode,

        HierarchyID = F != null
            ? F.HierarchyID
            : null,

        LicenseeCatDesc = L.LicenseeCatDesc,

        UserId = UR != null
            ? UR.UserId
            : "",

        ApplicationDate = A.ApplicationDate
    };

            var result = await query
                .Distinct()
                .ToListAsync();

            return result;

        }



        //public async Task<bool> ValidateHierarchy( string applicationIdNo, string flowUpto, long hierarchyId, string userId)
        //{
        //    // User ka hierarchy check
        //    var userHierarchy = await _context.FlowHierarchyMapping
        //        .FirstOrDefaultAsync(x => x.UserID == userId);

        //    if (userHierarchy == null)
        //        return false;

        //    // User jis hierarchy me hai,
        //    // wahi hierarchy application ke request se match honi chahiye
        //    if (userHierarchy.HierarchyID != hierarchyId)
        //        return false;

        //    // Application ka hierarchy mapping check
        //    var applicationMapping =
        //        await _context.ApplicationHierarchyMapping
        //            .FirstOrDefaultAsync(x =>
        //                x.AppID == applicationIdNo &&
        //                x.HierarchyID == hierarchyId &&
        //                x.FlowUpto == flowUpto);

        //    if (applicationMapping == null)
        //        return false;

        //    return true;
        //}



        public async Task<bool> PullApplication(
       PullApplicationItemDto application,
       string userId,
       string category,
       string permitType)
        {
            // -----------------------------------------
            // 1. Check duplicate hierarchy mapping
            // -----------------------------------------

            var existingMapping =
                await _context.ApplicationHierarchyMapping
                    .FirstOrDefaultAsync(x =>
                        x.AppID == application.ApplicationIdNo &&
                        x.HierarchyID == application.HierarchyID &&
                        x.FlowUpto == application.FlowUpto);

            // Agar mapping already hai to dobara insert mat karo
            if (existingMapping == null)
            {
                var mapping = new ApplicationHierarchyMapping
                {
                    AppID = application.ApplicationIdNo,
                    HierarchyID = application.HierarchyID,
                    FlowUpto = application.FlowUpto,
                    CreatedBy = userId,
                    CreatedOn = DateTime.Now
                };

                _context.ApplicationHierarchyMapping.Add(mapping);
            }


            // -----------------------------------------
            // 2. Category condition
            // -----------------------------------------

            if (category == "License/Permit" ||
                category == "Renewal" ||
                category == "HCREdit" ||
                category == "hourOfSale" ||
                category == "SiteChange" ||
                category == "Transfer")
            {
                // User ka User_Type_Code
                var userTypeCode =
                    await _context.FlowHierarchyMapping
                        .Where(x => x.UserID == userId)
                        .Select(x => x.UserTypeCode)
                        .FirstOrDefaultAsync();

                if (userTypeCode != null)
                {
                    var history =
                        await _context.PlaAccessPermissionHistory
                            .Where(x =>
                                x.ApplicationIdNo ==
                                application.ApplicationIdNo)
                            .ToListAsync();

                    foreach (var row in history)
                    {
                        row.ReceiverUserID = userId;
                        row.ReceiverUserTypeCode = userTypeCode;
                    }
                }
            }
            var licenseApplication = await _context.LicenseApplications
    .FirstOrDefaultAsync(x =>
        x.ApplicationIdNo == application.ApplicationIdNo);

            if (licenseApplication != null)
            {
                licenseApplication.ApplicationStatus = "04";
            }


            // -----------------------------------------
            // 3. Save
            // -----------------------------------------

            await _context.SaveChangesAsync();

            return true;
        }



        
    }

}

