using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class P10LiquorDetails
{
    [Key]
    public int ID { get; set; }

    public string? ApplicationIdNo { get; set; }

    public string? LiquorCategory { get; set; }

    public string? LiquorType { get; set; }

    public int? LiquorBottleSize { get; set; }

    public int? Quantity { get; set; }  
   
    public DateTime CreatedDate { get; set; }

    public PermitP10? PermitP10 { get; set; }

}   

