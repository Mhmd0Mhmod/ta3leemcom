import Heading from "./Heading";

function TestAnwers({ questions, register }) {
  return (
    <div className="space-y-4">
      {questions.map((question, idx) => (
        <div key={idx} className="space-y-4 rounded-lg bg-white p-4 shadow-md">
          <Heading as="h2" className="text-lg font-bold">
            {idx + 1} - {question.content}
          </Heading>
          {question.choices.map((choice, i) => (
            <div key={i} className="flex items-center gap-4">
              <input type="radio" {...register(`questionForms[${idx}].choiceId`)} value={choice.id} />
              <label>{choice.content}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default TestAnwers;
