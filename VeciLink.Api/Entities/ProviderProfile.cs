namespace VeciLink.Api.Entities;

public class ProviderProfile
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public string? ProviderName { get; set; }
    public string? Description { get; set; }
    public string? Whatsapp { get; set; }
    public string? Neighborhood { get; set; }
    public string? Zone { get; set; }
    public string? Schedule { get; set; }
    public string? Availability { get; set; }
    public double RatingAverage { get; set; } = 0;
    public int RatingCount { get; set; } = 0;
    public bool IsFeatured { get; set; } = false;
    public string? PhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Service> Services { get; set; } = new List<Service>();
}
