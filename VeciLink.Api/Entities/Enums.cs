namespace VeciLink.Api.Entities;

public enum UserRole
{
    Citizen = 1,
    Provider = 2,
    Admin = 3
}

public enum NotificationType
{
    Info = 1,
    Success = 2,
    Warning = 3,
    Error = 4
}

public enum ReportStatus
{
    Pending = 1,
    Reviewed = 2,
    Closed = 3
}

public enum ServiceRequestStatus
{
    Pending = 1,
    Contacted = 2,
    Closed = 3
}
