using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using backend.Core.Entities.ApplicationFlow;
using backend.Core.Interfaces.ApplicationFlow;


namespace backend.Application.Services.ApplicationFlow
{
    public class ApplicationFlowService : IApplicationFlowService
    {
        private readonly IApplicationFlowRepository _applicationFlowRepository;

        public ApplicationFlowService(IApplicationFlowRepository applicationFlowRepository)
        {
            _applicationFlowRepository = applicationFlowRepository;
        }

        public async Task<List<PlaAccessPermissionHistoryDto>> GetAccessPermissionHistory(string applicationIdNo)
        {
            return await _applicationFlowRepository.GetAccessPermissionHistory(applicationIdNo);
        }
    }
}