using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class ServiceRequestService : IServiceRequestService
{
    private readonly VeciLinkDbContext _context;

    public ServiceRequestService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<ServiceRequestDto> CreateRequestAsync(int userId, CreateServiceRequestDto dto)
    {
        var request = new ServiceRequest
        {
            UserId    = userId,
            ServiceId = dto.ServiceId
        };

        _context.ServiceRequests.Add(request);
        await _context.SaveChangesAsync();

        return await LoadDto(request.Id);
    }

    public async Task<List<ServiceRequestDto>> GetMyHistoryAsync(int userId)
    {
        return await _context.ServiceRequests
            .AsNoTracking()
            .Include(r => r.User)
            .Include(r => r.Service).ThenInclude(s => s.ProviderProfile)
            .Where(r => r.UserId == userId)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => MapToDto(r))
            .ToListAsync();
    }

    public async Task<List<ServiceRequestDto>> GetProviderHistoryAsync(int userId)
    {
        var profile = await _context.ProviderProfiles
            .AsNoTracking()
            .FirstOrDefaultAsync(pp => pp.UserId == userId);

        if (profile is null) return new List<ServiceRequestDto>();

        return await _context.ServiceRequests
            .AsNoTracking()
            .Include(r => r.User)
            .Include(r => r.Service).ThenInclude(s => s.ProviderProfile)
            .Where(r => r.Service.ProviderProfileId == profile.Id)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => MapToDto(r))
            .ToListAsync();
    }

    public async Task<ServiceRequestDto?> UpdateStatusAsync(int requestId, int userId, UpdateServiceRequestStatusDto dto)
    {
        var request = await _context.ServiceRequests.FindAsync(requestId);
        if (request is null) return null;

        // Solo el ciudadano que creó la solicitud o el prestador del servicio puede actualizar
        var service = await _context.Services
            .Include(s => s.ProviderProfile)
            .FirstOrDefaultAsync(s => s.Id == request.ServiceId);

        bool isCitizen  = request.UserId == userId;
        bool isProvider = service?.ProviderProfile?.UserId == userId;

        if (!isCitizen && !isProvider) return null;

        request.Status    = dto.Status;
        request.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return await LoadDto(request.Id);
    }

    private async Task<ServiceRequestDto> LoadDto(int id)
    {
        var r = await _context.ServiceRequests
            .Include(r => r.User)
            .Include(r => r.Service).ThenInclude(s => s.ProviderProfile)
            .FirstAsync(r => r.Id == id);
        return MapToDto(r);
    }

    private static ServiceRequestDto MapToDto(ServiceRequest r) => new()
    {
        Id           = r.Id,
        UserId       = r.UserId,
        UserFullName = r.User?.FullName,
        ServiceId    = r.ServiceId,
        ServiceName  = r.Service?.ServiceName,
        ProviderName = r.Service?.ProviderProfile?.ProviderName,
        Status       = r.Status,
        CreatedAt    = r.CreatedAt,
        UpdatedAt    = r.UpdatedAt
    };
}
