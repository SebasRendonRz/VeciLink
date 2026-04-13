namespace VeciLink.Api.DTOs;

public class CreateRatingDto
{
    public int ServiceId { get; set; }
    public int Stars { get; set; }
    public string? Comment { get; set; }
}

public class RatingDto
{
    public int Id { get; set; }
    public int ServiceId { get; set; }
    public int UserId { get; set; }
    public string? UserFullName { get; set; }
    public int Stars { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class RatingSummaryDto
{
    public int ServiceId { get; set; }
    public double Average { get; set; }
    public int Count { get; set; }
    public Dictionary<int, int> Distribution { get; set; } = new();
}
