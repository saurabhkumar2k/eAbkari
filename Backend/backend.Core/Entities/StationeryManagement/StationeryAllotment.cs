using System;

namespace backend.Core.Entities.StationeryManagement
{
        public class StationeryAllotment
        {
            public string LicenseeId { get; set; }

            public string IPNo { get; set; }

            public string TPNo { get; set; }

            public string StationerySerial { get; set; }

            public string AssignedStatus { get; set; }

            public DateTime AssignedDate { get; set; }

            public string AllotedStatus { get; set; }

            public DateTime AllotedDate { get; set; }

            public string PrintStatus { get; set; }

            public DateTime PrintDate { get; set; }

            public string AllotmentType { get; set; }
        }
   
}