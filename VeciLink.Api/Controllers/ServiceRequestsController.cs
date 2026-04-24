using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/service-requests")]
public class ServiceRequestsController : ControllerBase
{
    private readonly IServiceRequestService _requestService;

    public ServiceRequestsController(IServiceRequestService requestService)
    {
        _requestService = requestService;
    }

    // POST /api/service-requests — [Authorize(Roles = "Citizen")]
    [HttpPost]
    [Authorize(Roles = "Citizen")]
    public async Task<IActionResult> Create([FromBody] CreateServiceRequestDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _requestService.CreateRequestAsync(userId, dto);
        return Ok(ApiResponse.Ok(result, "Solicitud creada correctamente."));
    }

    // GET /api/service-requests — [Authorize(Roles = "Provider")] (alias de provider-history)
    [HttpGet]
    [Authorize(Roles = "Provider")]
    public async Task<IActionResult> GetRequests()
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _requestService.GetProviderHistoryAsync(userId);
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/service-requests/my-history — [Authorize]
    [HttpGet("my-history")]
    [Authorize]
    public async Task<IActionResult> GetMyHistory([FromQuery] int? categoryId = null)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _requestService.GetMyHistoryAsync(userId, categoryId);
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/service-requests/provider-history — [Authorize(Roles = "Provider")]
    [HttpGet("provider-history")]
    [Authorize(Roles = "Provider")]
    public async Task<IActionResult> GetProviderHistory()
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _requestService.GetProviderHistoryAsync(userId);
        return Ok(ApiResponse.Ok(result));
    }

    // PUT /api/service-requests/{id}/status — [Authorize]
    [HttpPut("{id:int}/status")]
    [Authorize]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateServiceRequestStatusDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _requestService.UpdateStatusAsync(id, userId, dto);

        if (result is null)
            return NotFound(ApiResponse.Fail("Solicitud no encontrada o sin permisos para actualizarla."));

        return Ok(ApiResponse.Ok(result, "Estado actualizado correctamente."));
    }
}
