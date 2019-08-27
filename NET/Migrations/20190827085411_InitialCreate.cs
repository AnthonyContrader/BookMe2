using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NET.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    username = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true),
                    login = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    authorities = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "id", "authorities", "email", "login", "password", "username" },
                values: new object[] { 1L, 0, "admin@localhost", null, "admin", "admin" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "id", "authorities", "email", "login", "password", "username" },
                values: new object[] { 2L, 0, "system@localhost", null, "system", "system" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "id", "authorities", "email", "login", "password", "username" },
                values: new object[] { 3L, 1, "user@localhost", null, "user", "user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
