import { createContext, useContext, useEffect, useState } from "react";
import useOutsideRef from "../Hooks/useOutsideRef.js";
import { useSidebarContext } from "./Sidebar.jsx";
import Heading from "./Heading.jsx";

const DetailsContext = createContext();

function Details({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = (e) => {
    e.stopPropagation();
    setOpen((pre) => !pre);
  };
  const close = () => setOpen(false);
  return <DetailsContext.Provider value={{ open, toggle, close }}>{children}</DetailsContext.Provider>;
}

function Summary({ children }) {
  const { toggle } = useContext(DetailsContext);
  return (
    <Heading as={"h4"} onClick={toggle} className={"flex cursor-pointer gap-4"}>
      {children}
    </Heading>
  );
}

function List({ className = "", children }) {
  const { open, close } = useContext(DetailsContext);
  const ref = useOutsideRef(close);
  return <div ref={ref}>{open && <ul className={`mr-6 p-4 ${className} absolute left-0 top-full z-[11] w-fit bg-white xl:right-0`}>{children}</ul>}</div>;
}

function ListItem({ children }) {
  return <li className={"whitespace-nowrap rounded-md p-2 text-gray-600 duration-300 hover:bg-gray-300"}>{children}</li>;
}

Details.Summary = Summary;
Details.List = List;
Details.ListItem = ListItem;

export default Details;
