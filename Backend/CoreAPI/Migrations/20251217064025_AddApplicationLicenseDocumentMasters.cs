using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOTNETAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddApplicationLicenseDocumentMasters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EntType",
                table: "MstState",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EntType",
                table: "MstDistrict",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Application_License_Document_Master",
                columns: table => new
                {
                    Doc_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Doc_Desc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doc_Status = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    Delete_Status = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    IsValid = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Application_License_Document_Master", x => x.Doc_Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Application_License_Document_Master");

            migrationBuilder.DropColumn(
                name: "EntType",
                table: "MstState");

            migrationBuilder.DropColumn(
                name: "EntType",
                table: "MstDistrict");
        }
    }
}
