using System.ComponentModel.DataAnnotations;

namespace backend.Core.Entities.Licence
{
    public class MstHotelType
    {
        [Key]
        [StringLength(50)]
        public int Id { get; set; }

        [StringLength(100)]
        public string HotelType { get; set; }

        [StringLength(1)]
        public string ActiveYN { get; set; }
    }
}