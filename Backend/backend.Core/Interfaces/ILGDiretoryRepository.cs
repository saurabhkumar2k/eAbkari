using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ILGDiretoryRepository
    {


                Task<IEnumerable<MstState>> GetStateAsync();

                Task<IEnumerable<MstDistrict>> GetDistrictAsync(string  Statecode);


                Task<IEnumerable<MstSubDivision>> GetSubDivisionAsync(string districtCode);

                Task<IEnumerable<MstUserSQ>> GetQuestionsAsync();

                

                Task<IEnumerable<MstPoliceStation>> GetPoliceStationsAsync(string district_code);
        Task<IEnumerable<MstConstitutionType>> GetConstitutionType();

        Task<IEnumerable<MstOwnerType>> GetOwnerTypes();


    }

}