using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class UserService : IUserService
{
    private readonly VeciLinkDbContext _context;

    public UserService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserListDto>> GetAllUsersAsync()
    {
        return await _context.Users
            .OrderByDescending(u => u.CreatedAt)
            .Select(u => new UserListDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email,
                Role = u.Role.ToString(),
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<UserProfileDto> GetUserByIdAsync(int id)
    {
        var user = await _context.Users.FindAsync(id)
            ?? throw new KeyNotFoundException("Usuario no encontrado.");

        return MapToProfileDto(user);
    }

    public async Task<UserProfileDto> UpdateProfileAsync(int userId, UpdateUserProfileDto dto)
    {
        var user = await _context.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("Usuario no encontrado.");

        if (!string.IsNullOrWhiteSpace(dto.FullName))
            user.FullName = dto.FullName;

        if (dto.Phone != null)
            user.Phone = dto.Phone;

        if (dto.Neighborhood != null)
            user.Neighborhood = dto.Neighborhood;

        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return MapToProfileDto(user);
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id)
            ?? throw new KeyNotFoundException("Usuario no encontrado.");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ToggleUserStatusAsync(int id, bool isActive)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null) return false;

        user.IsActive  = isActive;
        user.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    private static UserProfileDto MapToProfileDto(User user) => new()
    {
        Id = user.Id,
        FullName = user.FullName,
        Email = user.Email,
        Phone = user.Phone,
        Role = user.Role.ToString(),
        Neighborhood = user.Neighborhood,
        IsActive = user.IsActive,
        CreatedAt = user.CreatedAt
    };
}
