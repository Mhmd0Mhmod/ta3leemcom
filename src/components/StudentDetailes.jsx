import { useSearchParams } from "react-router-dom";
function StudentDetailes() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId");
  return (
    <div>
      <h1>Student Detailes</h1>
      <p>Student ID: {studentId}</p>
    </div>
  );
}

export default StudentDetailes;
