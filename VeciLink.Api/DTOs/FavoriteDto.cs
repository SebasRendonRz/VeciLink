namespace VeciLink.Api.DTOs;

public class AddFavoriteDto
{
    public int ServiceId { get; set; }
}

public class FavoriteDto
{
    public int Id { get; set; }
    public int ServiceId { get; set; }
    public string? ServiceName { get; set; }
    public string? ProviderName { get; set; }
    public string? Neighborhood { get; set; }
    public DateTime CreatedAt { get; set; }
}
