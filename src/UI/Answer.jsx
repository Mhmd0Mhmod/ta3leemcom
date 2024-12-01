import { Check, X } from "lucide-react";

function Answer({ question, answer }) {
  console.log(question, answer);
  const { id, content, choices } = question;

  return (
    <div className="space-y-3 bg-white p-4">
      <p>
        {id} - {content}
      </p>
      {choices.map((choice) => {
        const checked = Number(answer?.choiceId) === choice.id;
        const correct = choice.isCorrect;
        return (
          <div key={choice.id} className={`flex w-3/4 items-center gap-2 rounded p-2 ${correct ? "bg-green-300" : ""} ${checked && !correct ? "bg-red-300" : ""}`}>
            <input type="radio" id={choice.id} className="h-5 w-5" disabled checked={checked} />
            <label htmlFor={choice.id}>{choice.content}</label>
            <span className="mr-auto">
              {checked && correct && <Check />}
              {checked && !correct && <X />}
            </span>
          </div>
        );
      })}
    </div>
  );
}
export default Answer;
