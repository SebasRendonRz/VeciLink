using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    // POST /api/reports — [Authorize]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateReportDto dto)
    {
        var userId = int.Parse(User.FindFirstValue("userId")!);
        var result = await _reportService.CreateReportAsync(userId, dto);
        return Ok(ApiResponse.Ok(result, "Reporte enviado correctamente."));
    }

    // GET /api/reports?status=Pending — [Authorize(Roles = "Admin")]
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll([FromQuery] string? status)
    {
        var result = await _reportService.GetAllReportsAsync(status);
        return Ok(ApiResponse.Ok(result));
    }

    // PUT /api/reports/{id}/status — [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateReportStatusDto dto)
    {
        var result = await _reportService.UpdateReportStatusAsync(id, dto);

        if (result is null)
            return NotFound(ApiResponse.Fail("Reporte no encontrado."));

        return Ok(ApiResponse.Ok(result, "Estado del reporte actualizado."));
    }
}
