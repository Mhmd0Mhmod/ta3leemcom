import HeadingLevelsPages from "./ui/HeadingLevelsPages.jsx";
import AddMonthsButton from "./ui/AddMonthsButton.jsx";
import DropList from "./ui/DropList.jsx";
import trash from "/public/Icons/trash_icon.svg";
import {MonthsInArabic} from "../config.js";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

function Months() {
    const months = MonthsInArabic;
    const [selectedMonth, setSelectedMonth] = useState("");
    const currentYear = new Date().getFullYear();
    const [searchParams] = useSearchParams();
    const [selectedGroup, setSelectedGroup] = useState(null);
    const groups = searchParams.get("group")?.split("_") || [];
    return (
        <div className="flex flex-col gap-6">
            <HeadingLevelsPages title="الاشهر"/>
            <div className="flex gap-40 items-center ">
                <AddMonthsButton/>
                <div className="flex gap-6">
                    <DropList title="اختر الشهر" setValue={setSelectedMonth}
                              options={months.map(el => `${el} - ${currentYear}`)}
                              optionsWithJSX={months.map((month) => (
                                  <>
                                      <span>{month}</span>
                                      <span className={"mr-auto"}>{currentYear}</span>
                                      <img src={trash} alt="delete"/>
                                  </>

                              ))} optionsValue={months} classNameButton="flex flex-row-reverse justify-around"
                              classNameItem={"flex gap-5"} classNameUl={"max-h-[190px]  overflow-auto"}/>
                    <DropList title={"اختر المجموعه"} options={groups} setValue={setSelectedGroup} optionsValue={groups} classNameButton="flex flex-row-reverse justify-around"
                              classNameItem={"flex gap-5"} classNameUl={"max-h-[190px] overflow-auto"}/>
                </div>
            </div>
        </div>
    );
}

export default Months;