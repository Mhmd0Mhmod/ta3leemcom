import AddQuestion from "../../UI/AddQuestion.jsx";
import Questions from "../../UI/Questions.jsx";
import Toolbar from "../../UI/Toolbar.jsx";
import { useDispatch } from "react-redux";
import { setType } from "../../Reducers/testReducer.js";
import { useEffect } from "react";

function CreateTestOnline() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setType("online"));
  }, [dispatch]);
  return (
    <div className="space-y-10">
      <Toolbar />
      <AddQuestion />
      <Questions />
    </div>
  );
}

export default CreateTestOnline;
