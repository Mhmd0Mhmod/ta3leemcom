import {useState} from "react";
import PropTypes from "prop-types";

DropList.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

function DropList({title, options, value, setValue, optionsValue}) {
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
                className="w-full bg-[#EFEFEF] border rounded-[8px] shadow px-4 py-2 text-right"
            >
                {selected || title}
                <span className={`float-left ${isOpen ? "rotate-180" : ""}`}>&#9662;</span>
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white rounded  mt-2">
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
    );
}

export default DropList;