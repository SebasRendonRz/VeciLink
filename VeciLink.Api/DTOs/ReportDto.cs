using VeciLink.Api.Entities;

namespace VeciLink.Api.DTOs;

public class CreateReportDto
{
    public int? ReportedUserId { get; set; }
    public int? ReportedServiceId { get; set; }
    public string Reason { get; set; } = string.Empty;
}

public class ReportDto
{
    public int Id { get; set; }
    public int ReporterUserId { get; set; }
    public string? ReporterFullName { get; set; }
    public int? ReportedUserId { get; set; }
    public int? ReportedServiceId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public ReportStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ReviewedAt { get; set; }
}

public class UpdateReportStatusDto
{
    public ReportStatus Status { get; set; }
}
