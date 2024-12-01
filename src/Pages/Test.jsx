import { useEffect } from "react";
import TestTitle from "../UI/TestTitle";
import { createPortal } from "react-dom";
import TestTimer from "../UI/TestTimer";
import TestAnwers from "../UI/TestAnwers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { Send } from "lucide-react";
import Logo from "../UI/Logo";
import toast from "react-hot-toast";
import SubmittedQuiz from "../UI/SubmittedQuiz";
import { setAnswers } from "../Reducers/testAnswers";
function Test() {
  const test = useSelector((state) => state.test);
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      quizId: test.id,
      studentId: 0,
      questionForms: [...test.questions.map((question) => ({ questionId: question.id, choiceId: null }))],
      submitAnswersDate: null,
    },
  });
  const { isSubmitted } = formState;

  const onSubmit = (data) => {
    data.submitAnswersDate = new Date().toISOString();
    toast.success("تم ارسال الاجابات بنجاح");
    dispatch(setAnswers(data.questionForms));
  };
  if (isSubmitted) {
    document.body.style.overflow = "auto";
    return <SubmittedQuiz />;
  }
  return createPortal(
    <>
      <div className="test min-w-screen fixed -inset-0 z-50 min-h-screen overflow-scroll bg-[#d3e1e5]">
        <form id="quiz" onSubmit={handleSubmit(onSubmit)}>
          <div className="m-auto mt-7 w-11/12 space-y-4 md:w-3/4">
            <TestTitle title={test.title} />
            <TestTimer timeDuration={test.timeDuration} onSubmit={handleSubmit(onSubmit)} />
            <TestAnwers questions={test.questions} register={register} />
            <div className="flex items-center justify-between">
              <Button type={"Secondary"} className={"flex items-center justify-center gap-4"}>
                <Send />
                <span>ارسال</span>
              </Button>
              <Logo />
            </div>
          </div>
        </form>
      </div>
    </>,
    document.body,
  );
}
export default Test;
