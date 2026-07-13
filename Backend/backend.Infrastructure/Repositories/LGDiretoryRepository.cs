using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class LGDiretoryRepository : ILGDiretoryRepository
    {
      private readonly ApplicationDbContext _context;

        public LGDiretoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

         public async Task<IEnumerable<MstDistrict>> GetDistrictAsync(string statecode)
        {
           return await _context.MstDistrict
    .Where(x => x.StateCode == statecode.ToString())
    .ToListAsync();
        }

        public async Task<IEnumerable<MstState>> GetStateAsync()
        {
            return await _context.MstLiquorStates
                .Where(x => x.DeleteStatus == "N" && x.StateType == "I")
                .OrderBy(x => x.StateDesc)
                .Select(x => new MstState
                {
                    SID = 0,
                    StateCode = (x.StateCode ?? string.Empty).Trim(),
                    StateName = x.StateDesc ?? string.Empty
                })
                .ToListAsync();
        }

         public async Task<IEnumerable<MstSubDivision>> GetSubDivisionAsync(string districtCode)
        {
           return await _context.MstSubDivisions
               .Where(x => x.DistrictCode == districtCode.ToString())
             .ToListAsync();
        }

    public async Task<IEnumerable<MstUserSQ>> GetQuestionsAsync()
        {
            return await _context.MstUserSQ
                .ToListAsync();
        }


      

        public async Task<IEnumerable<MstPoliceStation>> GetPoliceStationsAsync(string district_code)
        {
            return await _context.MstPoliceStation.ToListAsync();
        }



        public async Task<IEnumerable<MstOwnerType>> GetOwnerTypes()
        {
            return await _context.MstOwnerType.ToListAsync();
        }

        public async Task<IEnumerable<MstConstitutionType>> GetConstitutionType()
        {
            return await _context.MstConstitutionType.ToListAsync();
        }
    }

}