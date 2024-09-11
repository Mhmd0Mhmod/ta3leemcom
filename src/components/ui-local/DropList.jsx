import {useState} from "react";
import PropTypes from "prop-types";
import Drop from '../../../public/Icons/drop2.svg'

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
                className="w-full bg-[#EFEFEF] border border-[#C2C2C2] rounded-[8px] shadow px-4 py-2 text-right h-[2.875rem]"
            >
                {selected || title}
                <span className={`float-left ${isOpen ? "rotate-180" : ""} mt-2`}><Drop/>
                </span>
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