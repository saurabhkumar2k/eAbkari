using backend.Application.Interfaces.ApplicationFlow;
using backend.Core.DTOs;
using backend.Core.Interfaces.ApplicationFlow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Services.ApplicationFlow
{
    public class PLAPullApplicationService : IPLAPullApplicationService
    {
        private readonly IPLAPullApplicationRepository _repository;

        public PLAPullApplicationService(
            IPLAPullApplicationRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<PLAPullApplicationDto>>
            GetLicensePermitApplications(
                string category,
                string userId)
        {
            return await _repository
                .GetLicensePermitApplications(category, userId);
        }



        public async Task<PullApplicationResponse> PullApplications(
        PullApplicationRequest request)
        {
            var response = new PullApplicationResponse();

            if (request == null ||
                request.Applications == null ||
                !request.Applications.Any())
            {
                response.Success = false;
                response.Message = "No application selected.";

                return response;
            }


            foreach (var application in request.Applications)
            {
                try
                {
                    //// -----------------------------------------
                    //// 1. Validate hierarchy
                    //// -----------------------------------------

                    //var allowed =
                    //    await _repository.ValidateHierarchy(
                    //        application.ApplicationIdNo,
                    //        application.FlowUpto,
                    //        application.HierarchyID,
                    //        request.UserId);

                    //if (!allowed)
                    //{
                    //    response.FailedApplications.Add(
                    //        application.ApplicationIdNo);

                    //    continue;
                    //}


                    // -----------------------------------------
                    // 2. Pull application
                    // -----------------------------------------

                    var pulled =
                        await _repository.PullApplication(
                            application,
                            request.UserId,
                            request.Category,
                            request.PermitType);

                    if (pulled)
                    {
                        response.PulledApplications.Add(
                            application.ApplicationIdNo);
                    }
                    else
                    {
                        response.FailedApplications.Add(
                            application.ApplicationIdNo);
                    }
                }
                catch (Exception)
                {
                    response.FailedApplications.Add(
                        application.ApplicationIdNo);
                }
            }


            // -----------------------------------------
            // 3. Response
            // -----------------------------------------

            response.Success =
                response.PulledApplications.Count > 0;

            response.Message =
                response.Success
                    ? "Application(s) pulled successfully."
                    : "No application was pulled.";

            return response;
        }











    }
}
