using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Core.DTOs;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class PermitPassValidityRepository : IPermitPassValidityRepository
    {
        private readonly ApplicationDbContext _context;

        public PermitPassValidityRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MstLiquorState>> GetStatesAsync()
        {
            return await _context.MstLiquorStates
                .Where(x => (x.DeleteStatus ?? "N") == "N")
                .OrderBy(x => x.StateDesc)
                .ToListAsync();
        }

        public async Task<IEnumerable<PermitPassValidityGridDto>> GetAllAsync()
        {
            return await (from v in _context.MstLiquorStateIpValidities
                          join s in _context.MstLiquorStates on (v.StateCode ?? string.Empty).Trim() equals (s.StateCode ?? string.Empty).Trim() into states
                          from state in states.DefaultIfEmpty()
                          orderby state.StateDesc
                          select new PermitPassValidityGridDto
                          {
                              StateCode = v.StateCode,
                              StateName = state != null ? (state.StateDesc ?? string.Empty) : v.StateCode,
                              DaysIpValidity = (int)(v.DaysIpValidity ?? 0),
                              DaysIpValidityEoIssue = (int)(v.DaysIpValidityEoIssue ?? 0),
                              DaysIpValidityIpRecv = (int)(v.DaysIpValidityIpRecv ?? 0),
                              EoRequired = v.EoRequired ?? "Y"
                          })
                .ToListAsync();
        }

        public async Task<PermitPassValidityGridDto?> GetByStateCodeAsync(string stateCode)
        {
            var normalized = (stateCode ?? string.Empty).Trim();

            return await (from v in _context.MstLiquorStateIpValidities
                          join s in _context.MstLiquorStates on (v.StateCode ?? string.Empty).Trim() equals (s.StateCode ?? string.Empty).Trim() into states
                          from state in states.DefaultIfEmpty()
                          where (v.StateCode ?? string.Empty).Trim() == normalized
                          orderby v.ID descending
                          select new PermitPassValidityGridDto
                          {
                              StateCode = v.StateCode,
                              StateName = state != null ? (state.StateDesc ?? string.Empty) : v.StateCode,
                              DaysIpValidity = (int)(v.DaysIpValidity ?? 0),
                              DaysIpValidityEoIssue = (int)(v.DaysIpValidityEoIssue ?? 0),
                              DaysIpValidityIpRecv = (int)(v.DaysIpValidityIpRecv ?? 0),
                              EoRequired = v.EoRequired ?? "Y"
                          })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> ExistsAsync(string stateCode)
        {
            var normalized = (stateCode ?? string.Empty).Trim();

            return await _context.MstLiquorStateIpValidities
                .AnyAsync(x => (x.StateCode ?? string.Empty).Trim() == normalized);
        }

        public async Task<bool> SaveAsync(MstLiquorStateIpValidity model)
        {
            model.UserId ??= "SYSTEM";
            model.OpDate = DateTime.Now;
            await _context.MstLiquorStateIpValidities.AddAsync(model);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(MstLiquorStateIpValidity model)
        {
            var normalized = (model.StateCode ?? string.Empty).Trim();

            var existing = await _context.MstLiquorStateIpValidities
                .Where(x => (x.StateCode ?? string.Empty).Trim() == normalized)
                .OrderByDescending(x => x.ID)
                .FirstOrDefaultAsync();

            if (existing == null)
            {
                return false;
            }

            existing.DaysIpValidity = model.DaysIpValidity;
            existing.DaysIpValidityEoIssue = model.DaysIpValidityEoIssue;
            existing.DaysIpValidityIpRecv = model.DaysIpValidityIpRecv;
            existing.EoRequired = model.EoRequired;
            existing.OpDate = DateTime.Now;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(string stateCode)
        {
            var normalized = (stateCode ?? string.Empty).Trim();

            var existing = await _context.MstLiquorStateIpValidities
                .Where(x => (x.StateCode ?? string.Empty).Trim() == normalized)
                .OrderByDescending(x => x.ID)
                .FirstOrDefaultAsync();

            if (existing == null)
            {
                return false;
            }

            _context.MstLiquorStateIpValidities.Remove(existing);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}