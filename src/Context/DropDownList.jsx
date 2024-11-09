import React, { useState, createContext, useContext, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

// Context for managing dropdown state
const DropdownContext = createContext();

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        close,
        toggleDropdown,
        selected,
        setSelected,
      }}
    >
      <div className="relative mx-auto w-56">{children}</div>
    </DropdownContext.Provider>
  );
};

function Toggle({ value, placeholder = "" }) {
  const { isOpen, toggleDropdown, selected } = useContext(DropdownContext);
  return (
    <button onClick={toggleDropdown} className="flex w-full items-center justify-between rounded-md border-2 border-gray-400 bg-gray-100 p-3">
      {value ? selected : placeholder}
      <FaChevronDown className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
    </button>
  );
}

function Menu({ children }) {
  const { isOpen } = useContext(DropdownContext);

  return isOpen && <div className="absolute z-10 mt-2 max-h-44 w-full overflow-auto rounded-md border bg-white shadow-md">{children}</div>;
}

function Item({ children, text, onClick }) {
  const { close, setSelected } = useContext(DropdownContext);

  function handleClick(e) {
    e.preventDefault();
    setSelected(text);
    onClick();
    close();
  }

  return (
    <button onClick={handleClick} className="w-full px-4 py-2 text-right hover:bg-blue-200">
      {children}
    </button>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
