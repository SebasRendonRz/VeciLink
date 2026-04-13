using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Data;
using VeciLink.Api.DTOs;
using VeciLink.Api.Entities;
using VeciLink.Api.Interfaces;

namespace VeciLink.Api.Services;

public class ReportService : IReportService
{
    private readonly VeciLinkDbContext _context;

    public ReportService(VeciLinkDbContext context)
    {
        _context = context;
    }

    public async Task<ReportDto> CreateReportAsync(int reporterUserId, CreateReportDto dto)
    {
        var report = new Report
        {
            ReporterUserId    = reporterUserId,
            ReportedUserId    = dto.ReportedUserId,
            ReportedServiceId = dto.ReportedServiceId,
            Reason            = dto.Reason
        };

        _context.Reports.Add(report);
        await _context.SaveChangesAsync();

        return await LoadDto(report.Id);
    }

    public async Task<List<ReportDto>> GetAllReportsAsync(string? status = null)
    {
        var query = _context.Reports
            .AsNoTracking()
            .Include(r => r.Reporter)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<ReportStatus>(status, ignoreCase: true, out var parsedStatus))
        {
            query = query.Where(r => r.Status == parsedStatus);
        }

        return await query
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => MapToDto(r))
            .ToListAsync();
    }

    public async Task<ReportDto?> UpdateReportStatusAsync(int reportId, UpdateReportStatusDto dto)
    {
        var report = await _context.Reports.FindAsync(reportId);
        if (report is null) return null;

        report.Status     = dto.Status;
        report.ReviewedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return await LoadDto(report.Id);
    }

    private async Task<ReportDto> LoadDto(int id)
    {
        var r = await _context.Reports
            .Include(r => r.Reporter)
            .FirstAsync(r => r.Id == id);
        return MapToDto(r);
    }

    private static ReportDto MapToDto(Report r) => new()
    {
        Id                = r.Id,
        ReporterUserId    = r.ReporterUserId,
        ReporterFullName  = r.Reporter?.FullName,
        ReportedUserId    = r.ReportedUserId,
        ReportedServiceId = r.ReportedServiceId,
        Reason            = r.Reason,
        Status            = r.Status,
        CreatedAt         = r.CreatedAt,
        ReviewedAt        = r.ReviewedAt
    };
}
