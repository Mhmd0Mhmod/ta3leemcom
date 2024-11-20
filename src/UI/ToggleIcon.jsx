import { useState } from "react";

function ToggleIcon({ IconTrue, IconFalse }) {
  return function Icon({ isToggled, onClick }) {
    const [toggle, setToggle] = useState(isToggled);
    function handleClick() {
      setToggle(!toggle);
      onClick?.();
    }
    return toggle ? <IconTrue className={"cursor-pointer"} onClick={handleClick} /> : <IconFalse className={"cursor-pointer"} onClick={handleClick} />;
  };
}

export default ToggleIcon;
