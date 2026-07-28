using backend.Core.DTOs;
using backend.Core.Entities.Department;


namespace backend.Core.Interfaces
{
    public interface IReportRepository
    {
        Task<ReportDto> GetL1ReportAsync(string applicationId);


        Task<List<AppliedLicenseDto>> GetMyApplicationsAsync(long regId);

        Task<ReportDto> GetBasicReport(string applicationId);

        Task<LicenseCompanyDetailsDto?> GetCompanyDetails(string applicationId);

        Task<WarehouseDetailsDto?> GetWarehouseDetails(string applicationId);

        Task<List<AdditionalCompanyPartnersDetailsDto>> GetDirectors(string applicationId);

        Task<List<DocumentDto>> GetDocuments(string applicationId);
    }
}