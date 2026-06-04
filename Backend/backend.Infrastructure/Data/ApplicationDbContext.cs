using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Entities.Licence;

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
        public DbSet<MstPoliceStation> MstPoliceStations { get; set; }
        public DbSet<MstDistrict> MstDistrict { get; set; }
        public DbSet<MM_US_MT> MM_US_MTs { get; set; }
        public DbSet<MstLiquorKind> MstLiquorKind { get; set; }
        public DbSet<MstLiquorCategory> MstLiquorCategory { get; set; }
        public DbSet<MstLiquorBottler> MstLiquorBottler { get; set; }
        public DbSet<MstLicenseeCategory> MstLicenseeCategory { get; set; }
        public DbSet<MstLiquorMeasure> MstLiquorMeasure { get; set; }
        public DbSet<MstLiquorType> MstLiquorType { get; set; }
        public DbSet<LicenseApplication> LicenseApplication { get; set; }
        public DbSet<RetailPremiseDetails> RetailPremiseDetails { get; set; }
        public DbSet<TrainDetails> TrainDetails { get; set; }
        public DbSet<AddtionalTrainRouteDetails> AddtionalTrainRouteDetails { get; set; }
        public DbSet<ApplicantLicensePartnersDetails> ApplicantLicensePartnersDetails { get; set; }
        public DbSet<MstHotelType> MstHotelType { get; set; }

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


            modelBuilder.Entity<MstPoliceStation>().ToTable("MstPoliceStation");

            modelBuilder.Entity<MstPoliceStation>()
            .HasKey(x => new { x.DistrictCode, x.PsCode });

            modelBuilder.Entity<LicenseApplication>().ToTable("LicenseApplication");
            modelBuilder.Entity<LicenseApplication>()
            .HasKey(x => x.Application_Id_No);

            modelBuilder.Entity<RetailPremiseDetails>().ToTable("RetailPremiseDetails");
            modelBuilder.Entity<RetailPremiseDetails>()
            .HasKey(x => x.Application_Id_No);

            modelBuilder.Entity<TrainDetails>().ToTable("TrainDetails");
            modelBuilder.Entity<TrainDetails>()
            .HasKey(x => x.Application_Id_No);

            modelBuilder.Entity<AddtionalTrainRouteDetails>().ToTable("AddtionalTrainRouteDetails");

            modelBuilder.Entity<AddtionalTrainRouteDetails>()
                    .HasKey(x => x.Application_Id_No);

            modelBuilder.Entity<AddtionalTrainRouteDetails>()
                    .Property(x => x.RouteDescription)
                    .IsRequired()
                    .HasMaxLength(1000);

            modelBuilder.Entity<ApplicantLicensePartnersDetails>().ToTable("ApplicantLicensePartnersDetails");
            modelBuilder.Entity<ApplicantLicensePartnersDetails>()
            .HasKey(x => x.Application_Id_No);

            modelBuilder.Entity<MstHotelType>().ToTable("MstHotelType");
            modelBuilder.Entity<MstHotelType>()
            .HasKey(x => x.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}