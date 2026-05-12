namespace backend.Core.Entities
{
    public class MstState
    {
        public int SID { get; set; }

        public string StateCode { get; set; } = string.Empty;

        public string? StateName { get; set; }
    }
}