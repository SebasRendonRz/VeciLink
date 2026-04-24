using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class ServiceRequestService : IServiceRequestService
{
    private readonly VeciLinkDbContext _context;
    private readonly INotificationService _notificationService;

    public ServiceRequestService(VeciLinkDbContext context, INotificationService notificationService)
    {
        _context = context;
        _notificationService = notificationService;
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

        var result = await LoadDto(request.Id);

        // Notificar al prestador
        var service = await _context.Services
            .Include(s => s.ProviderProfile)
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == dto.ServiceId);

        if (service?.ProviderProfile is not null)
        {
            var citizen = await _context.Users.FindAsync(userId);
            await _notificationService.CreateNotificationAsync(
                service.ProviderProfile.UserId,
                "Nueva solicitud de contacto",
                $"{citizen?.FullName ?? "Un ciudadano"} se ha contactado por tu servicio '{service.ServiceName}'.",
                NotificationType.Success
            );
        }

        return result;
    }

    public async Task<List<ServiceRequestDto>> GetMyHistoryAsync(int userId, int? categoryId = null)
    {
        var query = _context.ServiceRequests
            .AsNoTracking()
            .Include(r => r.User)
            .Include(r => r.Service).ThenInclude(s => s.ProviderProfile)
            .Include(r => r.Service).ThenInclude(s => s.Category)
            .Where(r => r.UserId == userId);

        if (categoryId.HasValue)
            query = query.Where(r => r.Service.CategoryId == categoryId.Value);

        return await query
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

        // Si el prestador cierra la solicitud, notificar al ciudadano
        if (isProvider && dto.Status == ServiceRequestStatus.Closed)
        {
            var providerName = service?.ProviderProfile?.ProviderName ?? "El prestador";
            await _notificationService.CreateNotificationAsync(
                request.UserId,
                "Solicitud cerrada",
                $"{providerName} ha cerrado tu solicitud para el servicio '{service?.ServiceName}'.",
                NotificationType.Info
            );
        }

        return await LoadDto(request.Id);
    }

    private async Task<ServiceRequestDto> LoadDto(int id)
    {
        var r = await _context.ServiceRequests
            .Include(r => r.User)
            .Include(r => r.Service).ThenInclude(s => s.ProviderProfile)
            .Include(r => r.Service).ThenInclude(s => s.Category)
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
        CategoryId   = r.Service?.CategoryId,
        CategoryName = r.Service?.Category?.Name,
        Status       = r.Status,
        CreatedAt    = r.CreatedAt,
        UpdatedAt    = r.UpdatedAt
    };
}
