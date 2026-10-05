using backend.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Interfaces.ApplicationFlow
{
    public interface IPLAPullApplicationService
    {
        Task<List<PLAPullApplicationDto>>
    GetLicensePermitApplications(
        string category,
        string userId);


        Task<PullApplicationResponse> PullApplications(
            PullApplicationRequest request);


     
    
        

    }

   


       
   
}
