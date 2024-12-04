import { useStudentsNotAttended } from "../Features/TestResults/useStudentsNotAttended";
import Heading from "./Heading";
import Loading from "./Loading";

function TestStudentsNotAttempted() {
  const { students, isLoading, error } = useStudentsNotAttended();
  console.log(students);

  return (
    <div className="mt-10 space-y-5">
      <Heading as="h3" className={"rounded-md bg-red-600 py-2 text-center text-white"}>
        اسم الطالب
      </Heading>
      {isLoading && <Loading />}
      {error && <p className="text-center text-red-500">{error}</p>}
      {students?.length === 0 && <p className="text-center text-xl">لا يوجد طلاب</p>}
      {students?.map((student) => (
        <div key={student.id} className="rounded-md border border-gray-200 bg-white p-2 text-center">
          <p>{student.name}</p>
        </div>
      ))}
    </div>
  );
}
export default TestStudentsNotAttempted;
