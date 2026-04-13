using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/notifications")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationsController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    // GET /api/notifications — [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _notificationService.GetNotificationsAsync(userId);
        return Ok(ApiResponse.Ok(result));
    }

    // PUT /api/notifications/{id}/read — [Authorize]
    [HttpPut("{id:int}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var userId  = int.Parse(User.FindFirstValue("userId")!);
        var success = await _notificationService.MarkAsReadAsync(id, userId);

        if (!success)
            return NotFound(ApiResponse.Fail("Notificación no encontrada."));

        return Ok(ApiResponse.Ok("Notificación marcada como leída."));
    }
}
