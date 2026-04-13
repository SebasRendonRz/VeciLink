using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly VeciLinkDbContext _context;

    public CategoryService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CategoryDto>> GetActiveCategoriesAsync()
    {
        return await _context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .Select(c => MapToDto(c))
            .ToListAsync();
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        return await _context.Categories
            .OrderBy(c => c.Name)
            .Select(c => MapToDto(c))
            .ToListAsync();
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
    {
        if (await _context.Categories.AnyAsync(c => c.Name == dto.Name))
            throw new InvalidOperationException("Ya existe una categoría con ese nombre.");

        var category = new Category
        {
            Name = dto.Name,
            Description = dto.Description,
            Icon = dto.Icon,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return MapToDto(category);
    }

    public async Task<CategoryDto> UpdateCategoryAsync(int id, UpdateCategoryDto dto)
    {
        var category = await _context.Categories.FindAsync(id)
            ?? throw new KeyNotFoundException("Categoría no encontrada.");

        if (!string.IsNullOrWhiteSpace(dto.Name))
            category.Name = dto.Name;

        if (dto.Description != null)
            category.Description = dto.Description;

        if (dto.Icon != null)
            category.Icon = dto.Icon;

        if (dto.IsActive.HasValue)
            category.IsActive = dto.IsActive.Value;

        await _context.SaveChangesAsync();

        return MapToDto(category);
    }

    public async Task DeleteCategoryAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id)
            ?? throw new KeyNotFoundException("Categoría no encontrada.");

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
    }

    private static CategoryDto MapToDto(Category c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        Description = c.Description,
        Icon = c.Icon,
        IsActive = c.IsActive
    };
}
