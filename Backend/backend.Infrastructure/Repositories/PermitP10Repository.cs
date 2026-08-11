using backend.Core.DTOs;
using backend.Core.Entities;
using backend.Core.Entities.Licence;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Text.RegularExpressions;


public class PermitP10Repository : IPermitP10Repository
{
    private readonly ApplicationDbContext _context;
   
    public PermitP10Repository(ApplicationDbContext context)
    {
        _context = context;
    }


    private async Task<string> GeneratePermitNumberAsync(MstFinancialYear finYear)
    {
        string year;
        string month;

        if (finYear != null && !string.IsNullOrEmpty(finYear.FinYear))
        {
           
            string[] finYearParts = finYear.FinYear.Split('-');
            year = finYearParts[0].Trim();
        }
        else
        {
            year = DateTime.Now.Year.ToString();
        }

        month = DateTime.Now.ToString("MM");

        string prefix = $"P10/{year}/{month}/";

        var lastPermit = await _context.PermitP10
            .Where(p => p.PermitNo != null && p.PermitNo.StartsWith(prefix))
            .OrderByDescending(p => p.PermitNo)
            .FirstOrDefaultAsync();

        int nextSequence = 1;

        if (lastPermit != null && !string.IsNullOrEmpty(lastPermit.PermitNo))
        {
            string lastNumber = lastPermit.PermitNo;
            string[] parts = lastNumber.Split('/');

            if (parts.Length == 4)
            {
                string sequenceStr = parts[3];
                if (int.TryParse(sequenceStr, out int lastSequence))
                {
                    nextSequence = lastSequence + 1;
                }
            }
        }

        string formattedSequence = nextSequence.ToString("D5");
        return $"{prefix}{formattedSequence}";
    }


    public async Task<long> ApplyPermitP10Async(ApplyPermitP10Dto dto, string ipAddress)
    {
         if (dto == null)
            throw new ArgumentNullException(nameof(dto));

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var finYear = await _context.MstFinancialYear
                .FirstOrDefaultAsync(x => x.ActiveStatus == "Y");

            if (finYear == null)
            {
                throw new Exception("Active financial year not found.");
            }

            var lastApplication = await _context.PermitP10
                .OrderByDescending(x => x.ID)
                .FirstOrDefaultAsync();

            int nextNumber = 1;
            if (lastApplication != null && !string.IsNullOrEmpty(lastApplication.ApplicationIdNo))
            {
                // Extract only the numeric part after "REF61"
                string prefix = "REF61";
                if (lastApplication.ApplicationIdNo.StartsWith(prefix))
                {
                    string numberPart = lastApplication.ApplicationIdNo.Substring(prefix.Length);
                    if (int.TryParse(numberPart, out int lastNum))
                    {
                        nextNumber = lastNum + 1;
                    }
                }
            }

            string applicationIdNo = $"REF61{nextNumber:D5}";

            // Generate Permit Number using the fetched finYear
            string permitNumber = await GeneratePermitNumberAsync(finYear);

            var user = await _context.MstUsReg.FirstOrDefaultAsync(x => x.RegId == dto.RegId);



            // Save into Applicant


            var applicantDetails = new LicenseApplicationUserDetails
            {
                RegId = dto.RegId,
                ApplicationIdNo= applicationIdNo,
                ApplicantName = dto.ApplicantName,
                DateOfBirth = dto.DateOfBirth,
                FatherHusbandName = dto.FatherHusbandName,
                Occupation = dto.Occupation,
                PanNo = dto.PanNo,
                PresentAddress = dto.PresentAddress,
                PermanentAddress = dto.PermanentAddress,
                StateUT = dto.StateUT,
                District = dto.District,
                SubDivision = dto.SubDivision,
                PIN = dto.PIN,
                Mobile = dto.Mobile,
                Email = dto.Email,
                LandLine = dto.LandLine
            };

            _context.LicenseApplicationUserDetails.Add(applicantDetails);


            // Save into LicenseApplication

            var licapplication = new LicenseApplication
            {

                IPAddress = ipAddress,
                RegId = dto.RegId,
                ApplicationIdNo = applicationIdNo,
                ApplicationDate = DateTime.Now,
                FinYear = finYear.FinYear,
                ApplicationStatus="F",
                CatCode="61",
                LicenseType=dto.LicenseType,
                IsApplicationCompleted="N",
                ApplicationFlag="A",               

            };

            _context.LicenseApplications.Add(licapplication);
          

            // Save into Permit


            var permit = new PermitP10
            {
                RegId = dto.RegId,
                ApplicationIdNo = applicationIdNo,
                ApplicantMobile = dto.ApplicantMobile,
                FinYear = finYear.FinYear,
                PremiseName = dto.PremiseName,
                PremiseAddress = dto.PremiseAddress,
                PremiseType = dto.PremiseType,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                EventType = dto.EventType,
                PremiseGuestNo = dto.PremiseGuestNo,
                PremiseStartEventDate = dto.PremiseStartEventDate,
                PremiseStartTime = dto.PremiseStartTime,
                PremiseEndTime = DateTime.Today.AddHours(22).AddMinutes(30),
                TypeOfIdProof = dto.TypeOfIdProof,
                ProofIdNo = dto.ProofIdNo,
                IsApproved = "Y",
                PermitNo = permitNumber,
                CreatedDate = DateTime.Now
            };

            _context.PermitP10.Add(permit);


            // Save into Liquor


            if (dto.P10LiquorDetails != null)
            {
                foreach (var item in dto.P10LiquorDetails)
                {
                    var liquor = new P10LiquorDetails
                    {
                        ApplicationIdNo = applicationIdNo,
                        LiquorCategory = item.LiquorCategory,
                        LiquorType = item.LiquorType,
                        LiquorBottleSize = item.LiquorBottleSize,
                        Quantity = item.Quantity,
                        CreatedDate = DateTime.Now
                    };

                    _context.P10LiquorDetails.Add(liquor);
                }
            }

            // Save into LicenseApplicationUploadedDocument

            if (dto.LicenseApplicationUploadedDocument?.Any() == true)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "Documents",
                    "ApplicationDocuments");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                foreach (var doc in dto.LicenseApplicationUploadedDocument)
                {
                    if (doc.DocUrl == null || doc.DocUrl.Length == 0)
                        continue;

                    string fileName = Guid.NewGuid() +
                                      Path.GetExtension(doc.DocUrl.FileName);

                    string physicalPath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        await doc.DocUrl.CopyToAsync(stream);
                    }

                    var document = new LicenseApplicationUploadedDocument
                    {
                        ApplicationIdNo = applicationIdNo,
                        MobileNo = dto.Mobile,
                        ApplicantSl = "1",
                        DocId = "02",
                        DocSl = "272",
                        DocUrl = fileName,
                        DocStatus = doc.DocStatus,
                        IsValid = "Y",
                        Remarks = "",
                        DateOfValidity = null,
                        DocumentvalidationYN = "N",
                        LicenseeIdNo = null,
                        SubmitDate = DateTime.Now
                    };

                    _context.LicenseApplicationUploadedDocument.Add(document);
                }
            }

             // Single save for everything added above.
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return permit.ID;

        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<IEnumerable<PremiseDetails>> GetPremiseAsync()
    {
        return await _context.PremiseDetails
            .ToListAsync();
    }


    //public async Task<List<GetPermitP10Dto>> GetPermitP10Async(int regId)
    //{
    //    var result = await (
    //        from a in _context.LicenseApplicationUserDetails
    //        join b in _context.PermitP10
    //            on a.RegId equals b.RegId
    //        where b.RegId == regId
    //        select new GetPermitP10Dto
    //        {
    //            ApplicantName = a.ApplicantName,
    //            ApplicantMobile = b.ApplicantMobile,
    //            CreatedDate = b.CreatedDate,
    //            EventType = b.EventType,
    //            FinYear = b.FinYear,
    //            PermitNo = b.PermitNo,
    //            PremiseAddress = b.PremiseAddress,
    //            PremiseEndTime = b.PremiseEndTime,
    //            PremiseGuestNo = b.PremiseGuestNo,
    //            PremiseStartEventDate = b.PremiseStartEventDate,
    //            PremiseStartTime = b.PremiseStartTime
    //        }).ToListAsync();

    //    return result;
    //}

    public async Task<List<GetPermitP10Dto>> GetPermitP10Async(string applid)
    {
        var result = await (
            from a in _context.LicenseApplicationUserDetails
            join b in _context.PermitP10
                on a.ApplicationIdNo equals b.ApplicationIdNo
            where b.ApplicationIdNo == applid
            select new GetPermitP10Dto
            {
                ApplicantName = a.ApplicantName,
                ApplicantMobile = b.ApplicantMobile,
                CreatedDate = b.CreatedDate,
                EventType = b.EventType,
                FinYear = b.FinYear,
                PermitNo = b.PermitNo,
                PremiseAddress = b.PremiseAddress,
                PremiseEndTime = b.PremiseEndTime,
                PremiseGuestNo = b.PremiseGuestNo,
                PremiseStartEventDate = b.PremiseStartEventDate,
                PremiseStartTime = b.PremiseStartTime,
                PremiseType = b.PremiseType,
                PremiseName = b.PremiseName,
                ApplicationIdNo = b.ApplicationIdNo
            })
            .ToListAsync();

        return result;
    }

}