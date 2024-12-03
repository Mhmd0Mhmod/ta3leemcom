import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TeacherData from "../UI/TeacherData";
import StudentData from "../UI/StudentData";

function UserData() {
  const { role } = useAuthUser() || {};
  return <div className="xl:px-10">{role === "Teacher" ? <TeacherData /> : <StudentData />}</div>;
}
export default UserData;
