namespace VeciLink.Api.DTOs;

public class CreateServiceDto
{
    public int CategoryId { get; set; }
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
}

public class UpdateServiceDto
{
    public int CategoryId { get; set; }
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
    public bool IsActive { get; set; } = true;
}

public class ServiceListDto
{
    public int Id { get; set; }
    public string ServiceName { get; set; } = string.Empty;
    public string? Neighborhood { get; set; }
    public string? Zone { get; set; }
    public decimal? Price { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; }
    public string? CategoryName { get; set; }
    public int ProviderProfileId { get; set; }
    public int ProviderUserId { get; set; }
    public string? ProviderName { get; set; }
    public double ProviderRatingAverage { get; set; }
    public DateTime CreatedAt { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}

public class ServicePhotoDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class ServiceDetailDto
{
    public int Id { get; set; }
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
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public int ProviderProfileId { get; set; }
    public int ProviderUserId { get; set; }
    public string? ProviderName { get; set; }
    public double ProviderRatingAverage { get; set; }
    public int ProviderRatingCount { get; set; }
    public string? ProviderPhotoUrl { get; set; }
    public List<ServicePhotoDto> Photos { get; set; } = new();
}

public class ServiceFilterDto
{
    public int? CategoryId { get; set; }
    public string? Neighborhood { get; set; }
    public string? Keyword { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public double? RadiusKm { get; set; }
    public bool? IsFeatured { get; set; }
    public bool? ProviderIsFeatured { get; set; }
    public int? ProviderProfileId { get; set; }
}

public class ServiceMapDto
{
    public int Id { get; set; }
    public string ServiceName { get; set; } = string.Empty;
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public string? Neighborhood { get; set; }
    public string? CategoryName { get; set; }
    public string? ProviderName { get; set; }
}
