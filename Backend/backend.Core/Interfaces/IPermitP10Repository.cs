using backend.Core.Entities;
using backend.Core.DTOs;
using backend.Core.Entities.Licence;

public interface IPermitP10Repository
{
    Task<long> ApplyPermitP10Async(ApplyPermitP10Dto dto, string ipAddress);
    Task<IEnumerable<PremiseDetails>> GetPremiseAsync();
    Task<List<GetPermitP10Dto>> GetPermitP10Async(string applid);


}