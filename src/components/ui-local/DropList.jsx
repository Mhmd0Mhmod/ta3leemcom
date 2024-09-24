import { useState } from "react";

import PropTypes from "prop-types";
import ArrowUp from "/public/Icons/ArrowUp.svg";

DropList.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array,
    optionsWithJSX: PropTypes.array,
    setValue: PropTypes.func,
    optionsValue: PropTypes.array,
    classNameButton: PropTypes.string,
    classNameItem: PropTypes.string,
    classNameUl: PropTypes.string,
};

function DropList({
    title,
    options,
    optionsWithJSX,

    setValue,
    optionsValue,
    classNameButton,
    classNameItem,
    classNameUl,
    children,
}) {
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = (option) => {
        setValue(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block w-64 font-almaria">
            <button
                onClick={toggleDropdown}
                className={`w-full bg-[#EFEFEF] border rounded-[8px] shadow px-4 py-2 text-right ${classNameButton}`}
            >
                <span>{selected || title}</span>
                <span className={`float-left ${isOpen ? "rotate-180" : ""}`}>
                    <ArrowUp />
                </span>
            </button>
            {isOpen && optionsWithJSX && (
                <ul className={`absolute z-10 w-full bg-white rounded  mt-2 ${classNameUl}`}>
                    {optionsWithJSX?.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                handleOptionClick(optionsValue[index]);
                                setSelected(options[index]);
                            }}
                            className={`px-4 py-2 hover:bg-[#b4d3e0] cursor-pointer border-b-[0.5px] boder-[#CACACA] ${classNameItem}`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
            {isOpen && !optionsWithJSX && (
                <ul className={`absolute z-10 w-full bg-white rounded  mt-2 ${classNameUl}`}>
                    {options?.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                handleOptionClick(optionsValue[index]);
                                setSelected(option);
                            }}
                            className={`px-4 py-2 hover:bg-[#b4d3e0] cursor-pointer border-b-[0.5px] boder-[#CACACA] ${classNameItem}`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropList;
