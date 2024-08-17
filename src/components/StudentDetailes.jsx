import { useSearchParams } from "react-router-dom";
function StudentDetailes() {
  const [searchParam] = useSearchParams();
  const studentId = searchParam.get("studentId");
  return <div></div>;
}

export default StudentDetailes;
