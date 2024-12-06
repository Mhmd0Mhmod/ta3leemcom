import { useForm } from "react-hook-form";
import { Save, X } from "lucide-react";
import toast from "react-hot-toast";
import Toggle from "./Toggle.jsx";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { editQuestion, setQuestions } from "../Reducers/testReducer.js";
import Button from "./Button.jsx";
function AddQuestion({ questionToEdit, onEdit }) {
  const { id } = questionToEdit || {};
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: id
      ? questionToEdit
      : {
          content: "",
          mark: 1,
          type: true,
          choices: [{ id: 1, content: "", isCorrect: false }],
          explain: "",
        },
  });

  const { choices, type } = watch();

  const addOption = () => {
    const id = choices[choices.length - 1].id + 1;
    setValue("choices", [...choices, { id, content: "", isCorrect: false }]);
  };

  function removeOption(el) {
    if (choices.length === 1) {
      toast.error("يجب ان يكون هناك خيار واحد على الاقل");
      return;
    }
    setValue(
      "choices",
      choices.filter((option) => option.id !== el.id),
    );
  }
  function handleRadioChange(el) {
    const newChoices = choices.map((option) => {
      if (option.id === el.id) {
        return { ...option, isCorrect: !option.isCorrect };
      } else {
        return { ...option, isCorrect: false };
      }
    });

    setValue("choices", [...newChoices]);
  }
  function onSubmit(data) {
    const haveCorrect = data.choices.some((option) => option.isCorrect);
    if (!haveCorrect) {
      toast.error("يجب اختيار اجابة صحيحة");
      return;
    }

    data.type = data.type ? "mandatory" : "optional";

    if (id) {
      data.id = id;
      onEdit?.(data);
      dispatch(editQuestion(data));
    } else {
      dispatch(setQuestions(data));
      reset();
    }
  }
  function onError(errors) {
    const keys = Object.keys(errors);

    keys.forEach((key) => {
      if (Array.isArray(errors[key])) {
        errors[key].forEach((error) => {
          const { content } = error;
          toast.error(content.message);
        });
      } else toast.error(errors[key].message);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <div className="space-y-4 border border-r-4 border-r-Secondary-500 bg-gray-100 p-4 shadow-lg">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="اكتب سؤالك هنا ..."
            className="w-3/4 rounded border-b-4 border-b-Secondary-500 p-2"
            autoComplete="off"
            {...register("content", {
              required: "يجب ادخال السؤال",
              minLength: {
                value: 10,
                message: "يجب ان يكون طول السؤال اكبر من 10 حروف",
              },
            })}
          />
          <div className="flex items-center gap-2">
            <input type={"number"} className="w-10 rounded-lg border-2 border-gray-400 bg-inherit text-center" {...register("mark")} min={0} defaultValue={1} />
            <span>{type ? "اجباري" : "بونص"}</span>
          </div>
        </div>
        <div className="space-y-4">
          <ul className="space-y-4">
            {choices.map((el, i) => {
              return (
                <li key={el.id} className="flex items-center gap-4">
                  <X className="cursor-pointer" onClick={() => removeOption(el)} />
                  <input type="radio" name="isCorrect" checked={el.isCorrect} onChange={() => handleRadioChange(el)} />
                  <input
                    type="text"
                    placeholder="اكتب خيارك هنا ..."
                    className="w-1/2 rounded p-2"
                    defaultValue={el.content}
                    autoComplete="off"
                    {...register(`choices[${i}].content`, {
                      required: `يجب ادخال الخيار رقم ${i + 1}`,
                    })}
                  />
                </li>
              );
            })}
          </ul>
          <span className={"flex cursor-pointer items-center gap-4 text-Secondary-500"} onClick={addOption}>
            <Plus />
            إضافة اختيار
          </span>
        </div>
        <div className="flex items-center gap-5">
          <label htmlFor="disc">تفسير الاجابه : </label>
          <input type="text" id="disc" className="w-3/4 rounded p-2" {...register("explain")} />
          <span>(اختياري)</span>
        </div>
        <hr className="m-auto w-11/12 border-t-2" />
        <div className="flex gap-4">
          <Toggle register={register} name={"type"} value={type} id={`addToggle-${id || 0}`} />
          <label htmlFor="addToggle">اجباري</label>
        </div>
      </div>
      <Button type="Secondary" className={"flex gap-4"}>
        <Save />
        <span>حفظ</span>
      </Button>
    </form>
  );
}

export default AddQuestion;
