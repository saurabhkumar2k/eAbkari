using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities
{
    [Table("UserPasswordMaster")]
    public class UserPasswordMaster
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string UserId { get; set; }

        [Required]
        [StringLength(500)]
        public string HashPass { get; set; }

        public DateTime? EntryDate { get; set; }
    }
}