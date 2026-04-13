using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetActiveCategoriesAsync();
    Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
    Task<CategoryDto> UpdateCategoryAsync(int id, UpdateCategoryDto dto);
    Task DeleteCategoryAsync(int id);
}
