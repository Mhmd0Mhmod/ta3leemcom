function ToggleIcon({ IconTrue, IconFalse }) {
  return function Icon({ isToggled, onClick }) {
    function handleClick() {
      onClick?.();
    }
    return isToggled ? <IconTrue className={"cursor-pointer"} onClick={handleClick} /> : <IconFalse className={"cursor-pointer"} onClick={handleClick} />;
  };
}

export default ToggleIcon;
