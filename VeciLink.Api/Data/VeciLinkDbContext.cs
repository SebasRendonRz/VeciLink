using Microsoft.EntityFrameworkCore;
using VeciLink.Api.Entities;

namespace VeciLink.Api.Data;

public class VeciLinkDbContext : DbContext
{
    public VeciLinkDbContext(DbContextOptions<VeciLinkDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<ProviderProfile> ProviderProfiles { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<ServicePhoto> ServicePhotos { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Advertisement> Advertisements { get; set; }
    public DbSet<ServiceRequest> ServiceRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User: índice único para Email
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(u => u.Email)
            .HasMaxLength(255)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.FullName)
            .HasMaxLength(150)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.PasswordHash)
            .IsRequired();

        // ProviderProfile: relación uno a uno con User
        modelBuilder.Entity<ProviderProfile>()
            .HasOne(pp => pp.User)
            .WithOne()
            .HasForeignKey<ProviderProfile>(pp => pp.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProviderProfile>()
            .Property(pp => pp.ProviderName)
            .HasMaxLength(200);

        // Service: relación uno a muchos con ProviderProfile
        modelBuilder.Entity<Service>()
            .HasOne(s => s.ProviderProfile)
            .WithMany(pp => pp.Services)
            .HasForeignKey(s => s.ProviderProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Service>()
            .HasOne(s => s.Category)
            .WithMany()
            .HasForeignKey(s => s.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Service>()
            .Property(s => s.ServiceName)
            .HasMaxLength(200)
            .IsRequired();

        modelBuilder.Entity<Service>()
            .Property(s => s.Price)
            .HasPrecision(18, 2);

        // ServicePhoto: relación uno a muchos con Service
        modelBuilder.Entity<ServicePhoto>()
            .HasOne(sp => sp.Service)
            .WithMany(s => s.Photos)
            .HasForeignKey(sp => sp.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);

        // Rating
        modelBuilder.Entity<Rating>()
            .HasOne(r => r.Service)
            .WithMany()
            .HasForeignKey(r => r.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Rating>()
            .HasOne(r => r.User)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        // Favorite
        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.Service)
            .WithMany()
            .HasForeignKey(f => f.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.User)
            .WithMany()
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        // Notification
        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Report
        modelBuilder.Entity<Report>()
            .HasOne(r => r.Reporter)
            .WithMany()
            .HasForeignKey(r => r.ReporterUserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Report>()
            .HasOne(r => r.ReportedUser)
            .WithMany()
            .HasForeignKey(r => r.ReportedUserId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired(false);

        modelBuilder.Entity<Report>()
            .HasOne(r => r.ReportedService)
            .WithMany()
            .HasForeignKey(r => r.ReportedServiceId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // ServiceRequest
        modelBuilder.Entity<ServiceRequest>()
            .HasOne(sr => sr.User)
            .WithMany()
            .HasForeignKey(sr => sr.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ServiceRequest>()
            .HasOne(sr => sr.Service)
            .WithMany()
            .HasForeignKey(sr => sr.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);

        // Category
        modelBuilder.Entity<Category>()
            .Property(c => c.Name)
            .HasMaxLength(100)
            .IsRequired();
    }
}
