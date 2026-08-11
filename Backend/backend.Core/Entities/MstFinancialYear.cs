using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class MstFinancialYear
{
    [Key]
    public int Id { get; set; }

    public string? FinYear { get; set; }

    public string? ActiveStatus { get; set; }

   

}

