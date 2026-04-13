using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/advertisements")]
public class AdvertisementsController : ControllerBase
{
    private readonly IAdvertisementService _advertisementService;

    public AdvertisementsController(IAdvertisementService advertisementService)
    {
        _advertisementService = advertisementService;
    }

    // GET /api/advertisements — [Authorize(Roles = "Admin")]
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _advertisementService.GetAllAdvertisementsAsync();
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/advertisements/active — público
    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var result = await _advertisementService.GetActiveAdvertisementsAsync();
        return Ok(ApiResponse.Ok(result));
    }

    // POST /api/advertisements — [Authorize(Roles = "Admin")]
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateAdvertisementDto dto)
    {
        var result = await _advertisementService.CreateAdvertisementAsync(dto);
        return CreatedAtAction(nameof(GetActive), ApiResponse.Ok(result, "Anuncio creado correctamente."));
    }

    // PUT /api/advertisements/{id} — [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAdvertisementDto dto)
    {
        var result = await _advertisementService.UpdateAdvertisementAsync(id, dto);
        if (result is null)
            return NotFound(ApiResponse.Fail("Anuncio no encontrado."));

        return Ok(ApiResponse.Ok(result, "Anuncio actualizado correctamente."));
    }

    // DELETE /api/advertisements/{id} — [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _advertisementService.DeleteAdvertisementAsync(id);
        if (!deleted)
            return NotFound(ApiResponse.Fail("Anuncio no encontrado."));

        return NoContent();
    }
}
