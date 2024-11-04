import { cloneElement, createContext, useContext, useState } from "react";
import useOutsideRef from "../Hooks/useOutsideRef.js";
import Button from "./Button.jsx";

const MenuContext = createContext();

function Menu({ children }) {
  const [listName, setListName] = useState();
  const close = () => setListName(null);
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

function Icon({ name, children }) {
  const { listName, close, setListName} = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    name === "" || listName !== name ?   setListName(name) :close();
  }

  return (
    <Button type={"normal"} className={"text-black text-4xl"} onClick={handleClick}>
      {children}
    </Button>
  );
}

function List({ name, children }) {
  const { listName, close } = useContext(MenuContext);
  const ref = useOutsideRef(close);

  if (listName !== name) return null;
  return <div ref={ref} >{children}</div>;
}

Menu.Icon = Icon;
Menu.List = List;
export default Menu;
