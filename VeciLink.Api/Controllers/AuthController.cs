using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>Registrar un ciudadano nuevo</summary>
    [HttpPost("register/citizen")]
    public async Task<IActionResult> RegisterCitizen([FromBody] RegisterCitizenRequestDto dto)
    {
        try
        {
            var result = await _authService.RegisterCitizenAsync(dto);
            return StatusCode(201, ApiResponse.Ok(result, "Ciudadano registrado correctamente."));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Registrar un prestador de servicios nuevo</summary>
    [HttpPost("register/provider")]
    public async Task<IActionResult> RegisterProvider([FromBody] RegisterProviderRequestDto dto)
    {
        try
        {
            var result = await _authService.RegisterProviderAsync(dto);
            return StatusCode(201, ApiResponse.Ok(result, "Prestador registrado correctamente."));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Iniciar sesión y obtener token JWT</summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
    {
        try
        {
            var result = await _authService.LoginAsync(dto);
            return Ok(ApiResponse.Ok(result, "Sesión iniciada correctamente."));
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Obtener perfil del usuario autenticado</summary>
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirstValue("userId");
        if (!int.TryParse(userIdClaim, out int userId))
            return Unauthorized(ApiResponse.Fail("Token inválido."));

        try
        {
            var result = await _authService.GetCurrentUserAsync(userId);
            return Ok(ApiResponse.Ok(result));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse.Fail(ex.Message));
        }
    }
}
