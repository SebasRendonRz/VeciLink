namespace VeciLink.Api.DTOs;

public class UserProfileDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Role { get; set; } = string.Empty;
    public string? Neighborhood { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
