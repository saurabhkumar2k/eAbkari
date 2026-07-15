namespace backend.Core.Entities
{
    public class MstState
    {
        public int SID { get; set; }

        public string StateCode { get; set; } = string.Empty;

        public string? StateName { get; set; }
    }


    public class MstDistrict
    {
        public int DID { get; set; }

        public string DistrictCode { get; set; } = string.Empty;

        public string DistrictName { get; set; } = string.Empty;

         public string StateCode { get; set; } = string.Empty;
    }


    public class MstSubDivision
{
    public int DVID { get; set; }
    public string SubDivisionCode { get; set; } = string.Empty;
    public string SubDivisionName { get; set; } = string.Empty;
    public string DistrictCode { get; set; } = string.Empty;
}




public class MstPoliceStation
    {
        public string DistrictCode { get; set; }
        public string PsCode { get; set; }
        public string PsName { get; set; }
    }





public class MstUserSQ
{
    public int SecretQuestionId { get; set; }
    public string SecretQuestion { get; set; } = string.Empty;

}

    public class MstConstitutionType
    {
    
      public int ID { get; set; }

        public string? CTID { get; set; }

        public string? ConstitutionTypeName { get; set; }

    }

    public class MstOwnerType
    {

        public int ID { get; set; }

        public string? OTID { get; set; }

        public string? OwnerTypeName { get; set; }

    }

    public class MstFinancialYear
    {
        public int Id { get; set; }
        public string? FinYear { get; set; }
        public string ActiveStatus { get; set; }
    }

}