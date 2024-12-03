import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TeacherProfile from "../UI/TeacherProfile";
import StudentProfile from "../UI/StudentProfile";

function Profile() {
  const { role } = useAuthUser() || {};
  return role === "Teacher" ? <TeacherProfile /> : role === "Student" ? <StudentProfile /> : <></>;
}
export default Profile;
