using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOTNETAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddStateIdToDistrict : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LicenseeCategories");

            migrationBuilder.CreateTable(
                name: "Districts",
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
                    table.PrimaryKey("PK_Districts", x => x.DistCode);
                });

            migrationBuilder.CreateTable(
                name: "Licensee_Category",
                columns: table => new
                {
                    licensee_cat_code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    licensee_cat_desc = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Licensee_Category", x => x.licensee_cat_code);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    StateCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StateName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EntType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.StateCode);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "Licensee_Category");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.CreateTable(
                name: "LicenseeCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LicenseeCategories", x => x.Id);
                });
        }
    }
}
