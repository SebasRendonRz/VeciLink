namespace VeciLink.Api.Entities;

public class Service
{
    public int Id { get; set; }
    public int ProviderProfileId { get; set; }
    public ProviderProfile ProviderProfile { get; set; } = null!;
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public string ServiceName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Neighborhood { get; set; }
    public string? Zone { get; set; }
    public string? Whatsapp { get; set; }
    public string? Schedule { get; set; }
    public string? Availability { get; set; }
    public decimal? Price { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public bool IsFeatured { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ServicePhoto> Photos { get; set; } = new List<ServicePhoto>();
}
