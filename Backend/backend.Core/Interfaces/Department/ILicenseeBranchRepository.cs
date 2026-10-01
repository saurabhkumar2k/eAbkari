using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Core.DTOs;
using backend.Core.Entities;
using backend.Core.Entities.Department;

namespace backend.Core.Interfaces.Department
{
    public interface ILicenseeBranchRepository
    {
        Task<IEnumerable<MstLicenseeCategoryBranch>> GetAllBranchAsync();
       
    }
}
