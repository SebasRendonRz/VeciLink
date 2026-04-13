using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class AdvertisementService : IAdvertisementService
{
    private readonly VeciLinkDbContext _context;

    public AdvertisementService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AdvertisementDto>> GetAllAdvertisementsAsync()
    {
        var ads = await _context.Advertisements
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        return ads.Select(MapToDto);
    }

    public async Task<IEnumerable<AdvertisementDto>> GetActiveAdvertisementsAsync()
    {
        var now = DateTime.UtcNow;

        var ads = await _context.Advertisements
            .Where(a => a.IsActive && a.StartDate <= now && a.EndDate >= now)
            .OrderBy(a => a.StartDate)
            .ToListAsync();

        return ads.Select(MapToDto);
    }

    public async Task<AdvertisementDto> CreateAdvertisementAsync(CreateAdvertisementDto dto)
    {
        var ad = new Advertisement
        {
            Title = dto.Title,
            ImageUrl = dto.ImageUrl,
            RedirectUrl = dto.RedirectUrl,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        _context.Advertisements.Add(ad);
        await _context.SaveChangesAsync();

        return MapToDto(ad);
    }

    public async Task<AdvertisementDto?> UpdateAdvertisementAsync(int id, UpdateAdvertisementDto dto)
    {
        var ad = await _context.Advertisements.FindAsync(id);
        if (ad is null) return null;

        ad.Title = dto.Title;
        ad.ImageUrl = dto.ImageUrl;
        ad.RedirectUrl = dto.RedirectUrl;
        ad.StartDate = dto.StartDate;
        ad.EndDate = dto.EndDate;
        ad.IsActive = dto.IsActive;

        await _context.SaveChangesAsync();

        return MapToDto(ad);
    }

    public async Task<bool> DeleteAdvertisementAsync(int id)
    {
        var ad = await _context.Advertisements.FindAsync(id);
        if (ad is null) return false;

        _context.Advertisements.Remove(ad);
        await _context.SaveChangesAsync();

        return true;
    }

    private static AdvertisementDto MapToDto(Advertisement ad) => new()
    {
        Id = ad.Id,
        Title = ad.Title,
        ImageUrl = ad.ImageUrl,
        RedirectUrl = ad.RedirectUrl,
        StartDate = ad.StartDate,
        EndDate = ad.EndDate,
        IsActive = ad.IsActive,
        CreatedAt = ad.CreatedAt
    };
}
