import { useSearchParams } from "react-router-dom";
import menu from "../../public/imgs/menu.svg";
import profile from "../../public/imgs/profile.svg";
import group from "../../public/imgs/group.svg";
import Icon from "../components/ui/Icon.jsx";
import Test from "../../public/imgs/test.svg";
import graduted from "../../public/imgs/graduted.svg";
import { useState, useEffect } from "react";
import AddStudent from "../components/AddStudent.jsx";
import threeCirlce from "../../public/imgs/threeCirlceDashboard.svg";
function TeacherDashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "addStudent";
    const [opened, setOpened] = useState(true);

    useEffect(() => {
        if (!searchParams.get("tab")) {
            setSearchParams({ tab: "addStudent" });
        }
    }, [searchParams, setSearchParams]);

    const handleTabClick = (tab) => {
        setSearchParams({ tab });
    };

    return (
        <div className={"flex gap-5 font-cairo"}>
            <div className={`p-2.5 bg-gray-100 rounded ${opened ? "w-1/6" : "w-fit"} self-start`}>
                <div className={"flex justify-end"}>
                    <Icon src={menu} className={`w-9 ${opened ? "" : "rotate-180"}`} onClick={() => setOpened((open) => !open)} />
                </div>
                <ul className={"flex gap-2 flex-col font-cairo-bold"}>
                    <li onClick={() => handleTabClick("addStudent")}
                        className={`rounded flex items-center gap-1 cursor-pointer ${activeTab === "addStudent" ? "active" : ""}`}>
                        <Icon src={profile} />
                        <span className={`${!opened ? "hidden" : ""}`}>اضافة طالب</span>
                    </li>
                    <li onClick={() => handleTabClick("addGroup")}
                        className={`rounded flex items-center gap-1 cursor-pointer ${activeTab === "addGroup" ? "active" : ""}`}>
                        <Icon src={group} />
                        <span className={`${!opened ? "hidden" : ""}`}>اضافة مجموعة</span>
                    </li>
                    <li onClick={() => handleTabClick("addTest")}
                        className={`rounded flex items-center gap-1 cursor-pointer ${activeTab === "addTest" ? "active" : ""}`}>
                        <Icon src={Test} />
                        <span className={`${!opened ? "hidden" : ""}`}>اضافة اختبار</span>
                    </li>
                    <li onClick={() => handleTabClick("StudyLevels")}
                        className={`rounded flex items-center gap-1 cursor-pointer ${activeTab === "StudyLevels" ? "active" : ""}`}>
                        <Icon src={graduted} />
                        <span className={`${!opened ? "hidden" : ""}`}>المراحل الدراسية</span>
                    </li>
                </ul>
            </div>
            <div className={"w-1 self-stretch bg-gray-100"}></div>
            <div className={"p-10 bg-gray-100 self-stretch flex-grow rounded relative"}>
                <div className={"w-32    absolute top-0 left-0"}>
                    <img src={threeCirlce} alt={"threeCirlce"} />
                </div>
                {activeTab === "addStudent" && <AddStudent />}
                {activeTab === "addGroup" && <h1>اضافة مجموعة</h1>}
                {activeTab === "addTest" && <h1>اضافة اختبار</h1>}
                {activeTab === "StudyLevels" && <h1>المراحل الدراسية</h1>}
            </div>
        </div>
    );
}

export default TeacherDashboard;