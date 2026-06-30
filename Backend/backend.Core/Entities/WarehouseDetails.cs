using System.ComponentModel.DataAnnotations;

public class WarehouseDetails
{
    [Key]
    public int Id { get; set; }

    public string? WarehouseName { get; set; }

    public string? WarehouseAddress1 { get; set; }

    public string? WarehouseAddress2 { get; set; }

    //public string? WarehouseCity { get; set; }

    public string? WarehouseState { get; set; }

    public string? WarehouseDistrict { get; set; }

    public string? WarehousePin { get; set; }

    public string? WarehouseMobile { get; set; }

    public string? WarehouseEmail { get; set; }

public string?  LicenseYear { get; set; }
public string? WarehouseSubDivision { get; set; }

    public string? WarehousePoliceStation { get; set; }

    public string? WarehouseConstituency { get; set; }

    public string? WarehouseWardName { get; set; }

    public string? WarehouseFAX { get; set; }

    public string? LeaseRegistration { get; set; }

    public DateTime? LeaseRegistrationDate { get; set; }

    public DateTime? LeaseRegistrationExpiryDate { get; set; }

    public string? ArchitectRegistrationNo { get; set; }

    public DateTime? ArchitectRegistrationNoValidUpto { get; set; }

    public decimal? SuperAreaofLicensePremise { get; set; }

    public decimal? CarpetAreaofLicensePremise { get; set; }

    public decimal? DistanceofDistillery { get; set; }

    public string? HoursofSale { get; set; }

    public DateTime? CreatedDateAt { get; set; }

 public string? AdditionalYN { get; set; }
    


}


