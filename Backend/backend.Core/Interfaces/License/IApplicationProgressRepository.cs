using backend.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Interfaces.License
{
    public interface IApplicationProgressRepository
    {

        //Task<int> GetCurrentStepAsync(string applicationId);

        Task<WarehouseDetailsDto?> GetWarehouseByApplicationIdAsync(string applicationId);

        Task<LicenseCompanyDetailsDto> GetCompanyDetailsByApplicationIdAsync(string applicationId);


        Task<ApplicationDocumentUploadDto> GetUploadedDocumentsByApplicationIdAsync(string applicationId);
    }
}
