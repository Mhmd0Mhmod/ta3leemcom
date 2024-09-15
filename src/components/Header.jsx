import {useLocation, Link, useSearchParams} from "react-router-dom";
import Logo from "../../public/Icons/ta3leemComLogo.svg";
import Button from "./ui-local/Button.jsx";
import ArrowLeft from "../../public/Icons/leftArrow.svg";
import Drop from "../../public/Icons/drop2.svg";
import Profile from "../../public/Icons/blackProfile.svg";
import SmallProfile from "../../public/Icons/profile-unfill.svg";
import Logout from "../../public/Icons/logout.svg";

import {useState} from "react";
import Triangle from "../../public/Icons/tringle list.svg";
import AsideDashboard from "@/components/ui-local/AsideDashboard.jsx";
import StudentTests from "../../public/Icons/StudentTests.svg";
import StudentToppers from "../../public/Icons/StudentToppers.svg";
import Money from "../../public/Icons/StudentMonths.svg";
import Group from "../../public/Icons/group.svg";
import TestIcon from "../../public/Icons/test.svg";
import Details from "@/components/ui-local/Details.jsx";
import Graduted from "../../public/Icons/graduted.svg";
import {LEVELS} from "@/config.js";
import Meeting from "../../public/Icons/meeting.svg";
import Menu from "../../public/Icons/menu.svg";
import DropDashBoardList from "../../public/Icons/DropNavBar.svg";

const currentUser = {
    role: "student",
    name: "Ahmed",
    id: 1
};
export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [searchParam, setSearchParam] = useSearchParams();
    const [openTabsList, setOpenTabsList] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [showItems, setShowItems] = useState(true);
    const role = "teacher";

    function handleOpenProfile() {
        setSearchParam({...Object.fromEntries(searchParam.entries()), Profile: currentUser.id});
    }

    function handleTabListOpen(e) {
        console.log(e.target.tagName)
        if (e.target.closest("li"))
            setOpenTabsList(false)
    }

    return (
        <nav className={"relative flex justify-between font-almaria ml-10 mb-3 gap-4"}>
            {/* <img src={logo} alt={"Icon"} /> */}
            <ul className={"flex items-center justify-between gap-5 text-3xl "}>
                <Logo/>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/home" ? "active" : ""
                    }`}
                >
                    <Link to="/home">الرئيسية</Link>
                </li>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/about" ? "active" : ""
                    }`}
                >
                    <Link to="/about">عن</Link>
                </li>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/services" ? "active" : ""
                    }`}
                >
                    <Link to="/services">الخدمات</Link>
                </li>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/instructions" ? "active" : ""
                    }`}
                >
                    <Link to="/instructions">تعليمات</Link>
                </li>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/subscriptions" ? "active" : ""
                    }`}
                >
                    <Link to="/subscriptions">الاشتركات</Link>
                </li>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/opinion" ? "active" : ""
                    }`}
                >
                    <Link to="/opinion">رأيك</Link>
                </li>
                <li
                    className={`whitespace-nowrap pb-2 hover:text-[#0884A2] duration-500 ${
                        currentPath === "/contact-with-us" ? "active" : ""
                    }`}
                >
                    <Link to="/contact-with-us">تواصل معنا</Link>
                </li>
            </ul>

            {role && (
                <div className={"flex w-full justify-between items-center"}>
                    <div className={"flex items-center gap-4 relative"}>
                        <div className={"w-[3px] h-10  bg-[#605E5E] "}/>
                        <button
                            className={"flex gap-[10px] items-center text-2xl"}
                            onClick={() => setOpenTabsList(!openTabsList)}
                        >
                            {role === "student" && <>
                                <span>الطالب</span>
                                <Drop className={openTabsList ? "" : "rotate-180 duration-300"}/>
                            </>
                            }
                            {role === "teacher" &&
                                <DropDashBoardList className={`${openTabsList ? "rotate-180" : ""} duration-200`}/>}
                        </button>
                        {openTabsList && (
                            <div
                                className={`absolute top-16 z-50 bg-[#F5F7F9] rounded px-4 py-2 w-72  ${showItems ? "w-72" : "w-fit"}`}
                                onClick={handleTabListOpen}
                            >
                                {role === "student" && <AsideDashboard
                                    opened={openTabsList}
                                    setOpened={setOpenTabsList}
                                    tabs={[
                                        {name: "الاختبارات", tab: "tests", icon: StudentTests},
                                        {name: "الاوائل", tab: "toppers", icon: StudentToppers},
                                        {name: "الشهور", tab: "months", icon: Money},
                                    ]}
                                />}{
                                role === "teacher" &&
                                <>
                                    <div className={`flex ${showItems ? " justify-end" : "justify-center"}`}>
                                        <Menu
                                            className={`w-9 ${showItems ? "" : "rotate-Y-180"} transition duration-100 `}
                                            onClick={() => setShowItems((showItems) => !showItems)}
                                        />
                                    </div>
                                    <AsideDashboard opened={showItems} setOpened={setShowItems} tabs={[
                                        {name: "اضافة طالب", tab: "addStudent", icon:  Profile },
                                        {name: "اضافة مجموعة", tab: "addGroup", icon: Group},
                                        {
                                            name: "اضافة اختبار",
                                            tab: "addTest",
                                            icon: TestIcon,
                                            Details: <Details className={"gap-[18px]"} summary={"اضافة اختبار"}
                                                              Icon={TestIcon}
                                                              opend={showItems}
                                                              listItems={["اونلاين", "اوفلاين"]}
                                                              tabName={["online", "offline"]}
                                                              param={"test"}
                                            />
                                        },
                                        {
                                            name: "المراحل الدراسية",
                                            tab: "StudyLevels",
                                            icon: Graduted,
                                            Details: <Details className={"gap-[18px]"} summary={"المراحل الدراسية"}
                                                              Icon={Graduted}
                                                              opend={showItems}
                                                              listItems={LEVELS.levels.map((el) => el.split(" ").at(1))}
                                                              tabName={Object.keys(LEVELS).slice(1)}
                                                              param={"level"}/>
                                        },
                                        {name: "عقد اجتماع", tab: "meeting", icon: Meeting}
                                    ]}/>
                                </>
                            }
                            </div>
                        )}
                    </div>
                    <div className={"relative self-center"}>
                        <Button
                            className={"flex items-center gap-2 bg-transparent border-0 !text-[#605E5E]"}
                            onClick={() => setOpenList((openList) => !openList)}
                        >
                            {currentUser.name}
                            <Drop className={`${openList ? "" : "rotate-180"} duration-300`}/>
                        </Button>
                        {openList && (
                            <ul
                                className={
                                    "border absolute z-40 top-16 left-2 bg-white flex flex-col gap-4 rounded p-2 "
                                }
                            >
                                <Triangle className="absolute -top-5 left-5" width={25} height={25}/>
                                <li
                                    className={
                                        "w-48 flex items-center gap-4 cursor-pointer text-xl p-1 rounded duration-300 hover:bg-[#B4D3E0]"
                                    }
                                    onClick={handleOpenProfile}
                                >
                                    <SmallProfile />
                                    <span>الملف الشخصي</span>
                                </li>
                                <li
                                    className={
                                        "w-48 flex items-center gap-4 cursor-pointer text-xl p-1 rounded duration-300 hover:bg-[#FFB2B3] "
                                    }
                                    onClick={() => setSearchParam({mr: "logout"})}
                                >
                                    <Logout/>
                                    <span>تسجيل الخروج</span>
                                </li>
                            </ul>
                        )}
                        {role==="teacher" && <>

                        </>}
                    </div>
                </div>
            )}
            {
                !role && (
                    <div className={"flex items-center gap-[10px]"}>
                        <Button
                            type={"ghost"}
                            className={"border-0 "}
                            onClick={() => setSearchParam({mr: "login"})}
                        >
                            تسجيل الدخول
                        </Button>
                        <Button
                            type={"primary"}
                            className={"flex items-center gap-2"}
                            onClick={() => setSearchParam({mr: "signUp"})}
                        >
                            انضم إلينا
                            <ArrowLeft className={"w-7"}/>
                        </Button>
                    </div>
                )
            }
        </nav>
    )
        ;
}
