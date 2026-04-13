using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IFavoriteService
{
    Task<FavoriteDto> AddFavoriteAsync(int userId, int serviceId);
    Task<bool> RemoveFavoriteAsync(int userId, int serviceId);
    Task<List<FavoriteDto>> GetFavoritesAsync(int userId);
}
