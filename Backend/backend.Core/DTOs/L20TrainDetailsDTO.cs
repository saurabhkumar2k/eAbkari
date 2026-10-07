using backend.Core.DTOs;
using backend.Core.Entities.Licence;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class SaveTrainDetailsRequestDto
    {
        public string ApplicationIdNo { get; set; }

        public string? TrainName { get; set; }
        public string? TrainNumber { get; set; }
        public string? OriginateFrom { get; set; }
        public string? TempAddress { get; set; }
        public string? CompanyName { get; set; }

        public string? NumberOfSeatCovers { get; set; }
        public string? NumberOfDispensingCounter { get; set; }
        public string? NumberOfManagers { get; set; }
        public string? NumberOfKitchenStaff { get; set; }
        public string? NumberOfUtlityEmployees { get; set; }
        public string? NumberOfBarAttendent { get; set; }
        public string? NumberOfcompartments { get; set; }

        public List<TrainRouteDetailsDto> Routes { get; set; } = new();
    }
    public class TrainRouteDetailsDto
    {
        public string? RouteDescription { get; set; }
    }
}