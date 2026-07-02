
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
         public DbSet<MstPoliceStation> MstPoliceStation { get; set; }
        public DbSet<MstDistrict> MstDistrict { get; set; }
        //public DbSet<MM_US_MT> MM_US_MTs { get; set; }
        public DbSet<MstLiquorKind> MstLiquorKind { get; set; }
        public DbSet<MstLiquorCategory> MstLiquorCategory { get; set; }
        public DbSet<MstLiquorBottler> MstLiquorBottler { get; set; }
        public DbSet<MstLicenseeCategory> MstLicenseeCategory { get; set; }
        public DbSet<MstLiquorMeasure> MstLiquorMeasure { get; set; }
        public DbSet<MstLiquorType> MstLiquorType { get; set; }
        public DbSet<MstUserSQ> MstUserSQ { get; set; }
        public DbSet<MstUsReg> MstUsReg { get; set; }
         public DbSet<LicenseApplication> LicenseApplication { get; set; }
        public DbSet<RetailPremiseDetails> RetailPremiseDetails { get; set; }
        public DbSet<TrainDetails> TrainDetails { get; set; }
        public DbSet<AddtionalTrainRouteDetails> AddtionalTrainRouteDetails { get; set; }
        //public DbSet<ApplicantLicensePartnersDetails> AdditionalCompanyPartnersDetails { get; set; }
        public DbSet<MstHotelType> MstHotelType { get; set; }
        public DbSet<LicenseApplicationUserDetails> LicenseApplicationUserDetails { get; set; }
        public DbSet<MstLicenseApplicationDocument> MstLicenseApplicationDocument { get; set; }

        public DbSet<MstLicenseDocumentMaster> MstLicenseDocumentMaster { get; set; }
        public DbSet<MstLiquorBrand> MstLiquorBrand { get; set; }
        public DbSet<WarehouseDetails> WarehouseDetails { get; set; }
        public DbSet<LicenseCompanyDetails> LicenseCompanyDetails { get; set; }
        public DbSet<LicenseApplication> LicenseApplications { get; set; }

        public DbSet<AdditionalCompanyPartnersDetails> AdditionalCompanyPartnersDetails { get; set; }

        public DbSet<LicenseApplicationUploadedDocument> LicenseApplicationUploadedDocument { get; set; }

        public DbSet<DocumentDto> DocumentDtos { get; set; }

        

            public DbSet<LicenseApplicationCategoryDocument> LicenseApplicationCategoryDocument { get; set; }


public DbSet<MstLiquorBrand> MstLiquorBrand { get; set; }




        public DbSet<MstLiquorBottler> MstLiquorBottlers { get; set; }
        public DbSet<MstLiquorState> MstLiquorStates { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MstState>().ToTable("MstState");

            modelBuilder.Entity<MstState>()
                .HasKey(x => x.SID);

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
            //modelBuilder.Entity<MstLiquorBottler>().HasKey(x => x.LiquorBottlerCode);

                    
            modelBuilder.Entity<MstLicenseeCategory>().ToTable("MstLicenseeCategory");
            modelBuilder.Entity<MstLicenseeCategory>()
                    .HasKey(x => x.LicenseeCatCode);

                    
            modelBuilder.Entity<MstLiquorMeasure>().ToTable("MstLiquorMeasure");
            modelBuilder.Entity<MstLiquorMeasure>()
                    .HasKey(x => x.LiquorCatCode);


            modelBuilder.Entity<MstLiquorType>().ToTable("MstLiquorType");
            modelBuilder.Entity<MstLiquorType>()
                    .HasKey(x => x.LiquorCatCode);


                modelBuilder.Entity<MstUsReg>().ToTable("MstUsReg");
                modelBuilder.Entity<MstUsReg>();
        //         modelBuilder.Entity<MstUsReg>()
        //     modelBuilder.Entity<MstUsReg>().ToTable("MstUsReg");

            modelBuilder.Entity<MstUsReg>()
                    .HasKey(x => x.UserId);


            modelBuilder.Entity<MstUsReg>().ToTable("MstUsReg");

            modelBuilder.Entity<MstUsReg>()
                    .HasKey(x => x.RegId);



            modelBuilder.Entity<MstUserSQ>().ToTable("MstUserSQ");

            modelBuilder.Entity<MstUserSQ>()
                    .HasKey(x => x.SecretQuestionId);



             modelBuilder.Entity<MstPoliceStation>().ToTable("MstPoliceStation");
                modelBuilder.Entity<MstPoliceStation>()
               .HasKey(x => new { x.DistrictCode, x.PsCode });
               
 //modelBuilder.Entity<LicenseApplication>().ToTable("LicenseApplication");
 //           modelBuilder.Entity<LicenseApplication>()
 //           .HasKey(x => x.ApplicationIdNo);

            modelBuilder.Entity<RetailPremiseDetails>().ToTable("RetailPremiseDetails");
            modelBuilder.Entity<RetailPremiseDetails>()
            .HasKey(x => x.ApplicationIdNo);
            //  modelBuilder.Entity<MstPoliceStation>().ToTable("MstPoliceStation");

            //     modelBuilder.Entity<MstPoliceStation>()
            //     .HasKey(x => new { x.DistrictCode, x.PsCode });
            modelBuilder.Entity<LicenseApplication>().ToTable("LicenseApplication");
            modelBuilder.Entity<LicenseApplication>()
                    .HasKey(x => x.ApplicationIdNo);

            modelBuilder.Entity<RetailPremiseDetails>().ToTable("RetailPremiseDetails");
            modelBuilder.Entity<RetailPremiseDetails>()
                    .HasKey(r => r.ApplicationIdNo);

            modelBuilder.Entity<TrainDetails>().ToTable("TrainDetails");
            modelBuilder.Entity<TrainDetails>()
                    .HasKey(t => t.ApplicationIdNo);

            modelBuilder.Entity<AddtionalTrainRouteDetails>().ToTable("AddtionalTrainRouteDetails");

            modelBuilder.Entity<AddtionalTrainRouteDetails>()
                    .HasKey(ar => ar.ApplicationIdNo);

            modelBuilder.Entity<AddtionalTrainRouteDetails>()
                    .Property(x => x.RouteDescription)
                    .IsRequired()
                    .HasMaxLength(1000);

            //modelBuilder.Entity<ApplicantLicensePartnersDetails>().ToTable("ApplicantLicensePartnersDetails");
            //modelBuilder.Entity<ApplicantLicensePartnersDetails>()
            //.HasKey(x => x.ApplicationIdNo);
            //     .HasKey(ap => ap.ApplicationIdNo);

            //     modelBuilder.Entities<ApplicantLicensePartnersDetails>().ToTable("ApplicantLicensePartnersDetails")
            //             .Property(ap => ap.PName)
            //             .IsRequired()
            //             .HasMaxLength(150);



            modelBuilder.Entity<AdditionalCompanyPartnersDetails>()
 .ToTable("ApplicantLicensePartnersDetails");
            modelBuilder.Entity<AdditionalCompanyPartnersDetails>()
                .HasKey(x => x.ID);
            modelBuilder.Entity<ApplicantLicensePartnersDetails>().ToTable("ApplicantLicensePartnersDetails");
            modelBuilder.Entity<ApplicantLicensePartnersDetails>()
            .HasKey(x => x.ApplicationIdNo);
                    //.HasKey(ap => ap.ApplicationIdNo);

            modelBuilder.Entity<ApplicantLicensePartnersDetails>()
                    .Property(ap => ap.PName).IsRequired().HasMaxLength(150);

            modelBuilder.Entity<LicenseApplicationUserDetails>().ToTable("LicenseApplicationUserDetails");
            modelBuilder.Entity<LicenseApplicationUserDetails>()
                    .HasKey(x => x.Id);

            modelBuilder.Entity<MstHotelType>().ToTable("MstHotelType");
            modelBuilder.Entity<MstHotelType>()
                    .HasKey(x => x.Id);

            //modelBuilder.Entity<MstLicenseApplicationDocument>().ToTable("MstLicenseDocumentMaster");


       modelBuilder.Entity<WarehouseDetails>()
       .ToTable("WarehouseDetails");

            //modelBuilder.Entity<LicenseCompanyDetails>()
            //.ToTable("LicenseCompanyDetails")
            //.HasKey(x => x.FirmId);



            modelBuilder.Entity<LicenseCompanyDetails>()
     .HasKey(x => x.FirmId);

            modelBuilder.Entity<LicenseCompanyDetails>()
                .HasAlternateKey(x => x.ApplicationIdNo);

            modelBuilder.Entity<LicenseCompanyDetails>()
                .HasMany(x => x.CompanyPartnersDetails)
                .WithOne()
                .HasForeignKey(x => x.ApplicationIdNo)
                .HasPrincipalKey(x => x.ApplicationIdNo);

            modelBuilder.Entity<LicenseApplication>()
  .ToTable("LicenseApplication");


            modelBuilder.Entity<LicenseApplicationUploadedDocument>()
    .ToTable("LicenseApplicationUploadedDocument");

            modelBuilder.Entity<LicenseApplicationUploadedDocument>()
                .HasKey(x => x.ID);

            modelBuilder.Entity<DocumentDto>().HasNoKey();

            modelBuilder.Entity<LicenseApplicationCategoryDocument>()
    .ToTable("LicenseApplicationCategoryDocument");

            modelBuilder.Entity<LicenseApplicationCategoryDocument>()
                .HasKey(x => x.Id);


            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<MstLiquorBrand>()
             .HasKey(x => new
                 {
                      x.LiquorCatCode,
                      x.LiquorKindCode,
                      x.LiquorTypeCode,
                      x.LiquorBrandCode
        }); 
             

        }
    }

}