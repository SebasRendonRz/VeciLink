using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IAdvertisementService
{
    Task<IEnumerable<AdvertisementDto>> GetAllAdvertisementsAsync();
    Task<IEnumerable<AdvertisementDto>> GetActiveAdvertisementsAsync();
    Task<AdvertisementDto> CreateAdvertisementAsync(CreateAdvertisementDto dto);
    Task<AdvertisementDto?> UpdateAdvertisementAsync(int id, UpdateAdvertisementDto dto);
    Task<bool> DeleteAdvertisementAsync(int id);
}
