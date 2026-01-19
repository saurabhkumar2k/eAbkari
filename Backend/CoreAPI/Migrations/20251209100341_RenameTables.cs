using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOTNETAPI.Migrations
{
    /// <inheritdoc />
    public partial class RenameTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.CreateTable(
                name: "MstDistrict",
                columns: table => new
                {
                    DistCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateCode = table.Column<int>(type: "int", nullable: false),
                    EntType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstDistrict", x => x.DistCode);
                });

            migrationBuilder.CreateTable(
                name: "MstState",
                columns: table => new
                {
                    StateCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StateName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EntType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstState", x => x.StateCode);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MstDistrict");

            migrationBuilder.DropTable(
                name: "MstState");

            migrationBuilder.CreateTable(
                name: "Districts",
                columns: table => new
                {
                    DistCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EntType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Districts", x => x.DistCode);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    StateCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.StateCode);
                });
        }
    }
}
