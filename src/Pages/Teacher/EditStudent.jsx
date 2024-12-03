import { useStudent } from "../../Features/Dashboard/useStudent.js";
import Loading from "../../UI/Loading.jsx";
import AddStudent from "./AddStudent.jsx";

function EditStudent() {
  const { student, isLoading: isFetching } = useStudent();
  if (isFetching) return <Loading />;
  return <AddStudent studentToEdit={student} />;
}

export default EditStudent;
