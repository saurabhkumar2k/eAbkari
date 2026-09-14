namespace backend.Core.DTOs.Licence
{
    public class HCRAdditionalRestaurantMasterDto
    {
        public string ApplicationIdNo { get; set; } = string.Empty;

        public string NameOfAdditionalRestaurant { get; set; } = string.Empty;

        public int? NumberOfSeatCovers { get; set; }

        public int? NumberOfCounter { get; set; }

        public string? AddtionalArea { get; set; }

        public string? HoursofSale { get; set; }

        public string? HoursofSaleAddtionalArea { get; set; }

        public string? ForeignLiquor { get; set; }

        public string? AreaSqMtr { get; set; }
        public int? slNo { get; set; }
    }
}