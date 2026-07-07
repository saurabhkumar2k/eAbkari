using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace backend.Core.Entities.Department
{

    [Table("DepartmentUsers")]
    public class DepartmentUsers
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(100)]
        public string UserDesignation { get; set; }

        [Required]
        [StringLength(200)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [StringLength(50)]
        public string? Token { get; set; }

        public DateTime? Token_Generated_At { get; set; }

        [StringLength(50)]
        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiry { get; set; }

        public virtual ICollection<DeptUserRoles> DeptUserRoles { get; set; } = new List<DeptUserRoles>();
    }

    [Table("DeptUserRoles")]
    public class DeptUserRoles
    {
        [Key]
        public int DeptUserRoleId { get; set; }

        [ForeignKey(nameof(DepartmentUsers))]
        public int UserId { get; set; }

        [ForeignKey(nameof(MstRoles))]
        public int RoleId { get; set; }

        public virtual DepartmentUsers DepartmentUsers { get; set; }

        public virtual MstRoles MstRoles { get; set; }
    }

}