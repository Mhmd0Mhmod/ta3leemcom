import { useState } from "react";

import PropTypes from "prop-types";
import Drop from "/public/Icons/ArrowUp.svg";

DropList.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

function DropList({title, options, value, setValue, optionsValue, children}) {
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = (option) => {
        setValue(option);
        setIsOpen(false);
    };
    if (!optionsValue) optionsValue = options;
    return (
        <div
            className="relative  w-fit font-almaria flex  gap-4 bg-[#EFEFEF] border border-[#C2C2C2] rounded-[8px] shadow px-4 py-2 text-right h-[2.875rem]  ">
            {children}
            <div className={"flex-1 w-56"}>
                <button
                    onClick={toggleDropdown}
                    className="w-full"
                >
                    {selected || title}
                    <span className={`float-left ${isOpen ? "rotate-180" : ""} mt-2`}><Drop/>
                </span>
                </button>
                {isOpen && (
                    <ul className="absolute right-0  w-full bg-white rounded  mt-2 max-h-36 overflow-x-auto z-50">
                        {options?.map((option, index) => (
                            <li
                                key={option}
                                onClick={() => {
                                    handleOptionClick(optionsValue[index]);
                                    setSelected(option);
                                }}
                                className="px-4 py-2 hover:bg-[#b4d3e0] cursor-pointer border-b-[0.5px] boder-[#CACACA]"
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DropList;
