using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities
{
    [Table("UserPasswordLog")]
    public class UserPasswordLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string UserId { get; set; }

        [StringLength(500)]
        public string UserPass { get; set; }

        public DateTime? EntryDate { get; set; }
    }
}