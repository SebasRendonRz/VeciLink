using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;

namespace VeciLink.Api.Interfaces;

public interface INotificationService
{
    Task CreateNotificationAsync(int userId, string title, string message, NotificationType type);
    Task<List<NotificationDto>> GetNotificationsAsync(int userId);
    Task<bool> MarkAsReadAsync(int notificationId, int userId);
}
