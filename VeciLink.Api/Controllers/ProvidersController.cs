using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/providers")]
public class ProvidersController : ControllerBase
{
    private readonly IProviderService _providerService;

    public ProvidersController(IProviderService providerService)
    {
        _providerService = providerService;
    }

    // GET /api/providers/featured — público
    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured()
    {
        var result = await _providerService.GetFeaturedProvidersAsync();
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/providers/ranking — público
    [HttpGet("ranking")]
    public async Task<IActionResult> GetRanking()
    {
        var result = await _providerService.GetProviderRankingAsync();
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/providers/{id} — público (por userId)
    [HttpGet("{userId:int}")]
    public async Task<IActionResult> GetProfile(int userId)
    {
        var result = await _providerService.GetProviderProfileAsync(userId);
        if (result is null)
            return NotFound(ApiResponse.Fail("Perfil de prestador no encontrado."));

        return Ok(ApiResponse.Ok(result));
    }

    // PUT /api/providers/profile — [Authorize(Roles = "Provider")]
    [HttpPut("profile")]
    [Authorize(Roles = "Provider")]
    public async Task<IActionResult> UpdateProfile([FromBody] CreateProviderProfileDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _providerService.CreateOrUpdateProviderProfileAsync(userId, dto);
        return Ok(ApiResponse.Ok(result, "Perfil actualizado correctamente."));
    }

    // PUT /api/providers/{id}/featured — [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/featured")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ToggleFeatured(int id, [FromQuery] bool isFeatured)
    {
        var success = await _providerService.ToggleFeaturedAsync(id, isFeatured);
        if (!success)
            return NotFound(ApiResponse.Fail("Perfil de prestador no encontrado."));

        return Ok(ApiResponse.Ok($"Prestador {(isFeatured ? "marcado como destacado" : "quitado de destacados")}."));
    }
}
