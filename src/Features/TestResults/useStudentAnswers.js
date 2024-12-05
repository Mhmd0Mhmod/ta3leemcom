import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { getStudentAnswers } from "./helpers";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, setTest } from "../../Reducers/testReducer";
import { initialState, setAnswers } from "../../Reducers/testAnswers";

function useStudentAnswers() {
  const token = useAuthHeader();

  const { testId: studentQuizId } = useParams();
  const answers = useSelector((state) => state.testAnswers.answers);
  const {
    data: studentAnswers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["studentAnswers", studentQuizId],
    queryFn: () => getStudentAnswers(studentQuizId, token),
    enabled: Boolean(Number(studentQuizId)) && Boolean(!answers.length),
  });

  return { studentAnswers, error, isLoading };
}
export { useStudentAnswers };
