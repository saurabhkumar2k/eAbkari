using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ISubDivisionRepository
    {
        Task<IEnumerable<MstSubDivision>> GetSubDivisionAsync(string districtCode);
    }
}