using VeciLink.Api.DTOs;

namespace VeciLink.Api.Interfaces;

public interface IReportService
{
    Task<ReportDto> CreateReportAsync(int reporterUserId, CreateReportDto dto);
    Task<List<ReportDto>> GetAllReportsAsync(string? status = null);
    Task<ReportDto?> UpdateReportStatusAsync(int reportId, UpdateReportStatusDto dto);
}
