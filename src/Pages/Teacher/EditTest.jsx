import { useDispatch } from "react-redux";
import { useTest } from "../../Features/TeacherTests/useTest";
import CreateTestOnline from "./CreateTestOnline";
import { useEffect } from "react";
import { setTest } from "../../Reducers/testReducer";
import CreateTest from "./CreateTest";

function EditTest() {
  const { test } = useTest();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTest(test));
  }, [test, dispatch]);

  return (
    <>
      <CreateTest />
      <CreateTestOnline />
    </>
  );
}

export default EditTest;
