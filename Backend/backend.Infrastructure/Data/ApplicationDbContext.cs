using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;

namespace backend.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<MstState> MstStates { get; set; }
        public DbSet<MstSubDivision> MstSubDivisions { get; set; }
        // public DbSet<MstPoliceStation> MstPoliceStations { get; set; }
        public DbSet<MstDistrict> MstDistrict { get; set; }
        public DbSet<MM_US_MT> MM_US_MTs { get; set; }
        public DbSet<MstLiquorKind> MstLiquorKind { get; set; }
        public DbSet<MstLiquorCategory> MstLiquorCategory { get; set; }
        public DbSet<MstLiquorBottler> MstLiquorBottler { get; set; }
        public DbSet<MstLicenseeCategory> MstLicenseeCategory { get; set; }
        public DbSet<MstLiquorMeasure> MstLiquorMeasure { get; set; }
        public DbSet<MstLiquorType> MstLiquorType { get; set; }
        public DbSet<MstUserSQ> MstUserSQ { get; set; }
        public DbSet<MstUsReg> MstUsReg { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MstState>().ToTable("MstState");

            modelBuilder.Entity<MstState>()
                .HasKey(x => x.StateCode);

                 modelBuilder.Entity<MstSubDivision>().ToTable("MstSubDivision");

                 modelBuilder.Entity<MstSubDivision>()
                    .HasKey(x => x.DVID);


                modelBuilder.Entity<MstDistrict>().ToTable("MstDistrict");

                 modelBuilder.Entity<MstDistrict>()
                    .HasKey(x => x.DID);



                modelBuilder.Entity<MstLiquorKind>().ToTable("MstLiquorKind");

                 modelBuilder.Entity<MstLiquorKind>()
                    .HasKey(x => x.LiquorCatCode);



                    modelBuilder.Entity<MstLiquorCategory>().ToTable("MstLiquorCategory");

                 modelBuilder.Entity<MstLiquorCategory>()
                    .HasKey(x => x.LiquorCatCode);


                modelBuilder.Entity<MstLiquorBottler>().ToTable("MstLiquorBottler");
                 modelBuilder.Entity<MstLiquorBottler>()
                    .HasKey(x => x.LiquorBottlerCode);

                    
                modelBuilder.Entity<MstLicenseeCategory>().ToTable("MstLicenseeCategory");
                 modelBuilder.Entity<MstLicenseeCategory>()
                    .HasKey(x => x.LicenseeCatCode);

                    
                    modelBuilder.Entity<MstLiquorMeasure>().ToTable("MstLiquorMeasure");
                 modelBuilder.Entity<MstLiquorMeasure>()
                    .HasKey(x => x.LiquorCatCode);


                modelBuilder.Entity<MstLiquorType>().ToTable("MstLiquorType");
                 modelBuilder.Entity<MstLiquorType>()
                    .HasKey(x => x.LiquorCatCode);


                modelBuilder.Entity<MM_US_MT>().ToTable("MM_US_MT");

                modelBuilder.Entity<MM_US_MT>()
                    .HasKey(x => x.User_Id);


    modelBuilder.Entity<MstUsReg>().ToTable("MstUsReg");

                modelBuilder.Entity<MstUsReg>()
                    .HasKey(x => x.RegId);



  modelBuilder.Entity<MstUserSQ>().ToTable("MstUserSQ");

                modelBuilder.Entity<MstUserSQ>()
                    .HasKey(x => x.SecretQuestionId);



            //  modelBuilder.Entity<MstPoliceStation>().ToTable("MstPoliceStation");

            //     modelBuilder.Entity<MstPoliceStation>()
            //     .HasKey(x => new { x.DistrictCode, x.PsCode });


            base.OnModelCreating(modelBuilder);
        }
    }
}