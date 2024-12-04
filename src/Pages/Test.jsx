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
import { useTest } from "../Features/TeacherTests/useTest";
import { setTest } from "../Reducers/testReducer";
import Loading from "../UI/Loading";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useSubmittingTest } from "../Features/StudentTests/useSubmittingTest.js";
import { isBefore } from "date-fns";

function Test() {
  const test = useSelector((state) => state.test);
  const { role } = useAuthUser() || {};
  const { test: quiz, isLoading } = useTest();
  const { submitSolve, isPending, error } = useSubmittingTest();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) return;
    if (test?.id !== quiz?.id) {
      dispatch(setTest(quiz));
    }
  }, [quiz, test, dispatch, isLoading]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      questionForms: [...test.questions.map((question) => ({ questionId: question.id, choiceId: null }))],
    },
  });
  if (isLoading) return <Loading />;
  const { isSubmitted } = formState;

  const onSubmit = (data) => {
    if (role === "Student" && test.quizStatus === "Starting" && isBefore(new Date(), new Date(test.startDate))) {
      const toastId = toast.loading("جاري ارسال الاجابات");
      submitSolve(data, {
        onSuccess: () => {
          toast.success("تم ارسال الاجابات بنجاح", { id: toastId });
        },
        onError: (error) => {
          toast.error("حدث خطأ اثناء ارسال الاجابات", { id: toastId });
        },
      });
    } else {
      toast.success(" تم حفظ اجابات المحاوله التدريبيه بنجاح ");
    }
    console.log(data.questionForms);

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
            <TestTimer onSubmit={handleSubmit(onSubmit)} />
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
