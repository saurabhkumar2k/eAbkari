using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{

public class UserRegistrationRepository : IUserRegistrationRepository
{
    private readonly ApplicationDbContext _context;

    public UserRegistrationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

 public async Task<long> CreateAsync(MstUsReg model)
{
    try
    {
        _context.MstUsReg.Add(model);
        await _context.SaveChangesAsync();
        return model.RegId;
    }
    catch (Exception ex)
    {
        throw new Exception(ex.InnerException?.Message ?? ex.Message);
    }
}
}

}