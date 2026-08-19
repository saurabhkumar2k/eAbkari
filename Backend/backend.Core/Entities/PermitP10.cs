using System.ComponentModel.DataAnnotations;

public class PermitP10
{
    [Key]
    public int ID { get; set; }
    public int ? RegId { get; set; }
    public string? ApplicationIdNo { get; set; }
    public string? ApplicantMobile { get; set; }
    public string? FinYear { get; set; }
    public string? PremiseType { get; set; }
    public string? PremiseName { get; set; }
    public string? PremiseAddress { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public string? EventType { get; set; }
    public int? PremiseGuestNo { get; set; }
    public DateTime? PremiseStartEventDate { get; set; }
    public DateTime? PremiseStartTime { get; set; }
    public DateTime? PremiseEndTime { get; set; } 
    public string? TypeOfIdProof { get; set; }
    public string? ProofIdNo { get; set; }
    public string IsApproved { get; set; }

    public string PermitNo { get; set; }
    public DateTime CreatedDate { get; set; }
    public ICollection<P10LiquorDetails> LiquorDetails { get; set; } = new List<P10LiquorDetails>();
}

