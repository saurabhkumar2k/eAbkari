namespace DOTNETAPI.DTOs
{
    public class DocumentDto
    {
        public string DocId { get; set; }       // match entity type
        public string DocDesc { get; set; }
        public string Key { get; set; }
        public bool? IsMandatory { get; set; }
    }

}
