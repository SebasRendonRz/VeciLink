using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase
{
    private readonly IServiceService _serviceService;

    public ServicesController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    // GET /api/services?categoryId=1&neighborhood=...&keyword=... — público
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] ServiceFilterDto filters)
    {
        var result = await _serviceService.GetServicesAsync(filters);
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/services/map — público
    [HttpGet("map")]
    public async Task<IActionResult> GetMap([FromQuery] ServiceFilterDto filters)
    {
        var result = await _serviceService.GetServicesForMapAsync(filters);
        return Ok(ApiResponse.Ok(result));
    }

    // GET /api/services/{id} — público
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _serviceService.GetServiceByIdAsync(id);
        if (result is null)
            return NotFound(ApiResponse.Fail("Servicio no encontrado."));

        return Ok(ApiResponse.Ok(result));
    }

    // POST /api/services — [Authorize(Roles = "Provider")]
    [HttpPost]
    [Authorize(Roles = "Provider")]
    public async Task<IActionResult> Create([FromBody] CreateServiceDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        try
        {
            var result = await _serviceService.CreateServiceAsync(userId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponse.Ok(result, "Servicio creado correctamente."));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse.Fail(ex.Message));
        }
    }

    // PUT /api/services/{id} — [Authorize(Roles = "Provider")]
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Provider")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateServiceDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _serviceService.UpdateServiceAsync(userId, id, dto);

        if (result is null)
            return NotFound(ApiResponse.Fail("Servicio no encontrado o no tienes permisos para editarlo."));

        return Ok(ApiResponse.Ok(result, "Servicio actualizado correctamente."));
    }

    // DELETE /api/services/{id} — [Authorize(Roles = "Provider,Admin")]
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Provider,Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId  = int.Parse(User.FindFirstValue("userId")!);
        var isAdmin = User.IsInRole("Admin");
        var deleted = await _serviceService.DeleteServiceAsync(userId, id, isAdmin);

        if (!deleted)
            return NotFound(ApiResponse.Fail("Servicio no encontrado o no tienes permisos para eliminarlo."));

        return NoContent();
    }

    // PUT /api/services/{id}/featured — [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/featured")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ToggleFeatured(int id, [FromQuery] bool isFeatured)
    {
        var success = await _serviceService.ToggleFeaturedAsync(id, isFeatured);
        if (!success)
            return NotFound(ApiResponse.Fail("Servicio no encontrado."));

        return Ok(ApiResponse.Ok($"Servicio {(isFeatured ? "marcado como destacado" : "quitado de destacados")}."));
    }

    // PUT /api/services/{id}/active — [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/active")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ToggleActive(int id, [FromQuery] bool isActive)
    {
        var success = await _serviceService.ToggleActiveAsync(id, isActive);
        if (!success)
            return NotFound(ApiResponse.Fail("Servicio no encontrado."));

        return Ok(ApiResponse.Ok($"Servicio {(isActive ? "activado" : "desactivado")}."));
    }
}
