using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api_GeneratorAngularApp.Migrations
{
    public partial class addInitialGeneratorAndUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Generators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    ApparentPower_MVA = table.Column<decimal>(nullable: false),
                    ActivePower_MW = table.Column<decimal>(nullable: false),
                    PowerFactor = table.Column<decimal>(nullable: false),
                    CurrentStorageVol_cubm = table.Column<string>(nullable: true),
                    Producer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generators", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Username = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Generators");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
