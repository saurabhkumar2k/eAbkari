using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using System.Security.Cryptography;
using System.Text;

namespace backend.Infrastructure.Repositories
{

public class UserRegistrationRepository : IUserRegistrationRepository
{
    private readonly ApplicationDbContext _context;

    public UserRegistrationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

//  public async Task<long> CreateAsync(MstUsReg model)
// {
//     try
//     {
//         _context.MstUsReg.Add(model);
//         await _context.SaveChangesAsync();
//         return model.RegId;
//     }
//     catch (Exception ex)
//     {
//         throw new Exception(ex.InnerException?.Message ?? ex.Message);
//     }
// }


public async Task<long> CreateAsync(MstUsReg model)
{
    

string? lastUid = await _context.MstUsReg
    .OrderByDescending(x => x.RegId)
    .Select(x => x.UserId)
    .FirstOrDefaultAsync();

if (string.IsNullOrEmpty(lastUid))
{
    // No record exists yet
    model.UserId = "EXD00001";
}
else
{
   
    int number = int.Parse(lastUid.Substring(3));

 
    model.UserId = "EXD" + (number + 1).ToString("D7");
}

    // 2. Default Password
    string defaultPassword = "Test@123";

    // 3. SHA256 Hash
    using (var sha256 = SHA256.Create())
    {
        byte[] bytes = Encoding.UTF8.GetBytes(defaultPassword);
        byte[] hashBytes = sha256.ComputeHash(bytes);

        StringBuilder sb = new StringBuilder();
        foreach (byte b in hashBytes)
        {
            sb.Append(b.ToString("X2"));
        }

       
        model.Password = sb.ToString();
    }

    _context.MstUsReg.Add(model);
    await _context.SaveChangesAsync();

    return model.RegId;
}
}

}