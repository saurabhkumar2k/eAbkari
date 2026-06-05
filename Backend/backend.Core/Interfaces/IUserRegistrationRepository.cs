
using backend.Core.Entities;

namespace backend.Core.Interfaces
{

public interface IUserRegistrationRepository
{
    // Task<int> CreateAsync(MstUsReg model);

    // Task<IEnumerable<MstUsReg>> CreateAsync(MstUsReg model);


    Task<long> CreateAsync(MstUsReg model);



    }
}

