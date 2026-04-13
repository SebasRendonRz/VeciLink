using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Entities;

namespace VeciLink.Api.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(VeciLinkDbContext context)
    {
        try
        {
            // ── Usuario administrador ──────────────────────────────────
            if (!await context.Users.AnyAsync(u => u.Role == UserRole.Admin))
            {
                var hasher = new PasswordHasher<User>();
                var admin = new User
                {
                    FullName = "Administrador VeciLink",
                    Email = "admin@vecilink.com",
                    Phone = "0000000000",
                    Role = UserRole.Admin,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                admin.PasswordHash = hasher.HashPassword(admin, "Admin1234!");

                context.Users.Add(admin);
                await context.SaveChangesAsync();
            }

            // ── Categorías iniciales ───────────────────────────────────
            if (!await context.Categories.AnyAsync())
            {
                var categories = new[]
                {
                    new Category { Name = "Electricidad",           Description = "Servicios eléctricos y reparaciones",        Icon = "bolt",       IsActive = true, CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Plomería",               Description = "Servicios de fontanería y tuberías",          Icon = "plumbing",   IsActive = true, CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Tecnología",             Description = "Soporte técnico y reparación de equipos",     Icon = "devices",    IsActive = true, CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Belleza",                Description = "Peluquería, estética y cosmetología",         Icon = "spa",        IsActive = true, CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Domicilios",             Description = "Entregas y mensajería a domicilio",           Icon = "delivery",   IsActive = true, CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Clases particulares",    Description = "Tutorías y enseñanza personalizada",          Icon = "school",     IsActive = true, CreatedAt = DateTime.UtcNow },
                    new Category { Name = "Reparaciones generales", Description = "Mantenimiento y reparaciones del hogar",      Icon = "build",      IsActive = true, CreatedAt = DateTime.UtcNow }
                };

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[DataSeeder] Advertencia: no se pudo cargar los datos semilla: {ex.Message}");
        }
    }
}
