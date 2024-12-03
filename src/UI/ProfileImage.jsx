import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Profile from "/public/Icons/Profile (2).svg";
function ProfileImage() {
  const { name, email } = useAuthUser() || {};
  return (
    <>
      <div className="flex items-center gap-4">
        <Profile className="w-16 md:w-32" />
        <div>
          <p className="font-cairo-bold text-lg">{name}</p>
          <p className="text-lg">{email}</p>
        </div>
      </div>
    </>
  );
}
export default ProfileImage;
