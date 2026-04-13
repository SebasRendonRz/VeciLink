namespace VeciLink.Api.DTOs;

public class UpdateCategoryDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public bool? IsActive { get; set; }
}
