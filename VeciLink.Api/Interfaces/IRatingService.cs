using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IRatingService
{
    Task<RatingDto> CreateRatingAsync(int userId, CreateRatingDto dto);
    Task<List<RatingDto>> GetRatingsByServiceAsync(int serviceId);
    Task<RatingSummaryDto> GetRatingSummaryAsync(int serviceId);
}
