namespace VeciLink.Api.Helpers;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
    public List<string> Errors { get; set; } = new();
}

/// <summary>Static factory helpers for ApiResponse&lt;T&gt;</summary>
public static class ApiResponse
{
    public static ApiResponse<T> Ok<T>(T data, string? message = null) =>
        new() { Success = true, Data = data, Message = message };

    public static ApiResponse<object?> Ok(string message) =>
        new() { Success = true, Message = message };

    public static ApiResponse<object?> Fail(string message, List<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors ?? new() };
}
