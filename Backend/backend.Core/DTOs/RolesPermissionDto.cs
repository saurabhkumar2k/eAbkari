namespace backend.Core.DTOs
{
    public class AddRolesPermissionDto
{
    public string? PermissionName { get; set; }
    public string? Description { get; set; }
    
}
public class UpdateRolesPermissionDto
{
    public int PermissionId { get; set; }
    public string? PermissionName { get; set; }
    public string? Description { get; set; }
    
}
    
}