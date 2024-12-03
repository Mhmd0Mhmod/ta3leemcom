import { cloneElement, createContext, useContext, useState } from "react";
import Menu from "../../public/Icons/menu.svg";

const SidebarContext = createContext();

function Sidebar({ className, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle,
        open,
        close,
      }}
    >
      <div className={`${isOpen ? "xl:w-64" : "xl:w-fit"} w-full self-start whitespace-nowrap rounded-xl bg-[#F5F7F9] p-4 font-cairo text-xl ${className}`}>
        <ul className={"flex flex-row justify-between xl:flex-col xl:gap-2"}>
          <li className={"hidden cursor-pointer self-end xl:block"} onClick={toggle}>
            <Menu className={`${isOpen ? "" : "rotate-Y-180"} transition duration-100`} />
          </li>
          {children}
        </ul>
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarItem({ Icon, children }) {
  const { isOpen } = useContext(SidebarContext);
  return (
    <li className={"flex w-full items-center gap-4 rounded py-2 duration-500 hover:bg-gray-200"}>
      {Icon && cloneElement(Icon, { className: `w-6 h-6 ${Icon.className || ""}` })}
      {isOpen && <div className={"hidden xl:block"}>{children}</div>}
      <div className={"block xl:hidden"}>{children}</div>
      {}
    </li>
  );
}

export function useSidebarContext() {
  if (!useContext(SidebarContext)) {
    throw new Error("useContextMenu must be used within Sidebar");
  }
  const { isOpen, toggle, open, close } = useContext(SidebarContext);
  return { isOpen, toggle, open, close };
}

Sidebar.Item = SidebarItem;
export default Sidebar;
