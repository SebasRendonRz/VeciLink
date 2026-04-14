using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class ServiceService : IServiceService
{
    private readonly VeciLinkDbContext _context;

    public ServiceService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<List<ServiceListDto>> GetServicesAsync(ServiceFilterDto filters)
    {
        var query = _context.Services
            .AsNoTracking()
            .Include(s => s.Category)
            .Include(s => s.ProviderProfile)
            .Where(s => s.IsActive);

        if (filters.CategoryId.HasValue)
            query = query.Where(s => s.CategoryId == filters.CategoryId.Value);

        if (!string.IsNullOrWhiteSpace(filters.Neighborhood))
            query = query.Where(s => s.Neighborhood != null &&
                s.Neighborhood.Contains(filters.Neighborhood));

        if (!string.IsNullOrWhiteSpace(filters.Keyword))
            query = query.Where(s =>
                s.ServiceName.Contains(filters.Keyword) ||
                (s.Description != null && s.Description.Contains(filters.Keyword)));

        if (filters.IsFeatured.HasValue)
            query = query.Where(s => s.IsFeatured == filters.IsFeatured.Value);

        if (filters.ProviderIsFeatured.HasValue)
            query = query.Where(s => s.ProviderProfile != null &&
                s.ProviderProfile.IsFeatured == filters.ProviderIsFeatured.Value);

        if (filters.ProviderProfileId.HasValue)
            query = query.Where(s => s.ProviderProfileId == filters.ProviderProfileId.Value);

        var services = await query
            .OrderByDescending(s => s.IsFeatured)
            .ThenByDescending(s => s.CreatedAt)
            .ToListAsync();

        // Filtro por radio si se proporcionan coordenadas
        if (filters.Latitude.HasValue && filters.Longitude.HasValue && filters.RadiusKm.HasValue)
        {
            services = services.Where(s =>
                s.Latitude.HasValue && s.Longitude.HasValue &&
                CalculateDistanceKm(filters.Latitude.Value, filters.Longitude.Value,
                    s.Latitude.Value, s.Longitude.Value) <= filters.RadiusKm.Value
            ).ToList();
        }

        return services.Select(MapToListDto).ToList();
    }

    public async Task<ServiceDetailDto?> GetServiceByIdAsync(int id)
    {
        var service = await _context.Services
            .AsNoTracking()
            .Include(s => s.Category)
            .Include(s => s.ProviderProfile)
            .Include(s => s.Photos.OrderBy(p => p.Order))
            .FirstOrDefaultAsync(s => s.Id == id);

        return service is null ? null : MapToDetailDto(service);
    }

    public async Task<ServiceDetailDto> CreateServiceAsync(int userId, CreateServiceDto dto)
    {
        var profile = await _context.ProviderProfiles
            .FirstOrDefaultAsync(pp => pp.UserId == userId)
            ?? throw new InvalidOperationException("El prestador no tiene un perfil creado.");

        var service = new Service
        {
            ProviderProfileId = profile.Id,
            CategoryId        = dto.CategoryId,
            ServiceName       = dto.ServiceName,
            Description       = dto.Description,
            Neighborhood      = dto.Neighborhood,
            Zone              = dto.Zone,
            Whatsapp          = dto.Whatsapp,
            Schedule          = dto.Schedule,
            Availability      = dto.Availability,
            Price             = dto.Price,
            Latitude          = dto.Latitude,
            Longitude         = dto.Longitude
        };

        _context.Services.Add(service);
        await _context.SaveChangesAsync();

        return (await GetServiceByIdAsync(service.Id))!;
    }

    public async Task<ServiceDetailDto?> UpdateServiceAsync(int userId, int serviceId, UpdateServiceDto dto)
    {
        var profile = await _context.ProviderProfiles
            .FirstOrDefaultAsync(pp => pp.UserId == userId);

        if (profile is null) return null;

        var service = await _context.Services
            .FirstOrDefaultAsync(s => s.Id == serviceId && s.ProviderProfileId == profile.Id);

        if (service is null) return null;

        service.CategoryId   = dto.CategoryId;
        service.ServiceName  = dto.ServiceName;
        service.Description  = dto.Description;
        service.Neighborhood = dto.Neighborhood;
        service.Zone         = dto.Zone;
        service.Whatsapp     = dto.Whatsapp;
        service.Schedule     = dto.Schedule;
        service.Availability = dto.Availability;
        service.Price        = dto.Price;
        service.Latitude     = dto.Latitude;
        service.Longitude    = dto.Longitude;
        service.IsActive     = dto.IsActive;
        service.UpdatedAt    = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return (await GetServiceByIdAsync(service.Id))!;
    }

    public async Task<bool> DeleteServiceAsync(int userId, int serviceId, bool isAdmin)
    {
        Service? service;

        if (isAdmin)
        {
            service = await _context.Services.FindAsync(serviceId);
        }
        else
        {
            var profile = await _context.ProviderProfiles
                .FirstOrDefaultAsync(pp => pp.UserId == userId);

            if (profile is null) return false;

            service = await _context.Services
                .FirstOrDefaultAsync(s => s.Id == serviceId && s.ProviderProfileId == profile.Id);
        }

        if (service is null) return false;

        _context.Services.Remove(service);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<ServiceMapDto>> GetServicesForMapAsync(ServiceFilterDto filters)
    {
        var query = _context.Services
            .AsNoTracking()
            .Include(s => s.Category)
            .Include(s => s.ProviderProfile)
            .Where(s => s.IsActive && s.Latitude.HasValue && s.Longitude.HasValue);

        if (filters.CategoryId.HasValue)
            query = query.Where(s => s.CategoryId == filters.CategoryId.Value);

        if (!string.IsNullOrWhiteSpace(filters.Neighborhood))
            query = query.Where(s => s.Neighborhood != null &&
                s.Neighborhood.Contains(filters.Neighborhood));

        var services = await query.ToListAsync();

        if (filters.Latitude.HasValue && filters.Longitude.HasValue && filters.RadiusKm.HasValue)
        {
            services = services.Where(s =>
                CalculateDistanceKm(filters.Latitude.Value, filters.Longitude.Value,
                    s.Latitude!.Value, s.Longitude!.Value) <= filters.RadiusKm.Value
            ).ToList();
        }

        return services.Select(s => new ServiceMapDto
        {
            Id           = s.Id,
            ServiceName  = s.ServiceName,
            Latitude     = s.Latitude,
            Longitude    = s.Longitude,
            Neighborhood = s.Neighborhood,
            CategoryName = s.Category?.Name,
            ProviderName = s.ProviderProfile?.ProviderName
        }).ToList();
    }

    // Haversine formula — distancia en km
    private static double CalculateDistanceKm(double lat1, double lon1, double lat2, double lon2)
    {
        const double R = 6371;
        var dLat = ToRad(lat2 - lat1);
        var dLon = ToRad(lon2 - lon1);
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRad(lat1)) * Math.Cos(ToRad(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        return R * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
    }

    private static double ToRad(double deg) => deg * Math.PI / 180;

    private static ServiceListDto MapToListDto(Service s) => new()
    {
        Id                  = s.Id,
        ServiceName         = s.ServiceName,
        Neighborhood        = s.Neighborhood,
        Zone                = s.Zone,
        Price               = s.Price,
        IsFeatured          = s.IsFeatured,
        IsActive            = s.IsActive,
        CategoryName        = s.Category?.Name,
        ProviderProfileId   = s.ProviderProfileId,
        ProviderUserId      = s.ProviderProfile?.UserId ?? 0,
        ProviderName        = s.ProviderProfile?.ProviderName,
        ProviderRatingAverage = s.ProviderProfile?.RatingAverage ?? 0,
        CreatedAt           = s.CreatedAt
    };

    private static ServiceDetailDto MapToDetailDto(Service s) => new()
    {
        Id                  = s.Id,
        ServiceName         = s.ServiceName,
        Description         = s.Description,
        Neighborhood        = s.Neighborhood,
        Zone                = s.Zone,
        Whatsapp            = s.Whatsapp,
        Schedule            = s.Schedule,
        Availability        = s.Availability,
        Price               = s.Price,
        Latitude            = s.Latitude,
        Longitude           = s.Longitude,
        IsFeatured          = s.IsFeatured,
        IsActive            = s.IsActive,
        CreatedAt           = s.CreatedAt,
        UpdatedAt           = s.UpdatedAt,
        CategoryId          = s.CategoryId,
        CategoryName        = s.Category?.Name,
        ProviderProfileId   = s.ProviderProfileId,
        ProviderUserId      = s.ProviderProfile?.UserId ?? 0,
        ProviderName        = s.ProviderProfile?.ProviderName,
        ProviderRatingAverage = s.ProviderProfile?.RatingAverage ?? 0,
        ProviderRatingCount = s.ProviderProfile?.RatingCount ?? 0,
        ProviderPhotoUrl    = s.ProviderProfile?.PhotoUrl,
        Photos              = s.Photos.Select(p => new ServicePhotoDto
        {
            Id       = p.Id,
            ImageUrl = p.ImageUrl,
            Order    = p.Order
        }).ToList()
    };

    public async Task<bool> ToggleFeaturedAsync(int serviceId, bool isFeatured)
    {
        var service = await _context.Services.FindAsync(serviceId);
        if (service is null) return false;

        service.IsFeatured = isFeatured;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ToggleActiveAsync(int serviceId, bool isActive)
    {
        var service = await _context.Services.FindAsync(serviceId);
        if (service is null) return false;

        service.IsActive  = isActive;
        service.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }
}
