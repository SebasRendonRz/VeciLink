using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(IUserService userService, ILogger<UsersController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    /// <summary>Listar todos los usuarios (solo Admin)</summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(ApiResponse.Ok(users));
    }

    /// <summary>Obtener un usuario por ID</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(ApiResponse.Ok(user));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Actualizar perfil propio del usuario autenticado</summary>
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileDto dto)
    {
        var userIdClaim = User.FindFirstValue("userId");
        if (!int.TryParse(userIdClaim, out int userId))
            return Unauthorized(ApiResponse.Fail("Token inválido."));

        try
        {
            var result = await _userService.UpdateProfileAsync(userId, dto);
            return Ok(ApiResponse.Ok(result, "Perfil actualizado correctamente."));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Eliminar usuario por ID (solo Admin)</summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            await _userService.DeleteUserAsync(id);
            return Ok(ApiResponse.Ok("Usuario eliminado correctamente."));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Activar o desactivar usuario (solo Admin)</summary>
    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ToggleStatus(int id, [FromQuery] bool isActive)
    {
        var success = await _userService.ToggleUserStatusAsync(id, isActive);
        if (!success)
            return NotFound(ApiResponse.Fail("Usuario no encontrado."));

        return Ok(ApiResponse.Ok($"Usuario {(isActive ? "activado" : "desactivado")} correctamente."));
    }
}
