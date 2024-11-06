import { cloneElement, createContext, useContext, useState } from "react";
import useOutsideRef from "../Hooks/useOutsideRef.js";
import Button from "./Button.jsx";
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

function Trigger({ name, children }) {
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
    <Button type={"normal"} className={"text-4xl text-black"} onClick={handleClick}>
      {children}
    </Button>
  );
}

function List({ name, position, children }) {
  const { listName, close } = useContext(MenuContext);
  const ref = useOutsideRef(close);
  console.log(name, listName);
  if (listName !== name) return null;
  if (position === "relative") {
    return (
      <div ref={ref} className={position}>
        {children}
      </div>
    );
  }
  return createPortal(<div ref={ref}>{children}</div>, document.body);
}

Menu.Trigger = Trigger;
Menu.List = List;
export default Menu;
