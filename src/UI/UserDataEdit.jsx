import ProfileImage from "./ProfileImage";
import UpdateTeacherData from "./UpdateTeacherData";
import UpdateTeacherPassword from "./UpdateTeacherPassword";

function UserDataEdit() {
  return (
    <div className="space-y-10">
      <ProfileImage />
      <UpdateTeacherData />
      <UpdateTeacherPassword />
    </div>
  );
}
export default UserDataEdit;
