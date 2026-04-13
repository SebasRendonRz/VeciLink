using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class RatingService : IRatingService
{
    private readonly VeciLinkDbContext _context;

    public RatingService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<RatingDto> CreateRatingAsync(int userId, CreateRatingDto dto)
    {
        var rating = new Rating
        {
            ServiceId = dto.ServiceId,
            UserId    = userId,
            Stars     = dto.Stars,
            Comment   = dto.Comment
        };

        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();

        // Actualizar RatingAverage y RatingCount en ProviderProfile
        var service = await _context.Services
            .Include(s => s.ProviderProfile)
            .FirstOrDefaultAsync(s => s.Id == dto.ServiceId);

        if (service?.ProviderProfile is not null)
        {
            var allStars = await _context.Ratings
                .Where(r => r.Service.ProviderProfileId == service.ProviderProfileId)
                .Select(r => r.Stars)
                .ToListAsync();

            service.ProviderProfile.RatingCount   = allStars.Count;
            service.ProviderProfile.RatingAverage = allStars.Average();
            await _context.SaveChangesAsync();
        }

        var user = await _context.Users.FindAsync(userId);
        return new RatingDto
        {
            Id           = rating.Id,
            ServiceId    = rating.ServiceId,
            UserId       = rating.UserId,
            UserFullName = user?.FullName,
            Stars        = rating.Stars,
            Comment      = rating.Comment,
            CreatedAt    = rating.CreatedAt
        };
    }

    public async Task<List<RatingDto>> GetRatingsByServiceAsync(int serviceId)
    {
        return await _context.Ratings
            .AsNoTracking()
            .Include(r => r.User)
            .Where(r => r.ServiceId == serviceId)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new RatingDto
            {
                Id           = r.Id,
                ServiceId    = r.ServiceId,
                UserId       = r.UserId,
                UserFullName = r.User.FullName,
                Stars        = r.Stars,
                Comment      = r.Comment,
                CreatedAt    = r.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<RatingSummaryDto> GetRatingSummaryAsync(int serviceId)
    {
        var ratings = await _context.Ratings
            .AsNoTracking()
            .Where(r => r.ServiceId == serviceId)
            .Select(r => r.Stars)
            .ToListAsync();

        var distribution = Enumerable.Range(1, 5)
            .ToDictionary(k => k, k => ratings.Count(r => r == k));

        return new RatingSummaryDto
        {
            ServiceId    = serviceId,
            Count        = ratings.Count,
            Average      = ratings.Count > 0 ? ratings.Average() : 0,
            Distribution = distribution
        };
    }
}
