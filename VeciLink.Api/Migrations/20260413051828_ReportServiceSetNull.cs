using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VeciLink.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReportServiceSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Services_ReportedServiceId",
                table: "Reports");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Services_ReportedServiceId",
                table: "Reports",
                column: "ReportedServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Services_ReportedServiceId",
                table: "Reports");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Services_ReportedServiceId",
                table: "Reports",
                column: "ReportedServiceId",
                principalTable: "Services",
                principalColumn: "Id");
        }
    }
}
