import AsideDashboard from "@/components/ui-local/AsideDashboard.jsx";
import StudentTests from "./../../public/Icons/StudentTests.svg";
import StudentToppers from "./../../public/Icons/StudentToppers.svg";
import Money from "./../../public/Icons/StudentMonths.svg";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import Toppers from "./../components/Toppers.jsx";
import {Student} from "@/config.js";
import StudentMonths from "@/components/StudentMonths.jsx";
import StudentTest from "@/StudentTest.jsx";
import Menu from "../../public/Icons/menu.svg";

function StudentDashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "tests";
    const [opened, setOpened] = useState(true);
    const mainStudent = Student;
    return (
        <div className={"flex dashboard gap-5 font-almaria mb-4 "}>
            <div className={`p-2.5 bg-gray-100 rounded ${opened ? "w-[320px]" : "w-fit"} self-start `}>
                <div className={`flex ${opened ? " justify-end" : "justify-center"}`}>
                    <Menu className={`w-9 ${opened ? "" : "rotate-Y-180"} transition duration-100 `}
                          onClick={() => setOpened((open) => !open)}/>
                </div>
                <AsideDashboard
                    opened={opened}
                    tabs={[
                        {name: "الاختبارات", tab: "tests", icon: StudentTests},
                        {name: "المتفوقون", tab: "toppers", icon: StudentToppers},
                        {name: "الشهور", tab: "months", icon: Money},
                    ]}/>
            </div>
                <div className={"w-[1px] self-stretch bg-gray-100"}/>
                <div className={" p-10 bg-gray-100 self-stretch flex-grow rounded relative"}>
                    {activeTab === "tests" && <StudentTest/>}
                    {activeTab === "toppers" && <Toppers groupsId={[mainStudent.groupId]} backToLevels={false}/>}
                    {activeTab === "months" && <StudentMonths/>}
                </div>
            </div>
            );
            }

            export default StudentDashboard;