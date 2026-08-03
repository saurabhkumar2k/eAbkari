using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class AdditionalHCRDetailsDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;

        public int? NumberOfClubMember { get; set; }

        public string? NumberOfSeatCovers { get; set; }

        public string? NumberOfDispensingCounter { get; set; }

        public bool? AdditionalArea { get; set; }

        public string? NumberOfManagers { get; set; }

        public string? NumberOfKitchenStaff { get; set; }

        public string? NumberOfUtlityEmployees { get; set; }

        public string? TotalRoom { get; set; }

        public string? StaffStrength { get; set; }

        public string? StarCategory { get; set; }

        public string? ServiceCounter { get; set; }

        public string? TotalArea { get; set; }

        public string? EducationalInsDist { get; set; }

        public string? ReligiousPlaceDist { get; set; }

        public string? IsSuitableGagdget { get; set; }

        public string? IsLocalAuthorityApproved { get; set; }

        public string? IsIndicatingLiquor { get; set; }

        public string? NumberOfBarAttendent { get; set; }

        public string? StarCategoryRating { get; set; }

        public string? RestaurantArea { get; set; }

        public string? HourOfSale { get; set; }
    }


}