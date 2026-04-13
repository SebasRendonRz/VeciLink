using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class NotificationService : INotificationService
{
    private readonly VeciLinkDbContext _context;

    public NotificationService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task CreateNotificationAsync(int userId, string title, string message, NotificationType type)
    {
        _context.Notifications.Add(new Notification
        {
            UserId  = userId,
            Title   = title,
            Message = message,
            Type    = type
        });
        await _context.SaveChangesAsync();
    }

    public async Task<List<NotificationDto>> GetNotificationsAsync(int userId)
    {
        return await _context.Notifications
            .AsNoTracking()
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NotificationDto
            {
                Id        = n.Id,
                Title     = n.Title,
                Message   = n.Message,
                Type      = n.Type,
                IsRead    = n.IsRead,
                CreatedAt = n.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<bool> MarkAsReadAsync(int notificationId, int userId)
    {
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId);

        if (notification is null) return false;

        notification.IsRead = true;
        await _context.SaveChangesAsync();
        return true;
    }
}
