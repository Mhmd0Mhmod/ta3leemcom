import Answer from "./Answer";

function TestAnswersList({ questions, answers }) {
  return (
    <>
      {questions.map((question, idex) => {
        const answer = answers.find((answer) => +answer.questionId === +question.id);
        return (
          <div key={question.id} className="space-y-3 bg-white p-4">
            <p>
              {idex + 1} - {question?.content}
            </p>
            <Answer question={question} answer={answer} />
          </div>
        );
      })}
    </>
  );
}
export default TestAnswersList;
