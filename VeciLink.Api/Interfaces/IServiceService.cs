using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IServiceService
{
    Task<List<ServiceListDto>> GetServicesAsync(ServiceFilterDto filters);
    Task<ServiceDetailDto?> GetServiceByIdAsync(int id);
    Task<ServiceDetailDto> CreateServiceAsync(int userId, CreateServiceDto dto);
    Task<ServiceDetailDto?> UpdateServiceAsync(int userId, int serviceId, UpdateServiceDto dto);
    Task<bool> DeleteServiceAsync(int userId, int serviceId, bool isAdmin);
    Task<List<ServiceMapDto>> GetServicesForMapAsync(ServiceFilterDto filters);
    Task<bool> ToggleFeaturedAsync(int serviceId, bool isFeatured);
    Task<bool> ToggleActiveAsync(int serviceId, bool isActive);
}
