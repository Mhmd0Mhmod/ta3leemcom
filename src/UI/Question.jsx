import { useState } from "react";
import Button from "./Button";
import { CircleCheck, CircleX, Copy, Edit, Trash } from "lucide-react";
import AddQuestion from "./AddQuestion";
import { useDispatch } from "react-redux";
import { deleteQuestion as deleteQuestionRedux } from "../Reducers/testReducer";
import { useRemoveQuestion } from "../Features/TeacherTests/useRemoveQuestion";
import toast from "react-hot-toast";
import { useUpdateQuestion } from "../Features/TeacherTests/useUpdateQuestion";

function Question({ question, number, ended = false }) {
  const [disabled, setDisabled] = useState(true);
  const { deleteQuestion, isPending, error } = useRemoveQuestion();
  const { editQuestion } = useUpdateQuestion();
  const dispatch = useDispatch();
  const { content, choices, mark, explain, compulsory } = question;
  const finishEdit = (question) => {
    if (ended) {
      const toastId = toast.loading("جاري تعديل السؤال");
      editQuestion(question, {
        onSuccess: () => {
          toast.success("تم تعديل السؤال بنجاح", { id: toastId });
        },
        onError: () => {
          toast.error("حدث خطأ اثناء تعديل السؤال", { id: toastId });
        },
      });
    }

    setDisabled(true);
  };
  if (!disabled) return <AddQuestion questionToEdit={question} onEdit={finishEdit} />;
  function remove() {
    if (ended) {
      const toastId = toast.loading("جاري حذف السؤال");
      deleteQuestion(question.id, {
        onSuccess: () => {
          toast.success("تم حذف السؤال بنجاح", { id: toastId });
          dispatch(deleteQuestionRedux(question.id));
        },
        onError: () => {
          toast.error("حدث خطأ اثناء حذف السؤال", { id: toastId });
        },
      });
    } else dispatch(deleteQuestionRedux(question.id));
  }
  function duplicate() {
    if (ended) return;
    dispatch(setQuestions({ ...question }));
  }
  return (
    <div className="space-y-4 rounded-md bg-white p-4">
      <div className="flex justify-between">
        <div className="flex w-3/4 items-center gap-4 whitespace-nowrap rounded-md">
          <span>{number} - </span>
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
      <div className="mr-auto flex w-fit">
        {!ended && (
          <Button type="normal" onClick={duplicate} className="flex items-center gap-4 text-Secondary-500">
            <Copy />
            <span>تكرار</span>
          </Button>
        )}
        <Button type="normal" onClick={() => setDisabled(false)} className="flex items-center gap-4 text-Secondary-500">
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
