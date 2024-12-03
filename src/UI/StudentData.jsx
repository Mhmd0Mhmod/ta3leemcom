import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ProfileImage from "./ProfileImage";
import Heading from "./Heading";

function StudentData() {
  const student = useAuthUser();
  console.log(student);

  return (
    <div className={"w-3/4 space-y-8"}>
      <ProfileImage />
      <Heading as="h4">الاسم الكامل</Heading>
      <p className="rounded-md bg-gray-200 p-4 text-lg">{student.name}</p>
      <Heading as="h4">الكود</Heading>
      <p className="rounded-md bg-gray-200 p-4 text-lg">{student.code}</p>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <Heading as="h4">المرحله الدراسيه</Heading>
          <p className="rounded-md bg-gray-200 p-4 text-lg">{student.levelName}</p>
        </div>
        <div>
          <Heading as="h4">الصف الدراسي</Heading>
          <p className="rounded-md bg-gray-200 p-4 text-lg">{student.levelYearName}</p>
        </div>
        <div>
          <Heading as="h4">المجموعه</Heading>
          <p className="rounded-md bg-gray-200 p-4 text-lg">{student.groupName}</p>
        </div>
      </div>
    </div>
  );
}
export default StudentData;
