using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class ProviderService : IProviderService
{
    private readonly VeciLinkDbContext _context;

    public ProviderService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<ProviderProfileDto?> GetProviderProfileAsync(int userId)
    {
        var profile = await _context.ProviderProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(pp => pp.UserId == userId);

        if (profile is null) return null;
        return MapToDto(profile);
    }

    public async Task<ProviderProfileDto> CreateOrUpdateProviderProfileAsync(int userId, CreateProviderProfileDto dto)
    {
        var profile = await _context.ProviderProfiles
            .FirstOrDefaultAsync(pp => pp.UserId == userId);

        if (profile is null)
        {
            profile = new ProviderProfile { UserId = userId };
            _context.ProviderProfiles.Add(profile);
        }
        else
        {
            profile.UpdatedAt = DateTime.UtcNow;
        }

        profile.ProviderName  = dto.ProviderName;
        profile.Description   = dto.Description;
        profile.Whatsapp      = dto.Whatsapp;
        profile.Neighborhood  = dto.Neighborhood;
        profile.Zone          = dto.Zone;
        profile.Schedule      = dto.Schedule;
        profile.Availability  = dto.Availability;
        profile.PhotoUrl      = dto.PhotoUrl;

        await _context.SaveChangesAsync();
        return MapToDto(profile);
    }

    public async Task<List<ProviderProfileDto>> GetFeaturedProvidersAsync()
    {
        return await _context.ProviderProfiles
            .AsNoTracking()
            .Where(pp => pp.IsFeatured)
            .OrderByDescending(pp => pp.RatingAverage)
            .Select(pp => MapToDto(pp))
            .ToListAsync();
    }

    public async Task<List<ProviderRankingDto>> GetProviderRankingAsync()
    {
        return await _context.ProviderProfiles
            .AsNoTracking()
            .Where(pp => pp.RatingCount > 0)
            .OrderByDescending(pp => pp.RatingAverage)
            .ThenByDescending(pp => pp.RatingCount)
            .Take(50)
            .Select(pp => new ProviderRankingDto
            {
                Id              = pp.Id,
                ProviderId      = pp.Id,
                ProviderName    = pp.ProviderName,
                RatingAverage   = pp.RatingAverage,
                RatingCount     = pp.RatingCount,
                Neighborhood    = pp.Neighborhood,
                PhotoUrl        = pp.PhotoUrl,
                IsFeatured      = pp.IsFeatured
            })
            .ToListAsync();
    }

    public async Task<bool> ToggleFeaturedAsync(int providerId, bool isFeatured)
    {
        var profile = await _context.ProviderProfiles.FindAsync(providerId);
        if (profile is null) return false;

        profile.IsFeatured = isFeatured;
        await _context.SaveChangesAsync();
        return true;
    }

    private static ProviderProfileDto MapToDto(ProviderProfile pp) => new()
    {
        Id            = pp.Id,
        UserId        = pp.UserId,
        ProviderName  = pp.ProviderName,
        Description   = pp.Description,
        Whatsapp      = pp.Whatsapp,
        Neighborhood  = pp.Neighborhood,
        Zone          = pp.Zone,
        Schedule      = pp.Schedule,
        Availability  = pp.Availability,
        RatingAverage = pp.RatingAverage,
        RatingCount   = pp.RatingCount,
        IsFeatured    = pp.IsFeatured,
        PhotoUrl      = pp.PhotoUrl,
        CreatedAt     = pp.CreatedAt,
        UpdatedAt     = pp.UpdatedAt
    };
}
