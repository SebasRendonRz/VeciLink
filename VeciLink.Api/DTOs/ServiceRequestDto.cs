using VeciLink.Api.Entities;

namespace VeciLink.Api.DTOs;

public class CreateServiceRequestDto
{
    public int ServiceId { get; set; }
}

public class ServiceRequestDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string? UserFullName { get; set; }
    public int ServiceId { get; set; }
    public string? ServiceName { get; set; }
    public string? ProviderName { get; set; }
    public int? CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public ServiceRequestStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class UpdateServiceRequestStatusDto
{
    public ServiceRequestStatus Status { get; set; }
}
