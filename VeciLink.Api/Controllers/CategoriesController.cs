using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeciLink.Api.DTOs;
using VeciLink.Api.Helpers;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly ILogger<CategoriesController> _logger;

    public CategoriesController(ICategoryService categoryService, ILogger<CategoriesController> logger)
    {
        _categoryService = categoryService;
        _logger = logger;
    }

    /// <summary>Listar categorías activas (público)</summary>
    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = User.Identity?.IsAuthenticated == true && User.IsInRole("Admin")
            ? await _categoryService.GetAllCategoriesAsync()
            : await _categoryService.GetActiveCategoriesAsync();
        return Ok(ApiResponse.Ok(categories));
    }

    /// <summary>Crear una nueva categoría (solo Admin)</summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto dto)
    {
        try
        {
            var result = await _categoryService.CreateCategoryAsync(dto);
            return StatusCode(201, ApiResponse.Ok(result, "Categoría creada correctamente."));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Actualizar una categoría existente (solo Admin)</summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto dto)
    {
        try
        {
            var result = await _categoryService.UpdateCategoryAsync(id, dto);
            return Ok(ApiResponse.Ok(result, "Categoría actualizada correctamente."));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse.Fail(ex.Message));
        }
    }

    /// <summary>Eliminar una categoría (solo Admin)</summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        try
        {
            await _categoryService.DeleteCategoryAsync(id);
            return Ok(ApiResponse.Ok("Categoría eliminada correctamente."));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse.Fail(ex.Message));
        }
    }
}
