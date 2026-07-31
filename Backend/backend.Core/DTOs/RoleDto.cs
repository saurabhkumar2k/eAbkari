public class AddRoleDto
{
    public string RoleName { get; set; }
    public string RoleDescription { get; set; }
    public string? IsActive { get; set; } = "Y";
}
public class RoleDto
{
    public int RoleId { get; set; }
    public string? RoleName { get; set; }
    public string? RoleDescription { get; set; }
    public string? IsActive { get; set; } 
}