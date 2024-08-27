import {useSearchParams} from "react-router-dom";
import {FakeGroups, LEVELS} from "../config.js";
import {useEffect, useState} from "react";
import Heading from "./ui/Heading.jsx";
import arrow from "../../public/Icons/arrow_in_levels.svg";
import eye from "../../public/Icons/eye.svg";
import edit from "../../public/Icons/editPen.svg";
import trash from "../../public/Icons/recyclePin.svg";
import tests from "../../public/Icons/tests.svg"
import students from "../../public/Icons/students.svg"
import toppers from "../../public/Icons/toppers.svg"
import monthes from "../../public/Icons/monthes.svg"

function Test() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedGroups, setSelectedGroups] = useState([FakeGroups[0]]);
    const levels = LEVELS[searchParams.get("level")];
    let mainLevel = "";
    switch (searchParams.get("level")) {
        case "primary":
            mainLevel = "الإبتدائي";
            break;
        case "middle":
            mainLevel = "الإعدادي";
            break;
        case "high":
            mainLevel = "الثانوي";
            break;
        default:
    }
    const subLevels = searchParams.get("subLevel");
    useEffect(() => {
        //will Fetch groups from the server
        setSelectedGroups([FakeGroups[0]]);
    }, [levels, subLevels]);

    const handleGroupClick = (group) => {
        if (selectedGroups.includes(group)) {
            setSelectedGroups(prevGroups => prevGroups.filter(prevGroup => prevGroup !== group));
            return;
        }
        setSelectedGroups(prevGroups => [...prevGroups, group]);
    };

    return (
        <div className={"font-almaria flex flex-col gap-10"}>
            <div className={"bg-white p-5 w-fit shadow-[9px_5px_9.1px_4px_#0884A23D] rounded"}>
                <ul className={"flex gap-10 "}>
                    {levels?.map((level, i) => (
                        <li key={i}
                            className={`relative  p-1 cursor-pointer  ${Number(subLevels) === i ? "halfunderline text-black" : "text-[#8b8b8b] hover:text-black duration-500"} `}
                            onClick={() => {
                                setSearchParams({tab: "level", level: searchParams.get("level"), subLevel: i});
                            }}>{level}{" "}{mainLevel}</li>
                    ))}
                </ul>
            </div>
            <div className={"flex gap-[10%]"}>
                <div className={"flex flex-col pr-10"}>
                    <div className={"flex gap-2"}>
                        <Heading as={"h1"} className={"text-[24px] font-almaria-bold"}>المجموعات</Heading>
                        <img src={arrow} alt={"arrow"}/>
                    </div>
                    <div className={"bg-white p-5 rounded-[23px] h-fit max-h-64 overflow-y-auto"}>
                        <ul className={"flex flex-col gap-5"}>
                            {FakeGroups.map(group => (
                                <li key={group.id}
                                    className={`border border-[#0884A24D] flex gap-2 p-2 rounded-[7px] overflow-hidden font-almaria-bold cursor-pointer hover:bg-[#b4d3e0] transition duration-500 ${selectedGroups.includes(group) ? "bg-[#68ABBB]" : ""}`}
                                    onClick={() => handleGroupClick(group)}>
                                    <img src={trash} alt={"trash"}/>
                                    <img src={edit} alt={"edit"}/>
                                    <span className={"flex-1 text-center"}>{group.name}</span>
                                    <img src={eye} alt={"eye"}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={"flex-1 self-center mt-16 grid grid-cols-2 grid-rows-2 gap-[74px]"}>
                    {[{name: "الاختبارات", icon: tests}, {name: "الطلاب", icon: students }, {name: "الاشهور", icon: monthes}, {name: "المتفوقون", icon: toppers}].map((item, i) => (
                        <div key={i}
                             className={"flex flex-col items-center gap-5 cursor-pointer"}>
                            <div className={"relative"}>
                                <img src={item.icon} alt={item.name}/>
                                <span className={"w-full h-full absolute top-0 rounded-full hover:bg-[#00000033]"}></span>
                            </div>
                            <span className={"font-almaria-bold text-xl"}>{item.name}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Test;