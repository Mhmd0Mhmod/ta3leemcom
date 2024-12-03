import AddQuestion from "../../UI/AddQuestion.jsx";
import Questions from "../../UI/Questions.jsx";
import Toolbar from "../../UI/Toolbar.jsx";
import { useDispatch } from "react-redux";
import { setTeacherId, setType } from "../../Reducers/testReducer.js";
import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function CreateTestOnline() {
  const { teacherId } = useAuthUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setType("online"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(setTeacherId(teacherId));
  }, [teacherId, dispatch]);
  return (
    <div className="space-y-10">
      <Toolbar />
      <AddQuestion />
      <Questions />
    </div>
  );
}

export default CreateTestOnline;
