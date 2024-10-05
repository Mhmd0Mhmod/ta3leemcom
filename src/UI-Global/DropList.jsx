import { useState } from 'react';

import PropTypes from 'prop-types';
import Drop from '/public/Icons/ArrowUp.svg';

DropList.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

function DropList({ title, options, value, setValue, optionsValue, children }) {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = (e) => {
    e?.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    setValue(option);
    setIsOpen(false);
  };
  if (!optionsValue) optionsValue = options;
  return (
    <div className="relative flex h-[2.875rem] w-fit gap-4 rounded-[8px] border border-[#C2C2C2] bg-[#EFEFEF] px-4 py-2 text-right font-almaria shadow">
      {children}
      <div className={'w-56 flex-1'}>
        <button onClick={toggleDropdown} className="w-full">
          {options[optionsValue.findIndex((optionValue) => optionValue == value)] || title}
          <span className={`float-left ${isOpen ? 'rotate-180' : ''} mt-2`}>
            <Drop />
          </span>
        </button>
        {isOpen && (
          <ul className="absolute right-0 z-50 mt-2 max-h-36 w-full overflow-x-auto rounded bg-white">
            {options?.map((option, index) => (
              <li
                key={`${option} ${index}`}
                onClick={() => {
                  handleOptionClick(optionsValue[index]);
                  setSelected(option);
                }}
                className="boder-[#CACACA] cursor-pointer border-b-[0.5px] px-4 py-2 hover:bg-[#b4d3e0]"
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
