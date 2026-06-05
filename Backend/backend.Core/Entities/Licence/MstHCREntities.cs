using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    public class MstHotelType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string HotelType { get; set; }

        [Required]
        [StringLength(1)]
        public string ActiveYN { get; set; }
    }
    public class MstRestaurantQuestionnaire
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(500)]
        public string? QuestionValue { get; set; }
    }
}