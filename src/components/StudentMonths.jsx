import Heading from "@/components/ui-local/Heading.jsx";
import HeadIcon from "../../public/Icons/head-icon-student.svg"
import BgIcon from "../../public/Icons/flow-months-student-bg.svg"
import Paid from "../../public/Icons/paied.svg"
import Done from "../../public/Icons/done.svg"
import HeadMonthsStudent from "@/components/HeadMonthsStudent.jsx";
import DropList from "@/components/ui-local/DropList.jsx";
import {MonthsInArabic} from "@/config.js";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";

function StudentMonths() {
    const [value, setValue] = useState("");
    const handleShowMore = () => {
        console.log("show more")
    }
    return (
        <>
            <BgIcon className={"absolute left-[10%] top-[15%] "}/>
            <div className={"flex justify-center gap-12 "}>
                <Heading as={"h3"} className={"font-almaria-bold text-center"}>متابعة الشهر الدراسي</Heading>
                <HeadIcon/>
            </div>
            <div className={"flex flex-col justify-between mt-20 gap-16"}>

                <div>
                    <HeadMonthsStudent title={"اختر الشهر"}/>
                    <div className={"mr-10"}>
                        <DropList title={"اختر الشهر"} options={MonthsInArabic} value={value} setValue={setValue}>
                            <span className={"text-[#666666]"}> الشهر</span>
                            <span className={"h-full w-[2px] bg-[#D9D9D9]"}></span>
                        </DropList>
                    </div>
                </div>
                <div>
                    <HeadMonthsStudent title={"دفع الشهر"}/>
                    <div
                        className={"w-2/5 flex  items-center justify-center gap-10 rounded-[7px] py-4 bg-white mr-10 "}>
                        <Paid/>
                        <span className={"text-[18px] font-almaria-bold "}>الشهر مدفوع</span>
                    </div>
                </div>
                <div>
                    <div className={"w-1/6 flex items-center justify-between"}>
                        <HeadMonthsStudent title={"الحصص"}/>
                        <Button className={"text-[#0884A2] p-0 bg-transparent font-almaria-bold hover:bg-transparent"}
                                onClick={handleShowMore}>عرض المزيد</Button>
                    </div>
                    <div className={"flex w-1/4 items-center gap-2 mr-10"}>
                        <div
                            className={" rounded-[7px] py-4 bg-white  flex-1  text-center ml-4"}>
                            {new Date().toLocaleDateString("ar-EG")}
                        </div>
                        <Done/>
                        <span className={"text-[18px] font-almaria-bold "}>الشهر مدفوع</span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default StudentMonths;