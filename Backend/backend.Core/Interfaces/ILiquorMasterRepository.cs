using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ILiquorMasterRepository
    {
        Task<IEnumerable<MstLiquorKind>> GetLiquorKindAsync();

        Task<IEnumerable<MstLiquorCategory>> GetLiquorCategoryAsync();

         Task<IEnumerable<MstLiquorBottler>> GetLiquorBottlerAsync();
          Task<IEnumerable<MstLicenseeCategory>> GetLicenseeCategoryAsync();
          
          Task<IEnumerable<MstLiquorMeasure>> GetLiquorMeasureAsync();

          Task<IEnumerable<MstLiquorType>> GetLiquorTypeAsync();

          
    }

}