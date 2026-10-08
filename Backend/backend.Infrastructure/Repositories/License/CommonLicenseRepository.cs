using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces.License;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Repositories.License
{
    public class CommonLicenseRepository : ICommonLicenseRepository
    {
        private readonly ApplicationDbContext _context;
        public CommonLicenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }



        public async Task<string?> GetLastApplicationId()
        {

            var FinYearV = await GetFinYear();

            if (string.IsNullOrWhiteSpace(FinYearV))
            {
                throw new Exception("Financial Year is not available.");
            }

            string activeYear = FinYearV.Substring(2, 2);

            return await _context.LicenseApplications
                .Where(x => x.ApplicationIdNo != null &&
                 x.ApplicationIdNo.Length >= 7 &&
                 x.ApplicationIdNo.Substring(5, 2) == activeYear)
                .OrderByDescending(x => x.Id)
                .Select(x => x.ApplicationIdNo)
            .FirstOrDefaultAsync();
            // return await _context.LicenseApplications
            //     .Where(x => x.ApplicationIdNo != null &&
            //     x.ApplicationIdNo.Length >= 7 &&
            //     x.ApplicationIdNo.Substring(5, 2) == activeYear)
            //     .OrderByDescending(x => x.ApplicationIdNo.Substring(x.ApplicationIdNo.Length - 5, 5))
            //     .Select(x => x.ApplicationIdNo)
            //      .FirstOrDefaultAsync();
        }

        public async Task<string> SaveApplicantDetails(
                    LicenseApplicationUserDetails userDetails,
                     LicenseApplication application)
        {
            // ==========================================
            // UPDATE Applicant Details
            // ==========================================

            int updatedUser =
                await _context.LicenseApplicationUserDetails
                    .Where(x =>
                        x.ApplicationIdNo == userDetails.ApplicationIdNo)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(x => x.RegId, userDetails.RegId)
                        .SetProperty(x => x.ApplicantName, userDetails.ApplicantName)
                        .SetProperty(x => x.DateOfBirth, userDetails.DateOfBirth)
                        .SetProperty(x => x.FatherHusbandName, userDetails.FatherHusbandName)
                        .SetProperty(x => x.Occupation, userDetails.Occupation)
                        .SetProperty(x => x.PanNo, userDetails.PanNo)
                        .SetProperty(x => x.PresentAddress, userDetails.PresentAddress)
                        .SetProperty(x => x.PermanentAddress, userDetails.PermanentAddress)
                        .SetProperty(x => x.StateUT, userDetails.StateUT)
                        .SetProperty(x => x.District, userDetails.District)
                        .SetProperty(x => x.SubDivision, userDetails.SubDivision)
                        .SetProperty(x => x.PIN, userDetails.PIN)
                        .SetProperty(x => x.Email, userDetails.Email)
                        .SetProperty(x => x.Mobile, userDetails.Mobile)
                        .SetProperty(x => x.LandLine, userDetails.LandLine)
                    );


            // ==========================================
            // If record was updated
            // ==========================================

            if (updatedUser > 0)
            {
                // Update LicenseApplication table

                await _context.LicenseApplications
                    .Where(x =>
                        x.ApplicationIdNo == application.ApplicationIdNo)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(x => x.RegId, application.RegId)
                        .SetProperty(x => x.CatCode, application.CatCode)
                        .SetProperty(x => x.LicenseType, application.LicenseType)
                        .SetProperty(x => x.ApplicationFlag, application.ApplicationFlag)
                    );

                return application.ApplicationIdNo;
            }


            // ==========================================
            // INSERT NEW RECORD
            // ==========================================

            _context.LicenseApplicationUserDetails.Add(userDetails);
            _context.LicenseApplications.Add(application);

            await _context.SaveChangesAsync();

            return application.ApplicationIdNo;
        }
        public async Task<LicenseApplicationUserDetailsDto> GetApplicantDetails(string AppId)
        {
            var user = await _context.LicenseApplicationUserDetails
                .Where(x => x.ApplicationIdNo == AppId)
                .Select(x => new LicenseApplicationUserDetailsDto
                {
                    ApplicationIdNo = x.ApplicationIdNo,
                    ApplicantName = x.ApplicantName,
                    Dob = x.DateOfBirth,
                    FatherHusbandName = x.FatherHusbandName,
                    Occupation = x.Occupation,
                    PresentAddress = x.PresentAddress,
                    PermanentAddress = x.PermanentAddress,
                    StateUT = x.StateUT,
                    District = x.District,
                    PIN = x.PIN,
                    Email = x.Email,
                    LandLine = x.LandLine,
                    PanNo = x.PanNo,
                    SubDivision = x.SubDivision,
                    Mobile = x.Mobile
                })
                .FirstOrDefaultAsync();

            return user;
        }
        public async Task<string?> GetFinYear()
        {
            return await _context.MstFinancialYear.Where(x => x.ActiveStatus == "Y").Select(x => x.FinYear).FirstOrDefaultAsync();
        }
        public async Task<string?> GetFlowUpto(string CatCode, string ActivityId)
        {
            return await _context.MstFlowApplicable.Where(x => x.ActivityId == ActivityId && x.LicenseCategory == CatCode).Select(x => x.FlowUptoCode).FirstOrDefaultAsync();
        }

        public async Task<string?> SubmitApplication(SubmitApplicationDTO dto)
        {
            var application = await _context.LicenseApplications.Where(x => x.ApplicationIdNo == dto.ApplicationIdNo).FirstOrDefaultAsync();
            if (application != null)
            {
                application.ApplicationIdNo = dto.ApplicationIdNo;
                application.ApplicationStatus = dto.ApplicationStatus;
                await _context.SaveChangesAsync();
            }
            return application?.ApplicationStatus ?? string.Empty;
        }

        public async Task<ApplicationIdResponseDto> GetPendingApplicationId(string catCode, int regId, string FinYearV)
        {
            var result = await (
            from mst in _context.MstUsReg
            join la in _context.LicenseApplications
                on mst.RegId equals la.RegId
            where la.CatCode == catCode
                  && mst.RegId == regId
                  && la.FinYear == FinYearV
                  && (la.ApplicationStatus == "02"
                      || la.ApplicationStatus == "01")
            orderby la.ApplicationDate descending
            select new ApplicationIdResponseDto
            {
                ApplicationIdNo = la.ApplicationIdNo
            }
            ).FirstOrDefaultAsync();

            return result;
        }
        public async Task<List<GetApplicantDocResponseDto>> GetDocDescriptionCatWiseRepositry(String applicationIdNo, string catCode, string DocType)
        {
            var result = await (
                from a in _context.MstLicenseApplicationDocument
                join b in _context.LicenseApplicationCategoryDocument
                    on a.DocId equals b.DocId

                where a.DocStatus == DocType
                   && a.DeleteStatus == "N"
                   && b.LicenseeCatCode == catCode
                   && b.ActiveStatus == "Y"
                   && b.LicenseeTypeFlag == "A"

                join c in _context.LicenseApplicationUploadedDocument
                     //.Where(x => x.ApplicationIdNo == applicationIdNo &&
                     //            x.MobileNoReleaseStatus == "N")
                     .Where(x => x.ApplicationIdNo == applicationIdNo && x.DocStatus == "Y")

                    on a.DocId equals c.DocId into gj

                from c in gj.DefaultIfEmpty()

                orderby (Convert.ToInt32(a.DocId) == 186 ? 999 : 1),
                        Convert.ToInt32(a.DocId)

                select new GetApplicantDocResponseDto
                {
                    DocDesc = a.DocDesc,
                    DocID = a.DocId,
                    IsMandatory = b.IsMandatory,
                    IsValid = a.IsValid ?? false, // null-coalescing operator                   
                    DocUrl = c != null ? c.DocUrl : "",
                    DocAppl = c != null && c.DocStatus == "N" ? "Yes" : "No",
                    DocSl = c != null ? c.DocSl : null,
                    SDate = c == null
                                ? "View"
                                : (c.SubmitDate == null
                                    ? "View"
                                    : "Submitted on : " + c.SubmitDate.Value.ToString("dd/MM/yyyy")),
                    VallidUpto = c != null && c.DateOfValidity.HasValue
                                 ? c.DateOfValidity.Value.ToString("dd/MM/yyyy")
                                : null
                }

            ).ToListAsync();

            return result;
        }

        public async Task<string> SaveAndUpdateApplicantDocumentsRepository(SaveAndUpdateApplicantDocumentsDto dto)
        {
            // Get all existing documents of this application
            var existingDocuments = await _context
                .LicenseApplicationUploadedDocument
                .Where(x => x.ApplicationIdNo == dto.ApplicationIdNo)
                .ToListAsync();


            // Find current maximum ApplicantSl
            int applicantSl = existingDocuments
                .Select(x =>
                    int.TryParse(x.ApplicantSl, out var value)
                        ? value
                        : 0)
                .DefaultIfEmpty(0)
                .Max();


            // Process each document
            foreach (var document in dto.Documents)
            {
                // Check existing document using
                // ApplicationIdNo + DocId
                var existingDocument = existingDocuments
                    .FirstOrDefault(x =>
                        x.ApplicationIdNo == dto.ApplicationIdNo &&
                        x.DocId == document.DocId);


                // =====================================================
                // UPDATE
                // =====================================================

                if (existingDocument != null)
                {
                    string fileExtension = string.Empty;

                    //if (!string.IsNullOrWhiteSpace(document.DocUrl))
                    //{
                    //    fileExtension =
                    //        Path.GetExtension(document.DocUrl);
                    //}
                    if (document.DocumentFile != null)
                    {
                        fileExtension = Path.GetExtension(document.DocumentFile.FileName);
                    }
                    string fileName =
                        $"{dto.ApplicationIdNo}_{existingDocument.ApplicantSl}_{document.DocId}_{document.DocSl}{fileExtension}";


                    existingDocument.MobileNo =
                        dto.MobileNo;

                    existingDocument.DocSl =
                        document.DocSl;

                    existingDocument.IsValid =
                        document.IsValid;

                    existingDocument.DateOfValidity =
                        document.DateOfValidity;

                    existingDocument.DocUrl =
                        fileName;

                    existingDocument.SubmitDate =
                        DateTime.Now;
                }


                // =====================================================
                // INSERT
                // =====================================================

                else
                {
                    applicantSl++;

                    string fileExtension = string.Empty;

                    //if (!string.IsNullOrWhiteSpace(document.DocUrl))
                    //{
                    //    fileExtension =
                    //        Path.GetExtension(document.DocUrl);
                    //}
                    if (document.DocumentFile != null)
                    {
                        fileExtension = Path.GetExtension(document.DocumentFile.FileName);
                    }


                    string fileName =
                        $"{dto.ApplicationIdNo}_{applicantSl}_{document.DocId}_{document.DocSl}{fileExtension}";
                    

                    var entity =
                        new LicenseApplicationUploadedDocument
                        {
                            ApplicationIdNo = dto.ApplicationIdNo,

                            MobileNo =
                                dto.MobileNo,

                            ApplicantSl =
                                applicantSl.ToString(),

                            DocId =
                                document.DocId,

                            DocSl =
                                document.DocSl,

                            DocStatus =
                                "Y",

                                IsValid = document.IsValid,

                            DateOfValidity =
                                document.DateOfValidity,

                            DocUrl =
                                fileName,

                            SubmitDate =
                                DateTime.Now
                        };


                    await _context
                        .LicenseApplicationUploadedDocument
                        .AddAsync(entity);


                    // Important:
                    // Add newly inserted record to local list
                    // so duplicate DocId in same request
                    // can be detected.
                    existingDocuments.Add(entity);
                }
            }

            // Save all changes together
            await _context.SaveChangesAsync();
            return "Documents saved/updated successfully.";
        }
    }
}
