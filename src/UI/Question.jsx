import { useState } from "react";
import Button from "./Button";
import { CircleCheck, CircleX, Edit, Trash } from "lucide-react";
import AddQuestion from "./AddQuestion";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../Reducers/testReducer";

function Question({ question }) {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { id, content, choices, mark, explain, compulsory } = question;
  const finishEdit = () => {
    setDisabled(true);
  };
  function remove() {
    dispatch(deleteQuestion(question.id));
  }
  if (!disabled) return <AddQuestion questionToEdit={question} onEdit={finishEdit} />;
  return (
    <div className="space-y-4 rounded-md bg-white p-4">
      <div className="flex justify-between">
        <div className="flex w-3/4 items-center gap-4 whitespace-nowrap rounded-md">
          <span>{id} - </span>
          <p className="w-full rounded-md bg-gray-200 p-2"> {content}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-md border-2 px-2 py-1">{mark}</span>
          <span>{compulsory ? "اجباري" : "بونص"}</span>
        </div>
      </div>
      <ul className="space-y-3">
        {choices.map((el) => (
          <li key={el.id} className="flex w-1/2 items-center gap-4">
            {el.isCorrect ? <CircleCheck className="text-Secondary-500" /> : <CircleX className="text-red-500" />}
            <p className="w-full rounded-md bg-gray-200 p-2">{el.content}</p>
          </li>
        ))}
      </ul>
      <div>
        <span className="flex items-center gap-4">
          <span>تفسير الاجابه : </span>
          <p className="w-3/4 rounded-md bg-gray-200 p-2">{explain}</p>
        </span>
      </div>
      <div className="mr-auto flex">
        <Button type="normal" onClick={() => setDisabled(false)} className="mr-auto flex items-center gap-4 text-Secondary-500">
          <Edit />
          <span>تعديل</span>
        </Button>
        <Button type={"normal"} className="flex items-center gap-4 text-red-500" onClick={remove}>
          <Trash />
          <span>حذف</span>
        </Button>
      </div>
    </div>
  );
}
export default Question;
