using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.DTOs
{
    public class CategoryWiseAnswersDto
{
    public string ApplicationIdNo { get; set; } = string.Empty;

    public string QuestionId { get; set; } = string.Empty;

    public string AnswerGiven { get; set; } = string.Empty;

    public int SlNo { get; set; }
}

public class CatCodeWiseQuestionDto
    {
    public string QuestionId { get; set; } = string.Empty;

    public string QuestionDesc { get; set; } = string.Empty;   // Only used in GET
    }

public class GetApplicationAnswerRequestDto
{
    public string ApplicationIdNo { get; set; } = string.Empty;
}

public class GetApplicationAnswerResponseDto
{
    public string QuestionId { get; set; } = string.Empty;
    public string AnswerGiven { get; set; } = string.Empty;
}

}