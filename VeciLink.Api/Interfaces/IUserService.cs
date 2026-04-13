using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IUserService
{
    Task<IEnumerable<UserListDto>> GetAllUsersAsync();
    Task<UserProfileDto> GetUserByIdAsync(int id);
    Task<UserProfileDto> UpdateProfileAsync(int userId, UpdateUserProfileDto dto);
    Task DeleteUserAsync(int id);
    Task<bool> ToggleUserStatusAsync(int id, bool isActive);
}
