using backend.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Interfaces.ApplicationFlow
{
    public interface IPLAPullApplicationRepository
    {
        Task<List<PLAPullApplicationDto>>GetLicensePermitApplications(string category, string userId);


        //Task<bool> ValidateHierarchy(string applicationIdNo,
        // string flowUpto,
        // long hierarchyId,
        // string userId);

            Task<bool> PullApplication(
                PullApplicationItemDto application,
                string userId,
                string category,
                string permitType);
        
    }
}
