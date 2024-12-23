import { createContext, useContext, useState } from "react";
import useOutsideRef from "../Hooks/useOutsideRef.js";
import Button from "../UI/Button.jsx";
import { createPortal } from "react-dom";

const MenuContext = createContext();

function Menu({ children }) {
  const [listName, setListName] = useState();
  const close = () => setListName("");
  return (
    <MenuContext.Provider
      value={{
        close,
        listName,
        setListName,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Trigger({ name, children, type = "normal", className }) {
  const { listName, close, setListName } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    if (listName === name) {
      close();
    } else {
      setListName(name);
    }
  }

  return (
    <Button type={type} className={`text-4xl text-black ${className}`} onClick={handleClick}>
      {children}
    </Button>
  );
}

function List({ name, className = "", children }) {
  const { listName, close } = useContext(MenuContext);
  const ref = useOutsideRef(close);
  if (listName !== name) return null;
  const isRelative = className.includes("relative") || className.includes("absolute");
  if (isRelative) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return createPortal(<div ref={ref}>{children}</div>, document.body);
}

Menu.Trigger = Trigger;
Menu.List = List;
export function useCloseMenu() {
  const { close } = useContext(MenuContext);
  return close;
}
export default Menu;
