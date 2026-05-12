using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface IDistrictRepository
    {
        Task<IEnumerable<MstDistrict>> GetDistrictAsync(string  Statecode);
    }


   
}