// src/components/ui/DropList.jsx
import { useState } from "react";

function DropList({ title, options }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block w-64 font-cairo">
            <button
                onClick={toggleDropdown}
                className="w-full bg-gray-300 border border-gray-300 rounded-xl shadow px-4 text-right py-2 "
            >
                {selectedOption || title}
                <span className={`float-left ${isOpen? "rotate-180" : ""}`}>&#9662;</span>
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1">
                    {options?.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-[#b4d3e0] cursor-pointer"
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