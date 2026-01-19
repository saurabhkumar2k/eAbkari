using Microsoft.EntityFrameworkCore;
using DOTNETAPI.Models;

namespace DOTNETAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<MstState> States { get; set; }
        public DbSet<MstDistrict> Districts { get; set; }
        public DbSet<Licensee_Category> Licensee_Category { get; set; }
        public DbSet<ApplicationLicenseDocumentMaster> ApplicationLicenseDocumentMasters { get; set; }
        //public DbSet<ApplyLicense_L1_L31> ApplyLicense_L1_L31 { get; set; }


        //public DbSet<Directors_L1_L31> Directors_L1_L31 { get; set; }



        public DbSet<ApplyLicense_L1_L31> ApplyLicense_L1_L31 { get; set; }

        public DbSet<Directors_L1_L31> License_Directors_L1_L31 { get; set; }


       public DbSet<SiteSubdivision> SiteSubdivisions { get; set; }




        public DbSet<SitePoliceStation> SitePoliceStation { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // State Alternate Key
            modelBuilder.Entity<MstState>()
                .HasAlternateKey(s => s.StateCode)
                .HasName("AK_MstState_StateCode");

            // District → State FK (using StateCode)
            modelBuilder.Entity<MstDistrict>()
                .HasOne(d => d.State)
                .WithMany(s => s.Districts)
                .HasForeignKey(d => d.StateCode)
                .HasPrincipalKey(s => s.StateCode);


            modelBuilder.Entity<ApplicationLicenseDocumentMaster>()
       .ToTable("Application_License_Document_Master");

            modelBuilder.Entity<ApplyLicense_L1_L31>()
       .ToTable("ApplyLicense_L1_L31");

            modelBuilder.Entity<Directors_L1_L31>()
       .ToTable("License_Directors_L1_L31");
        }

      
    }
}
