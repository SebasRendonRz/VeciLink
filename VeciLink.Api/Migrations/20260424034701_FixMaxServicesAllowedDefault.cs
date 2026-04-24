using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VeciLink.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixMaxServicesAllowedDefault : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Set all existing rows to 1 (free tier default)
            migrationBuilder.Sql(
                "UPDATE [ProviderProfiles] SET [MaxServicesAllowed] = 1 WHERE [MaxServicesAllowed] = 0;");

            // Change column default to 1
            migrationBuilder.AlterColumn<int>(
                name: "MaxServicesAllowed",
                table: "ProviderProfiles",
                type: "int",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MaxServicesAllowed",
                table: "ProviderProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 1);
        }
    }
}
