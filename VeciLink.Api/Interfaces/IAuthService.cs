using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;

namespace VeciLink.Api.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterCitizenAsync(RegisterCitizenRequestDto dto);
    Task<AuthResponseDto> RegisterProviderAsync(RegisterProviderRequestDto dto);
    Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
    string GenerateJwtToken(User user);
    Task<CurrentUserDto> GetCurrentUserAsync(int userId);
}
