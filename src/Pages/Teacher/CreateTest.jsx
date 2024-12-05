import { Outlet } from "react-router-dom";
import TestSetting from "../../UI/TestSetting.jsx";
import { useTest } from "../../Features/TeacherTests/useTest.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTest } from "../../Reducers/testReducer.js";
import Loading from "../../UI/Loading.jsx";

function CreateTest() {
  const { test, isLoading, error } = useTest();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) return;
    if (test) {
      dispatch(setTest(test));
    }
  }, [test, dispatch, isLoading]);
  if (isLoading) return <Loading />;

  return (
    <div className="space-y-10">
      <TestSetting />
      <Outlet />
    </div>
  );
}

export default CreateTest;
