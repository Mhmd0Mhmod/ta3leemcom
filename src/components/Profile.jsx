import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../public/imgs/profileLogo.svg";
import Exit from "../../public/Icons/exitt.svg";
import EditProfile from "../../public/Icons/edit-prof.svg";
import Pc from "../../public/Icons/pc.svg";
import Notification from "../../public/Icons/notification.svg";

function Profile() {
  const [searchParam, setSearchParams] = useSearchParams();
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
  
  if (!searchParam.get("Profile")) return;
  return (
    <>
      <div className="w-full h-full fixed z-[989] bg-[rgb(0,0,0,0.4)] m-0" id="all" onClick={handleButtonClick}>
        <div className="w-[88.188rem] bg-[white] border-2 h-[46.25rem] absolute z-[999] right-[15.625rem] top-[6.25rem] rounded-xl flex">
          <div className="h-[100%] w-[15%] ">
            <div className="w-full border-b-2 border-l-2  h-[4.375rem] flex pr-4 items-center">
                <Exit alt="exit" width={30} onClick={handleButtonClick} id="exit"/>
            </div>
            <div className="h-[41.563rem] border-l-2 pt-10">
              <div className="h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3" >
                <EditProfile alt="profile" />
                <p className="font-almaria-bold text-lg cursor-pointer">الملف الشخصي </p>
              </div>
              <div className="h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3">
                <Pc alt="pc" />
                <p className="font-almaria-bold text-lg cursor-pointer">الاشتراك</p>
              </div>
              <div className="h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3">
                <Notification alt="notification" />
                <p className="font-almaria-bold text-lg cursor-pointer">الإشعارات </p>
              </div>
            </div>
          </div>
          <div className="h-full w-[85%] ">
            <div className="w-full border-b-2  h-[4.375rem] flex justify-center items-center">
              <Logo alt="logo" width={135} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
