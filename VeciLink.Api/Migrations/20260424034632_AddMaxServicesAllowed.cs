using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VeciLink.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddMaxServicesAllowed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxServicesAllowed",
                table: "ProviderProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxServicesAllowed",
                table: "ProviderProfiles");
        }
    }
}
