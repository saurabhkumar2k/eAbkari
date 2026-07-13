using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using backend.Application.DTOs;
namespace backend.Infrastructure.Repositories
{
    public class MstLiquorBottlerRepository : IMstLiquorBottlerRepository
    {
        private readonly ApplicationDbContext _context;

        public MstLiquorBottlerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MstLiquorBottler>> GetAllAsync()
        {
            return await _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y")
                .OrderBy(x => x.LiquorBottlerName)
                .ToListAsync();
        }

        public async Task<MstLiquorBottler?> GetByCodeAsync(string code)
        {
            var normalizedCode = (code ?? string.Empty).Trim();

            return await _context.MstLiquorBottlers
                .FirstOrDefaultAsync(x => (x.LiquorBottlerCode ?? string.Empty).Trim() == normalizedCode);
        }

        public async Task<bool> SaveAsync(MstLiquorBottler bottler)
        {
            bool exists = await _context.MstLiquorBottlers.AnyAsync(x =>
                x.LiquorBottlerCode == bottler.LiquorBottlerCode);

            if (exists)
                return false;

            bottler.DeleteStatus = "N";
            bottler.EntryFlag = "O";

            await _context.MstLiquorBottlers.AddAsync(bottler);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(MstLiquorBottler bottler)
        {
            var data = await _context.MstLiquorBottlers
                .FirstOrDefaultAsync(x => x.LiquorBottlerCode == bottler.LiquorBottlerCode);

            if (data == null)
                return false;

            data.LiquorBottlerOrigin = bottler.LiquorBottlerOrigin;
            data.LiquorBottlerCountry = bottler.LiquorBottlerCountry;
            data.LiquorBottlerState = bottler.LiquorBottlerState;
            data.LiquorBottlerName = bottler.LiquorBottlerName;
            data.LiquorBottlerAddress = bottler.LiquorBottlerAddress;
            data.LiquorBottlerPinCode = bottler.LiquorBottlerPinCode;
            data.LicenseeIdNo = bottler.LicenseeIdNo;
            data.OldBottlerId = bottler.OldBottlerId;

            _context.MstLiquorBottlers.Update(data);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(string code)
        {
            var data = await _context.MstLiquorBottlers
                .FirstOrDefaultAsync(x => x.LiquorBottlerCode == code);

            if (data == null)
                return false;

            data.DeleteStatus = "Y";

            _context.MstLiquorBottlers.Update(data);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<MstLiquorState>> GetStatesAsync()
        {
            return await _context.MstLiquorStates
                .Where(x => x.DeleteStatus == "N" && x.StateType == "I")
                .OrderBy(x => x.StateDesc)
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetOriginsAsync()
        {
            return await _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y")
                .Select(x => (x.LiquorBottlerOrigin ?? string.Empty).Trim())
                .Where(x => x != string.Empty)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetBottlerCodesAsync(string? origin = null, string? stateCode = null)
        {
            var query = _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y");

            if (!string.IsNullOrWhiteSpace(origin))
            {
                if (origin == "A")
                {
                    query = query.Where(x =>
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "R" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "B" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "N" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "A");
                }
                else if (origin == "I")
                {
                    // Legacy data stores Indian owners across I/O/W origins.
                    query = query.Where(x =>
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "I" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "O" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "W");
                }
                else
                {
                    query = query.Where(x => (x.LiquorBottlerOrigin ?? string.Empty).Trim() == origin);
                }
            }

            if (!string.IsNullOrWhiteSpace(stateCode) && origin == "I")
            {
                query = query.Where(x => (x.LiquorBottlerState ?? string.Empty).Trim() == stateCode);
            }

            return await query
                .Select(x => x.LiquorBottlerCode)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync();
        }

        public async Task<bool> IsDuplicateAsync(string code)
        {
            return await _context.MstLiquorBottlers
                .AnyAsync(x => x.LiquorBottlerCode == code);
        }
        public async Task<IEnumerable<BottlerGridDto>> GetGridAsync(string origin, string? stateCode)
{
    switch (origin)
    {
        case "I":
            var query = from b in _context.MstLiquorBottlers
                        join s in _context.MstLiquorStates
                            on (b.LiquorBottlerState ?? string.Empty).Trim() equals (s.StateCode ?? string.Empty).Trim()
                        where
                            (b.DeleteStatus ?? "N").Trim() != "Y" &&
                            (
                                (b.LiquorBottlerOrigin ?? string.Empty).Trim() == "I" ||
                                (b.LiquorBottlerOrigin ?? string.Empty).Trim() == "O" ||
                                (b.LiquorBottlerOrigin ?? string.Empty).Trim() == "W"
                            )
                        select new
                        {
                            Bottler = b,
                            State = s
                        };

            if (!string.IsNullOrWhiteSpace(stateCode))
            {
                query = query.Where(x => (x.State.StateCode ?? string.Empty).Trim() == stateCode);
            }

            return await query
                .OrderBy(x => x.State.StateDesc)
                .ThenBy(x => x.Bottler.LiquorBottlerCode)
                .Select(x => new BottlerGridDto
                {
                    OriginStateCountry = x.State.StateDesc,
                    Code = x.Bottler.LiquorBottlerCode,
                    Bottler = x.Bottler.LiquorBottlerName,
                    Origin = x.Bottler.LiquorBottlerOrigin
                })
                .ToListAsync();

        case "N":

            return await _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y" && (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "N")
                .OrderBy(x => x.LiquorBottlerCode)
                .Select(x => new BottlerGridDto
                {
                    OriginStateCountry = "Nepal",
                    Code = x.LiquorBottlerCode,
                    Bottler = x.LiquorBottlerName,
                    Origin = x.LiquorBottlerOrigin
                }).ToListAsync();

        case "B":

            return await _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y" && (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "B")
                .OrderBy(x => x.LiquorBottlerCode)
                .Select(x => new BottlerGridDto
                {
                    OriginStateCountry = "Bhutan",
                    Code = x.LiquorBottlerCode,
                    Bottler = x.LiquorBottlerName,
                    Origin = x.LiquorBottlerOrigin
                }).ToListAsync();

        case "W":

            return await _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y" && (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "W")
                .OrderBy(x => x.LiquorBottlerCode)
                .Select(x => new BottlerGridDto
                {
                    OriginStateCountry = "West Bengal",
                    Code = x.LiquorBottlerCode,
                    Bottler = x.LiquorBottlerName,
                    Origin = x.LiquorBottlerOrigin
                }).ToListAsync();

        case "R":

            return await _context.MstLiquorBottlers
                .Where(x => (x.DeleteStatus ?? "N").Trim() != "Y" && (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "R")
                .OrderBy(x => x.LiquorBottlerCountry)
                .ThenBy(x => x.LiquorBottlerCode)
                .Select(x => new BottlerGridDto
                {
                    OriginStateCountry = x.LiquorBottlerCountry,
                    Code = x.LiquorBottlerCode,
                    Bottler = x.LiquorBottlerName,
                    Origin = x.LiquorBottlerOrigin
                }).ToListAsync();

        case "A":

            return await _context.MstLiquorBottlers
                .Where(x =>
                    (x.DeleteStatus ?? "N").Trim() != "Y" &&
                    (
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "R" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "B" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "N" ||
                        (x.LiquorBottlerOrigin ?? string.Empty).Trim() == "A"
                    ))
                .OrderBy(x => x.LiquorBottlerCountry)
                .ThenBy(x => x.LiquorBottlerCode)
                .Select(x => new BottlerGridDto
                {
                    OriginStateCountry = x.LiquorBottlerCountry,
                    Code = x.LiquorBottlerCode,
                    Bottler = x.LiquorBottlerName,
                    Origin = x.LiquorBottlerOrigin
                }).ToListAsync();

        default:
            return Enumerable.Empty<BottlerGridDto>();
    }
}
    }
}