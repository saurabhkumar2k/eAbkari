using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
     public class MstUsRegRepository : IMstUsRegRepository
    {
      private readonly ApplicationDbContext _context;

      public MstUsRegRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<MstUsRegDto>> GetUser(long regId)
        {
           var user = await _context.MstUsReg
            .Where(x => x.RegId == regId)
            .Select(x => new MstUsRegDto
            {
                RegId = x.RegId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                DateOfBirth = x.DateOfBirth,
                FatherHusbandName = x.FatherHusbandName,
                Occupation = x.Occupation,
                PanNo = x.PanNo,
                AddressLine1 = x.AddressLine1,
                AddressLine2 = x.AddressLine2,
                StateUT = x.StateUT,
                District = x.District,
                SubDivision = x.SubDivision,
                PIN = x.PIN,
                Email = x.Email,
                Mobile = x.Mobile,
                IsPunishableOffence=x.IsPunishableOffence
            })
            .ToListAsync();

            return user;
        }
    }
}