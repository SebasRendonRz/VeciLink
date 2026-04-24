namespace VeciLink.Api.DTOs;

public class ProviderProfileDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string? ProviderName { get; set; }
    public string? Description { get; set; }
    public string? Whatsapp { get; set; }
    public string? Neighborhood { get; set; }
    public string? Zone { get; set; }
    public string? Schedule { get; set; }
    public string? Availability { get; set; }
    public double RatingAverage { get; set; }
    public int RatingCount { get; set; }
    public bool IsFeatured { get; set; }
    public string? PhotoUrl { get; set; }
    public int MaxServicesAllowed { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class ProviderQuotaDto
{
    public int ProviderProfileId { get; set; }
    public int MaxServicesAllowed { get; set; }
    public int ActiveServicesCount { get; set; }
    public int RemainingSlots { get; set; }
}

public class UpdateProviderQuotaDto
{
    public int MaxServicesAllowed { get; set; }
}

public class CreateProviderProfileDto
{
    public string? ProviderName { get; set; }
    public string? Description { get; set; }
    public string? Whatsapp { get; set; }
    public string? Neighborhood { get; set; }
    public string? Zone { get; set; }
    public string? Schedule { get; set; }
    public string? Availability { get; set; }
    public string? PhotoUrl { get; set; }
}

public class UpdateProviderProfileDto
{
    public string? ProviderName { get; set; }
    public string? Description { get; set; }
    public string? Whatsapp { get; set; }
    public string? Neighborhood { get; set; }
    public string? Zone { get; set; }
    public string? Schedule { get; set; }
    public string? Availability { get; set; }
    public string? PhotoUrl { get; set; }
}

public class ProviderRankingDto
{
    public int Id { get; set; }
    public int ProviderId { get; set; }
    public string? ProviderName { get; set; }
    public double RatingAverage { get; set; }
    public bool IsFeatured { get; set; }
    public int RatingCount { get; set; }
    public string? Neighborhood { get; set; }
    public string? PhotoUrl { get; set; }
}
