namespace VeciLink.Api.Entities;

public class Report
{
    public int Id { get; set; }
    public int ReporterUserId { get; set; }
    public User Reporter { get; set; } = null!;
    public int? ReportedUserId { get; set; }
    public User? ReportedUser { get; set; }
    public int? ReportedServiceId { get; set; }
    public Service? ReportedService { get; set; }
    public string Reason { get; set; } = string.Empty;
    public ReportStatus Status { get; set; } = ReportStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReviewedAt { get; set; }
}
