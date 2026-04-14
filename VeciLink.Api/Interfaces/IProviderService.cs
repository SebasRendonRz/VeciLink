using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IProviderService
{
    Task<List<ProviderProfileDto>> GetAllProvidersAsync();
    Task<ProviderProfileDto?> GetProviderProfileAsync(int userId);
    Task<ProviderProfileDto> CreateOrUpdateProviderProfileAsync(int userId, CreateProviderProfileDto dto);
    Task<List<ProviderProfileDto>> GetFeaturedProvidersAsync();
    Task<List<ProviderRankingDto>> GetProviderRankingAsync();
    Task<bool> ToggleFeaturedAsync(int providerId, bool isFeatured);
}
