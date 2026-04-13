using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class FavoriteService : IFavoriteService
{
    private readonly VeciLinkDbContext _context;

    public FavoriteService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<FavoriteDto> AddFavoriteAsync(int userId, int serviceId)
    {
        var exists = await _context.Favorites
            .AnyAsync(f => f.UserId == userId && f.ServiceId == serviceId);

        if (exists)
            throw new InvalidOperationException("El servicio ya está en favoritos.");

        var favorite = new Favorite { UserId = userId, ServiceId = serviceId };
        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();

        var service = await _context.Services
            .AsNoTracking()
            .Include(s => s.ProviderProfile)
            .FirstOrDefaultAsync(s => s.Id == serviceId);

        return new FavoriteDto
        {
            Id           = favorite.Id,
            ServiceId    = favorite.ServiceId,
            ServiceName  = service?.ServiceName,
            ProviderName = service?.ProviderProfile?.ProviderName,
            Neighborhood = service?.Neighborhood,
            CreatedAt    = favorite.CreatedAt
        };
    }

    public async Task<bool> RemoveFavoriteAsync(int userId, int serviceId)
    {
        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.ServiceId == serviceId);

        if (favorite is null) return false;

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<FavoriteDto>> GetFavoritesAsync(int userId)
    {
        return await _context.Favorites
            .AsNoTracking()
            .Include(f => f.Service)
                .ThenInclude(s => s.ProviderProfile)
            .Where(f => f.UserId == userId)
            .OrderByDescending(f => f.CreatedAt)
            .Select(f => new FavoriteDto
            {
                Id           = f.Id,
                ServiceId    = f.ServiceId,
                ServiceName  = f.Service.ServiceName,
                ProviderName = f.Service.ProviderProfile.ProviderName,
                Neighborhood = f.Service.Neighborhood,
                CreatedAt    = f.CreatedAt
            })
            .ToListAsync();
    }
}
