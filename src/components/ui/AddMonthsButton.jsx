import Button from "./Button.jsx";
import plus from "/public/Icons/plus.svg";
import {useState} from "react";
import {MonthsInArabic} from "../../config.js";


function AddMonthsButton({onClick}) {
    const [search, setSearch] = useState("");
    const [months, setMonths] = useState([...MonthsInArabic]);
    const [openSelectMonths, setOpenSelectMonths] = useState(false);

    function searchMonths(search) {
        if (search === "") {
            setMonths(MonthsInArabic);
        } else {
            setMonths(MonthsInArabic.filter(month => month.includes(search)));
        }
    }

    return (
        <div className={"relative"}>

            <Button type="Secondary" icon={<img src={plus}/>} onClick={() => {
                setOpenSelectMonths(!openSelectMonths);
                onClick();
            }}>
                اضافة شهر
            </Button>
            {openSelectMonths &&
                <div className={"absolute w-fit bg-white p-5 rounded top-full right-0 flex flex-col gap-6 text-xl"}>
                    <input type={"text"} placeholder={"ابحث عن شهر"} className={"rounded border p-2 text-black"}
                           value={search}
                           onChange={e => {
                               setSearch(e.target.value);
                               searchMonths(e.target.value);
                           }}/>
                    <ul className={"text-right max-h-[218px] overflow-auto"}>
                        {months.map((month, index) => (
                            <li key={index}
                                className={"flex gap-4  border-b  rounded p-2 text-black hover:bg-[#B4D3E0] duration-500"}>
                                <input type={"checkbox"} name={"months"} value={month} id={month}
                                       className={"w-[22px]"}/>
                                <label htmlFor={month}>
                                    {month}
                                </label>
                            </li>))}
                    </ul>
                    <div className={"flex gap-4"}>
                        <Button type={"normal"} className={"!text-black !border-[#D9D9D9]"}
                                onClick={() => setOpenSelectMonths(!openSelectMonths)}>الغاء</Button>
                        <Button type={"Secondary"} className={"bg-secondary"}>إضافة</Button>
                    </div>
                </div>}
        </div>
    );
}

export default AddMonthsButton;