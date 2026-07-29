using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities.Licence
{
    [Table("MstQuestionDetails")]
    public class QuestionDetails
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Key]
        [StringLength(20)]
         public string QuestionId {get;set;}

        [StringLength(500)]
         public string QuestionDesc {get;set;}

        [StringLength(1)]
         public string QuestionStatus {get;set;}

    } 
     
    [Table("LicenseApplicationCategoryWiseQuestion")]
    public class CategoryWiseQuestions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(2)]
        public string LicenseeCatCode {get;set;}

        [StringLength(50)]
        public string QuestionId {get;set;}

        [StringLength(1)]
        public string ActiveStatus {get;set;}

        [StringLength(1)]
        public string IsMandatory {get;set;}

    }


    [Table("LicenseApplicationCategoryWiseAnswers")]
    public class CategoryWiseAnswers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(50)]
        public string ApplicationIdNo {get;set;}

        [StringLength(10)]
        public string QuestionId {get;set;}

        [StringLength(1)]
        public string AnswerGiven {get;set;}

        public int SlNo {get;set;}
    }
    
}