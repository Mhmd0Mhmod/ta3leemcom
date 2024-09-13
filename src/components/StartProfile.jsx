import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../public/imgs/profileLogo.svg";
import Exit from "../../public/Icons/exitt.svg";
import EditProfile from "../../public/Icons/edit-prof.svg";
import Pc from "../../public/Icons/pc.svg";
import Notification from "../../public/Icons/notification.svg";
import PersonalProfile from "./PersonalProfile";
import Profile from "./Profile";
export default function StartProfile() {
const [searchParams, setSearchParams] = useSearchParams();
const activeTab = searchParams.get("tab");
const location = useLocation();
  
  if (!searchParams.get("Profile")) return;
  return (
    <div>
      <div className="h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3">
        <EditProfile alt="profile" />
        <p
          className="font-almaria-bold text-lg cursor-pointer"
          onClick={() =>
            setSearchParams({ tab: "PersonalProfile", Profile: true })
          }
        >
          الملف الشخصي{" "}
        </p>
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
  );
}
