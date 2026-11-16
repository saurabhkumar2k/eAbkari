using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Entities.ApplicationFlow
{
     public class ApplicationFlowUserResult
    {
        public string ApplicationIdNo { get; set; } 

        public string FlowUpto { get; set; } 

        public string UserTypeCode { get; set; } 
    }
}
