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

    public async Task<List<ProviderProfileDto>> GetAllProvidersAsync()
    {
        return await _context.ProviderProfiles
            .AsNoTracking()
            .OrderByDescending(pp => pp.IsFeatured)
            .ThenByDescending(pp => pp.RatingAverage)
            .Select(pp => MapToDto(pp))
            .ToListAsync();
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
        // Aggregate ratings live from the Ratings table so providers are
        // always ranked by their real data, regardless of the cached fields.
        var ratingStats = await _context.Ratings
            .AsNoTracking()
            .GroupBy(r => r.Service.ProviderProfileId)
            .Select(g => new
            {
                ProviderProfileId = g.Key,
                Average           = g.Average(r => (double)r.Stars),
                Count             = g.Count()
            })
            .OrderByDescending(g => g.Average)
            .ThenByDescending(g => g.Count)
            .Take(50)
            .ToListAsync();

        if (ratingStats.Count == 0)
            return new List<ProviderRankingDto>();

        var profileIds = ratingStats.Select(rs => rs.ProviderProfileId).ToList();

        var profiles = await _context.ProviderProfiles
            .AsNoTracking()
            .Where(pp => profileIds.Contains(pp.Id))
            .ToDictionaryAsync(pp => pp.Id);

        return ratingStats
            .Where(rs => profiles.ContainsKey(rs.ProviderProfileId))
            .Select(rs =>
            {
                var pp = profiles[rs.ProviderProfileId];
                return new ProviderRankingDto
                {
                    Id            = pp.Id,
                    ProviderId    = pp.Id,
                    ProviderName  = pp.ProviderName,
                    RatingAverage = Math.Round(rs.Average, 2),
                    RatingCount   = rs.Count,
                    Neighborhood  = pp.Neighborhood,
                    PhotoUrl      = pp.PhotoUrl,
                    IsFeatured    = pp.IsFeatured
                };
            })
            .ToList();
    }

    public async Task<bool> ToggleFeaturedAsync(int providerId, bool isFeatured)
    {
        var profile = await _context.ProviderProfiles.FindAsync(providerId);
        if (profile is null) return false;

        profile.IsFeatured = isFeatured;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<ProviderQuotaDto?> GetProviderQuotaAsync(int providerProfileId)
    {
        var profile = await _context.ProviderProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(pp => pp.Id == providerProfileId);

        if (profile is null) return null;

        var activeCount = await _context.Services
            .CountAsync(s => s.ProviderProfileId == providerProfileId && s.IsActive);

        return new ProviderQuotaDto
        {
            ProviderProfileId  = profile.Id,
            MaxServicesAllowed = profile.MaxServicesAllowed,
            ActiveServicesCount = activeCount,
            RemainingSlots     = Math.Max(0, profile.MaxServicesAllowed - activeCount)
        };
    }

    public async Task<bool> UpdateMaxServicesAllowedAsync(int providerProfileId, int newMax)
    {
        if (newMax < 1) return false;

        var profile = await _context.ProviderProfiles.FindAsync(providerProfileId);
        if (profile is null) return false;

        profile.MaxServicesAllowed = newMax;
        profile.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    private static ProviderProfileDto MapToDto(ProviderProfile pp) => new()
    {
        Id                 = pp.Id,
        UserId             = pp.UserId,
        ProviderName       = pp.ProviderName,
        Description        = pp.Description,
        Whatsapp           = pp.Whatsapp,
        Neighborhood       = pp.Neighborhood,
        Zone               = pp.Zone,
        Schedule           = pp.Schedule,
        Availability       = pp.Availability,
        RatingAverage      = pp.RatingAverage,
        RatingCount        = pp.RatingCount,
        IsFeatured         = pp.IsFeatured,
        PhotoUrl           = pp.PhotoUrl,
        MaxServicesAllowed = pp.MaxServicesAllowed,
        CreatedAt          = pp.CreatedAt,
        UpdatedAt          = pp.UpdatedAt
    };
}
