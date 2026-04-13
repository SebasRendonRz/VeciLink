using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/favorites")]
[Authorize]
public class FavoritesController : ControllerBase
{
    private readonly IFavoriteService _favoriteService;

    public FavoritesController(IFavoriteService favoriteService)
    {
        _favoriteService = favoriteService;
    }

    // GET /api/favorites — [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _favoriteService.GetFavoritesAsync(userId);
        return Ok(ApiResponse.Ok(result));
    }

    // POST /api/favorites — [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] AddFavoriteDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        try
        {
            var result = await _favoriteService.AddFavoriteAsync(userId, dto.ServiceId);
            return Ok(ApiResponse.Ok(result, "Favorito agregado correctamente."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse.Fail(ex.Message));
        }
    }

    // DELETE /api/favorites/{serviceId} — [Authorize]
    [HttpDelete("{serviceId:int}")]
    public async Task<IActionResult> Remove(int serviceId)
    {
        var userId  = int.Parse(User.FindFirstValue("userId")!);
        var removed = await _favoriteService.RemoveFavoriteAsync(userId, serviceId);

        if (!removed)
            return NotFound(ApiResponse.Fail("Favorito no encontrado."));

        return NoContent();
    }
}
