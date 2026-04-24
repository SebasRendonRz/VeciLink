using System.Text.Json;
using System.Text.Json.Serialization;

namespace VeciLink.Api.Helpers;

/// <summary>
/// Ensures all DateTime values are serialized with the 'Z' (UTC) suffix,
/// regardless of the DateTimeKind returned by EF Core (which is Unspecified by default).
/// </summary>
public class UtcDateTimeConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        => DateTime.SpecifyKind(reader.GetDateTime(), DateTimeKind.Utc);

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        => writer.WriteStringValue(DateTime.SpecifyKind(value, DateTimeKind.Utc));
}
