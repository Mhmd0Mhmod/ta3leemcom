import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../../../public/imgs/profileLogo.svg";
import Exit from "../../../../public/Icons/exitt.svg";
import EditProfile from "../../../../public/Icons/edit-prof.svg";
import Pc from "../../../../public/Icons/pc.svg";
import Notification from "../../../../public/Icons/notification.svg";
import PersonalProfile from "./PersonalProfile.jsx";
import Profile from "../Profile.jsx";
export default function TeacherProfileSide() {
const [searchParams, setSearchParams] = useSearchParams();
const [activeDiv, setActiveDiv] = useState("PersonalProfile");
const handleDivClick = (tabName) => {
  setActiveDiv(tabName);
  setSearchParams({...Object.fromEntries(searchParams.entries()), tab: tabName});
};
  if (!searchParams.get("Profile")) return;
  return (
    <div className="pt-10">
      <div className={`h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3 ${activeDiv === "PersonalProfile" ? "bg-[#E5F0F4] border-l-4 border-[#0884A2]" : ""
          }`}
          onClick={() => 
            handleDivClick("PersonalProfile")
          }    
      >
        <EditProfile alt="profile" />
        <p
          className={`font-almaria-bold text-lg w-[9.375rem] cursor-pointer`}

        >
          الملف الشخصي
        </p>
      </div>
      <div className={`h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3 ${activeDiv === "Subscription" ? "bg-[#E5F0F4] border-l-4 border-[#0884A2]" : ""
          }`}
          onClick={() => 
            handleDivClick("Subscription")
          }    
          >
        <Pc alt="pc" />
        <p className="font-almaria-bold text-lg cursor-pointer"
        onClick={() =>
          handleDivClick ("Subscription")
        }
        >الاشتراك</p>
      </div>
      {/* <div className={`h-[3.438rem] w-full hover:border-l-4 border-[#0884A2] duration-100 mb-6 ps-4 flex items-center gap-3 ${activeDiv === "Notification" ? "bg-[#E5F0F4] border-l-4 border-[#0884A2]" : ""
          }`}
          onClick={() => 
            handleDivClick("Notification")
          }    
          >
        <Notification alt="notification" />
        <p className="font-almaria-bold text-lg cursor-pointer"
        onClick={() =>
          setSearchParams({ tab: "Notification", Profile: true })
        }
        >الإشعارات </p>
      </div> */}
    </div>
  );
}
