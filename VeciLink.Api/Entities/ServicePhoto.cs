namespace VeciLink.Api.Entities;

public class ServicePhoto
{
    public int Id { get; set; }
    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;
    public string ImageUrl { get; set; } = string.Empty;
    public int Order { get; set; } = 0;
}
