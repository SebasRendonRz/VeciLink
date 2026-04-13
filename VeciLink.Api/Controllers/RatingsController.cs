using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/ratings")]
public class RatingsController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingsController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    // POST /api/ratings — [Authorize(Roles = "Citizen")]
    [HttpPost]
    [Authorize(Roles = "Citizen")]
    public async Task<IActionResult> Create([FromBody] CreateRatingDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _ratingService.CreateRatingAsync(userId, dto);
        return CreatedAtAction(nameof(GetByService), new { serviceId = result.ServiceId }, ApiResponse.Ok(result, "Calificación registrada correctamente."));
    }

    // GET /api/ratings/service/{serviceId} — público
    [HttpGet("service/{serviceId:int}")]
    public async Task<IActionResult> GetByService(int serviceId)
    {
        var result = await _ratingService.GetRatingsByServiceAsync(serviceId);
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/ratings/service/{serviceId}/summary — público
    [HttpGet("service/{serviceId:int}/summary")]
    public async Task<IActionResult> GetSummary(int serviceId)
    {
        var result = await _ratingService.GetRatingSummaryAsync(serviceId);
        return Ok(ApiResponse.Ok(result));
    }
}
