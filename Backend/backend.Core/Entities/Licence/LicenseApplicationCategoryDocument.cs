using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Entities.Licence
{
    public class LicenseApplicationCategoryDocument
    {
        [Key]
        public int Id { get; set; }

        public string? LicenseeCatCode { get; set; }

        public string? DocId { get; set; }

        public string? ActiveStatus { get; set; }

        public string? LicenseeTypeFlag { get; set; }

        public string IsMandatory { get; set; }
    }
}
