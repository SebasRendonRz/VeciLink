using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IServiceRequestService
{
    Task<ServiceRequestDto> CreateRequestAsync(int userId, CreateServiceRequestDto dto);
    Task<List<ServiceRequestDto>> GetMyHistoryAsync(int userId, int? categoryId = null);
    Task<List<ServiceRequestDto>> GetProviderHistoryAsync(int userId);
    Task<ServiceRequestDto?> UpdateStatusAsync(int requestId, int userId, UpdateServiceRequestStatusDto dto);
}
