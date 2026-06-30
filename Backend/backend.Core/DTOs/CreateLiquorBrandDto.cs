public class CreateLiquorBrandDto
{
    public string LiquorCatCode { get; set; } = string.Empty;
    public string LiquorKindCode { get; set; } = string.Empty;
    public string LiquorTypeCode { get; set; } = string.Empty;

    public string LiquorBrandDesc { get; set; } = string.Empty;

    public string? BrandNameAlias { get; set; }

    public decimal? QuartsMeasure { get; set; }
}