import { useSearchParams } from "react-router-dom";

function Profile() {
  const [searchParam, setSeachParam] = useSearchParams();
  if (!searchParam.get("Profile")) return;

  return <div className="">
    profile
  </div>;
}
export default Profile;
