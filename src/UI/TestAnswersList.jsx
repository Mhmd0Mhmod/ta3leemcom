import Answer from "./Answer";

function TestAnswersList({ questions, answers }) {
  console.log(questions, answers);

  return (
    <>
      {questions.map((question) => {
        const answer = answers.find((answer) => answer.questionId === question.id);
        return <Answer key={question.id} question={question} answer={answer} />;
      })}
    </>
  );
}
export default TestAnswersList;
