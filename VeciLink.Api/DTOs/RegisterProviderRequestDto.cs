namespace VeciLink.Api.DTOs;

public class RegisterProviderRequestDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Neighborhood { get; set; }
    public string? ProviderName { get; set; }
    public string? Schedule { get; set; }
    public string? Availability { get; set; }
    public string? Description { get; set; }
}
