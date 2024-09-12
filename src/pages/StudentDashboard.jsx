import AsideDashboard from "@/components/ui-local/AsideDashboard.jsx";
import StudentTests from "./../../public/Icons/StudentTests.svg";
import StudentToppers from "./../../public/Icons/StudentToppers.svg";
import StudentMonths from "./../../public/Icons/StudentMonths.svg";
import {useState} from "react";
import ThreeCirlce from "../../public/Icons/threeCirlceDashboard.svg";

function StudentDashboard() {
    
    const [opened, setOpened] = useState(true);
    return (
        <div className={"flex dashboard gap-5 font-cairo mb-4 "}>
            <AsideDashboard
                opened={opened} setOpened={setOpened}
                tabs={[
                    {name: "الاختبارات", tab: "tests", icon: StudentTests},
                    {name: "الاوائل", tab: "toppers", icon: StudentToppers},
                    {name: "الشهور", tab: "months", icon: StudentMonths},
                ]}/>

            <div className={"w-[1px] self-stretch bg-gray-100"}/>
            <div className={" p-10 bg-gray-100 self-stretch flex-grow rounded relative"}>
                <div id="innerContent" className={"w-fit absolute top-0 left-0"}>
                    <ThreeCirlce />
                </div>
                {}
            </div>
        </div>
    );
}

export default StudentDashboard;