using System.ComponentModel.DataAnnotations;


namespace backend.Core.Entities
{

public class MstLiquorKind
{
    [Key]
    public int ID { get; set; }
    public string LiquorKindCode { get; set; } = string.Empty;

    public string LiquorCatCode { get; set; } = string.Empty;

    public string LiquorKindDesc { get; set; } = string.Empty;

    public string LiquorKindAbbr { get; set; } = string.Empty;

    public string DeleteStatus { get; set; } = string.Empty;
}


public class MstLiquorType
{
    [Key]
    public int ID { get; set; }
    [StringLength(50)]
    public string LiquorCatCode { get; set; } = string.Empty;

    [StringLength(50)]
    public string LiquorKindCode { get; set; } = string.Empty;

    
    [StringLength(50)]
    public string LiquorTypeCode { get; set; } = string.Empty;

    [StringLength(50)]
    public string LiquorTypeDesc { get; set; } = string.Empty;


    [StringLength(1)]
    public string DeleteStatus { get; set; } = string.Empty;
}


 public class MstLiquorCategory
{
    
    
    public string LiquorCatCode { get; set; } = string.Empty;

    
    public string LiquorCatDesc { get; set; } = string.Empty;

    
    public string LiquorCatAbbr { get; set; } = string.Empty;

    
    public string DeleteStatus { get; set; } = "N";
}


   public class MstLiquorBottler
{    
    public string? LiquorBottlerOrigin { get; set; } = string.Empty;
        [Key]
        public string LiquorBottlerCode { get; set; } = string.Empty;
  
    public string? LiquorBottlerCountry { get; set; } = string.Empty;
   
    public string? LiquorBottlerState { get; set; } = string.Empty;
   
    public string? LiquorBottlerName { get; set; } = string.Empty;
    
    public string? LiquorBottlerAddress { get; set; } = string.Empty;
    public string? LiquorBottlerPinCode { get; set; } = string.Empty;
  
    public string? LicenseeIdNo { get; set; } = string.Empty;
    
    public string? EntryFlag { get; set; } = string.Empty;
    
    public string? DeleteStatus { get; set; } = "N";
    
    public string? OldBottlerId { get; set; } = string.Empty;
}

public class MstLicenseeCategory
{
        public int? ID { get; set; }

        public string LicenseeCatCode { get; set; } = string.Empty;
    public string LicenseeCatDesc { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public DateTime? OprDate { get; set; }
    public string? DeleteStatus { get; set; } = "N";
    public string? OfficerPosted { get; set; } = string.Empty;
    public string? RelationFlag { get; set; } = string.Empty;
    public string? RetailerFlag { get; set; } = string.Empty;
    public string? RenewalPaymentMode { get; set; } = string.Empty;
    public string? VisibilityStatus { get; set; } = string.Empty;
    //public string? BusinessFirstLicenseeCatCode { get; set; } = string.Empty;
    public bool? IsPayment { get; set; }
    //public int? Amount { get; set; }
    public string? LicenseTypeFlag { get; set; } = string.Empty;
    public string? MultipleAllowedYN { get; set; } = string.Empty;
    public string? RenewalAllowedYN { get; set; } = string.Empty;
    public string? CorporationAllowedYN { get; set; } = string.Empty;
    public string? DocumentRevalidationYN { get; set; } = string.Empty;
    public string? LiquorType { get; set; } = string.Empty;
    public string? BranchCode { get; set; } = string.Empty;
    public string? IsMNTP { get; set; } = string.Empty;
}


public class MstLiquorMeasure
{
    public string LiquorCatCode { get; set; } = string.Empty;
    public string? LiquorKindCode { get; set; } = string.Empty;
    public string? LiquorTypeCode { get; set; } = string.Empty;
    public string? MeasureCode { get; set; } = string.Empty;
    public string? MeasureScale { get; set; } = string.Empty;
    public string? MeasureUnit { get; set; } = string.Empty;
    public string? MeasureUpper { get; set; } = string.Empty;
    public string? MeasureLower { get; set; } = string.Empty;
    public string? MeasureDetail { get; set; } = string.Empty;
    public string? LiquorTypeCodeOld { get; set; } = string.Empty;
    public string? DeleteStatus { get; set; } = string.Empty;
}

public class MstLiquorBrand
{
    public string? LiquorCatCode { get; set; }

    public string? LiquorKindCode { get; set; }

    public string?  LiquorTypeCode { get; set; }

    public string? LiquorBrandCode { get; set; }

    public string? LiquorBrandDesc { get; set; }
   
    public string? BrandNameAlias { get; set; }

    public int? QuartsMeasure { get; set; }

    public string? DeleteStatus { get; set; }
}

}