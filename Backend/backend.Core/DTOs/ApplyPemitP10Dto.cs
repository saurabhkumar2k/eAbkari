using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class ApplyPermitP10Dto
    {
        // LicenseApplicationUserDetails insert in this table
        public int RegId { get; set; }
        public string ApplicantName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string FatherHusbandName { get; set; }
        public string Occupation { get; set; }
        public string PanNo { get; set; }
        public string PresentAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string StateUT { get; set; }
        public string District { get; set; }
        public string SubDivision { get; set; }
        public string PIN { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string LandLine { get; set; }
        //public string PermitNo { get; set; }

        // PermitP10 insert in this table
       // public string LicenseeCatCode { get; set; }
        public string ApplicantMobile { get; set; } = string.Empty;
        public string PremiseName { get; set; }
        public string PremiseAddress { get; set; }
        public string PremiseType { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string EventType { get; set; }
        public int PremiseGuestNo { get; set; }
        public DateTime PremiseStartEventDate { get; set; } 
        public DateTime PremiseStartTime { get; set; }
        public string TypeOfIdProof { get; set; }
        public string ProofIdNo { get; set; }

        //LicenseApplication insert Table 
        public string LicenseType { get; set; }

        public List<P10LiquorDetailsDto> P10LiquorDetails { get; set; } = new();

        public List<LicenseApplicationUploadedDocumentDto> LicenseApplicationUploadedDocument { get; set; } = new();

    }

    //P10LiquorDetails insert in this table
    public class P10LiquorDetailsDto
    {
        public string LiquorCategory { get; set; }
        public string LiquorType { get; set; }
        public int LiquorBottleSize { get; set; }
        public int Quantity { get; set; }
       
    }

}