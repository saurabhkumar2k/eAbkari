public class AddRoleDto
{
    public string RoleName { get; set; }
    public string RoleDescription { get; set; }
    public string? IsActive { get; set; } = "Y";
}