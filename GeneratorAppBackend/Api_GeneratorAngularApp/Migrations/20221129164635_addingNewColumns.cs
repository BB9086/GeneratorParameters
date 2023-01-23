using Microsoft.EntityFrameworkCore.Migrations;

namespace Api_GeneratorAngularApp.Migrations
{
    public partial class addingNewColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Generators",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoPath",
                table: "Generators",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductionYear",
                table: "Generators",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Generators");

            migrationBuilder.DropColumn(
                name: "PhotoPath",
                table: "Generators");

            migrationBuilder.DropColumn(
                name: "ProductionYear",
                table: "Generators");
        }
    }
}
