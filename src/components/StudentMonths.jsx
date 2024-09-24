import Heading from "@/components/ui-local/Heading.jsx";
import HeadIcon from "../../public/Icons/head-icon-student.svg"
import BgIcon from "../../public/Icons/flow-months-student-bg.svg"
import Paid from "../../public/Icons/paied.svg"
import Done from "../../public/Icons/done.svg"
import False from "../../public/Icons/false.svg";
import HeadMonthsStudent from "@/components/HeadMonthsStudent.jsx";
import DropList from "@/components/ui-local/DropList.jsx";
import {MonthsInArabic} from "@/config.js";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";

const FakeAttendance = [
    {date: "2022-09-09", present: true},
    {date: "2022-09-09", present: false}, {
        date: "2022-09-09",
        present: true
    }, {date: "2022-09-09", present: false}, {date: "2022-09-09", present: true}, {
        date: "2022-09-09",
        present: false
    }, {date: "2022-09-09", present: true}, {date: "2022-09-09", present: false}, {
        date: "2022-09-09",
        present: true
    }, {date: "2022-09-09", present: false}, {date: "2022-09-09", present: true}, {
        date: "2022-09-09",
        present: false
    }, {date: "2022-09-09", present: true}, {date: "2022-09-09", present: false}, {
        date: "2022-09-09",
        present: true
    }, {date: "2022-09-09", present: false}, {date: "2022-09-09", present: true}, {
        date: "2022-09-09",
        present: false
    }, {date: "2022-09-09", present: true}, {date: "2022-09-09", present: false}];

function StudentMonths() {
    const [value, setValue] = useState("");
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {
        setShowMore(!showMore)
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
                <div >
                    <div className={"w-1/6 flex items-center justify-between"}>
                        <HeadMonthsStudent title={"الحصص"}/>
                        <Button className={"text-[#0884A2] p-0 bg-transparent font-almaria-bold hover:bg-transparent"}
                                onClick={handleShowMore}>{showMore ? "عرض اخر حصه فقط" : "عرض المزيد"}</Button>
                    </div>

                    {showMore ? <div className={"flex justify-between"}>
                            <span className={"self-end text-xl font-almaria-bold"}>الحضور</span>
                            <div className={"flex max-w-7xl overflow-x-auto  bg-white p-3 rounded"}>
                                {FakeAttendance.map((item, index) =>
                                    <div
                                        key={index}
                                        className={"flex flex-col justify-between items-center rounded   border-[#D9D9D9] min-w-24 h-24 hover:bg-[#E4E8E9] py-2"}>
                                        <span className={"font-almaria-bold"}>{new Date(item.date).toLocaleDateString("ar-EG")}</span>
                                        <span>{item.present ? <Done/> : <False width={42} height={42}/>}</span>
                                    </div>)
                                }
                            </div>
                        </div> :
                        <div className={"flex w-1/4 items-center gap-2 mr-10"}>

                            <div
                                className={" rounded-[7px] py-4 bg-white  flex-1  text-center ml-4"}>
                                {new Date().toLocaleDateString("ar-EG")}
                            </div>
                            <Done/>
                            <span className={"text-[18px] font-almaria-bold "}>تم الحضور</span>

                        </div>
                    }

                </div>
            </div>
        </>
    )
        ;
}

export default StudentMonths;