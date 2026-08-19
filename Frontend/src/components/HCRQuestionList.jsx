import React from "react";

const HcrQuestionList = ({ questions, onChange }) => {
  return (
    <div className="card-section">
      <h3>All fields are mandatory
        <span className="required">*</span>
      </h3>

      {questions && questions.length > 0 ? (
        <div className="question-table">

          {/* Header */}
          <div className="question-header">
            <div>Question</div>
            <div>Answer</div>
          </div>

          {/* Questions */}
          {questions.map((q, index) => (
            <div className="question-row" key={q.questionId}>

              {/* Column 1 - Question */}
              <div className="question-column">
                {index + 1}. {q.questionDesc}
              </div>

              {/* Column 2 - Answer */}
              <div className="answer-column">

                <label>
                  <input
                    type="radio"
                    name={`question_${q.questionId}`}
                    value="Y"
                    checked={q.answer === "Y"}
                    onChange={() =>
                      onChange(q.questionId, "Y")
                    }
                  />
                  <span>Yes</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name={`question_${q.questionId}`}
                    value="N"
                    checked={q.answer === "N"}
                    onChange={() =>
                      onChange(q.questionId, "N")
                    }
                  />
                  <span>No</span>
                </label>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default HcrQuestionList;
