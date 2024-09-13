import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../public/imgs/profileLogo.svg";
import Exit from "../../public/Icons/exitt.svg";
import EditProfile from "../../public/Icons/edit-prof.svg";
import Pc from "../../public/Icons/pc.svg";
import Notification from "../../public/Icons/notification.svg";
import PersonalProfile from "./PersonalProfile";

function Profile({children}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");
  const navigate = useNavigate();
  const location = useLocation();
  const handleButtonClick = (e) => {
    e.preventDefault()
    if(e.target.id === "all" || e.target.id === "exit")
    navigate(location.pathname);
  };
  const handleTabClick = (tab) => {
    setSearchParams({ tab });
  };
  
  if (!searchParams.get("Profile")) return;
  return (
    <>
      <div className="w-full h-full fixed z-[989] bg-[rgb(0,0,0,0.4)] m-0" id="all" onClick={handleButtonClick}>
        <div className="w-[88.188rem] bg-[white] border-2 h-[46.25rem] absolute z-[999] right-[15.625rem] top-[6.25rem] rounded-xl flex">
          <div className="h-[100%]  ">
            <div className="w-full border-b-2 border-l-2  h-[4.375rem] flex p-4 items-center">
                <Exit alt="exit" width={30} onClick={handleButtonClick} id="exit"/>
            </div>
            <div className="h-[41.563rem] border-l-2">
              {children}
            </div>
          </div>

          <div className="h-full w-[85%] ">
            <div className="w-full border-b-2  h-[4.375rem] flex justify-center items-center">
              <Logo alt="logo" width={135} />
            </div>
            {activeTab === "PersonalProfile" && <PersonalProfile />}
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
