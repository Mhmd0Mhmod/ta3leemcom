import Graduted from "../../../../../public/Icons/graduted.svg";
import Profile from "../../../../../public/Icons/blackProfile.svg";
import Group from "../../../../../public/Icons/group.svg";
import Meeting from "../../../../../public/Icons/meeting.svg";
import ThreeCirlce from "../../../../../public/Icons/threeCirlceDashboard.svg";
import Menu from "../../../../../public/Icons/menu.svg";
import ScrollTop from "../../../../../public/Icons/scroll_top_icon.svg";
import TestIcon from "../../../../../public/Icons/test.svg";
import {useSearchParams} from "react-router-dom";
import {useState, useEffect} from "react";
import AddStudent from "../../../../Features/student/AddStudent.jsx";
import Details from "../../../../UI-Global/Details.jsx";
import AddGroup from "../../../../Features/group/AddGroup.jsx";
import Test from "./Components/Test.jsx";
import Level from "./Components/Level.jsx";
import {LEVELS} from "../../../../config.js";
import Students from "./Components/Students.jsx";
import Months from "./Components/Months.jsx";
import Toppers from "@/Features/toppers/Toppers.jsx";
import AsideDashboard from "@/pages/Dashboard/Components/AsideDashboard.jsx";

function TeacherDashboard() {
    const [opened, setOpened] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "addStudent";
    const [showScrollTop, setShowScrollTop] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        document.getElementById("innerContent").scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className={"flex dashboard gap-5 font-cairo mb-4   "}>
            <div className={`p-2.5 bg-gray-100 rounded ${opened ? "w-[320px]" : "w-fit"} self-start `}>
                <div className={`flex ${opened ? " justify-end" : "justify-center"}`}>
                    <Menu className={`w-9 ${opened ? "" : "rotate-Y-180"} transition duration-100 `}
                          onClick={() => setOpened((open) => !open)}/>
                </div>
                <AsideDashboard opened={opened} setOpened={setOpened} tabs={[
                    {name: "اضافة طالب", tab: "addStudent", icon: Profile},
                    {name: "اضافة مجموعة", tab: "addGroup", icon: Group},
                    {
                        name: "اضافة اختبار",
                        tab: "addTest",
                        icon: TestIcon,
                        Details: <Details className={"gap-[18px]"} summary={"اضافة اختبار"} Icon={TestIcon}
                                          opend={opened} listItems={["اونلاين", "اوفلاين"]}
                                          tabName={["online", "offline"]}
                                          param={"test"}
                        />
                    },
                    {
                        name: "المراحل الدراسية",
                        tab: "StudyLevels",
                        icon: Graduted,
                        Details: <Details className={"gap-[18px]"} summary={"المراحل الدراسية"} Icon={Graduted}
                                          opend={opened} listItems={LEVELS.levels.map((el) => el.split(" ").at(1))}
                                          tabName={Object.keys(LEVELS).slice(1)} param={"level"}/>
                    },
                    {name: "عقد اجتماع", tab: "meeting", icon: Meeting}
                ]}/>
            </div>
                <div className={"w-[1px] self-stretch bg-gray-100"}></div>
                <div className={" p-10 bg-gray-100 self-stretch flex-grow rounded relative"}>
                    <div id="innerContent" className={"w-32    absolute top-0 left-0"}>
                        <ThreeCirlce/>
                    </div>
                    {activeTab === "addStudent" && <AddStudent/>}
                    {activeTab === "addGroup" && <AddGroup/>}
                    {activeTab === "test" && <Test/>}
                    {activeTab === "level" && <Level/>}
                    {activeTab === "students" && <Students/>}
                    {activeTab === "months" && <Months/>}
                    {activeTab === "toppers" && <Toppers/>}
                    {activeTab === "meeting" && <h1>عقد اجتماع</h1>}
                    {showScrollTop && (
                        <button onClick={scrollToTop}
                                className="absolute left-12 bottom-12 hover:-translate-y-1 transition-all duration-300">
                            <ScrollTop/>
                        </button>
                    )}
                </div>
            </div>
            );
            }

            export default TeacherDashboard;