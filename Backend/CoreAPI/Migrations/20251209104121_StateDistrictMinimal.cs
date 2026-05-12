using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOTNETAPI.Migrations
{
    /// <inheritdoc />
    public partial class StateDistrictMinimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MstState",
                table: "MstState");

            migrationBuilder.DropColumn(
                name: "EntType",
                table: "MstState");

            migrationBuilder.DropColumn(
                name: "EntType",
                table: "MstDistrict");

            migrationBuilder.AlterColumn<string>(
                name: "StateName",
                table: "MstState",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "StateCode",
                table: "MstState",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "MstState",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "StateCode",
                table: "MstDistrict",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "DistName",
                table: "MstDistrict",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DistCode",
                table: "MstDistrict",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_MstState_StateCode",
                table: "MstState",
                column: "StateCode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MstState",
                table: "MstState",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_MstDistrict_StateCode",
                table: "MstDistrict",
                column: "StateCode");

            migrationBuilder.AddForeignKey(
                name: "FK_MstDistrict_MstState_StateCode",
                table: "MstDistrict",
                column: "StateCode",
                principalTable: "MstState",
                principalColumn: "StateCode",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MstDistrict_MstState_StateCode",
                table: "MstDistrict");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_MstState_StateCode",
                table: "MstState");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MstState",
                table: "MstState");

            migrationBuilder.DropIndex(
                name: "IX_MstDistrict_StateCode",
                table: "MstDistrict");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "MstState");

            migrationBuilder.AlterColumn<string>(
                name: "StateName",
                table: "MstState",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "StateCode",
                table: "MstState",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "EntType",
                table: "MstState",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "StateCode",
                table: "MstDistrict",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2);

            migrationBuilder.AlterColumn<string>(
                name: "DistName",
                table: "MstDistrict",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<int>(
                name: "DistCode",
                table: "MstDistrict",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "EntType",
                table: "MstDistrict",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MstState",
                table: "MstState",
                column: "StateCode");
        }
    }
}
