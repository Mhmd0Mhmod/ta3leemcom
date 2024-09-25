import Button from "../../UI-Global/Button.jsx";
import Plus from "/public/Icons/plus.svg";
import { useState } from "react";
import { MonthsInArabic } from "../../config.js";
function AddMonthsButton({ onClick }) {
    const [monthSearch, setMonthSearch] = useState("");
    const [months, setMonths] = useState([...MonthsInArabic]);
    const [openSelectMonths, setOpenSelectMonths] = useState(false);
    
    function searchMonths(monthSearch) {
        if (monthSearch === "") {
            setMonths(MonthsInArabic);
        } else {
            setMonths(MonthsInArabic.filter((month) => month.includes(monthSearch)));
        }
    }
    return (
        <div className={"relative"}>
            <div>
                <Button
                    type="Secondary"
                    className="p-6 flex gap-4 bg-secondary-l text-2xl"
                    onClick={() => {
                        setOpenSelectMonths(!openSelectMonths);
                        onClick();
                    }}
                >
                    <Plus />
                    <span>اضافة شهر</span>
                </Button>
                {openSelectMonths && (
                    <div
                        className={
                            "absolute w-fit bg-white p-5 rounded top-full right-0 flex flex-col gap-6 text-xl z-20"
                        }
                    >
                        <input
                            type={"text"}
                            placeholder={"ابحث عن شهر"}
                            className={"rounded border p-2 text-black"}
                            value={monthSearch}
                            onChange={(e) => {
                                setMonthSearch(e.target.value);
                                searchMonths(e.target.value);
                            }}
                        />
                        <ul className={"text-right max-h-[218px] overflow-auto"}>
                            {months.map((month, index) => (
                                <li
                                    key={index}
                                    className={
                                        "flex gap-4  border-b  rounded p-2 text-black hover:bg-[#B4D3E0] duration-500"
                                    }
                                >
                                    <input
                                        type={"checkbox"}
                                        name={"months"}
                                        value={month}
                                        id={month}
                                        className={"w-[22px]"}
                                    />
                                    <label htmlFor={month}>{month}</label>
                                </li>
                            ))}
                        </ul>
                        <div className={"flex gap-4"}>
                            <Button
                                type={"normal"}
                                className={"!text-black !border-[#D9D9D9]"}
                                onClick={() => setOpenSelectMonths(!openSelectMonths)}
                            >
                                الغاء
                            </Button>
                            <Button type={"Secondary"} className={"bg-secondary-l"}>
                                إضافة
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddMonthsButton;