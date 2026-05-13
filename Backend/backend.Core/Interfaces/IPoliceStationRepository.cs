using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface IPoliceStationRepository
    {
        Task<IEnumerable<MstPoliceStation>> GetPoliceStationAsync(string districtCode);
    }



}








