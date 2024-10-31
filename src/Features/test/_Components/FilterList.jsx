import { useState } from 'react';
import Arrow from '/public/Icons/breadcrumb_arrow.svg';

import { createContext, useContext } from 'react';
import Button from '@/UI-Global/Button';
import useOutSideClick from '@/hooks/useOusideClick';
const filterListContext = createContext();
function FilterList({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <filterListContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </filterListContext.Provider>
  );
}
function List({ children }) {
  const { open, setOpen } = useContext(filterListContext);
  const ref = useOutSideClick(() => setOpen(false));
  return (
    <div ref={ref} className={`absolute bottom-20 left-0 mt-4 w-fit min-w-40 rounded-[7px] border border-[#b4d3e0] bg-white p-2 text-black opacity-0 transition-all duration-300 ${open ? 'opacity-100' : 'pointer-events-none'}`}>
      {children}
    </div>
  );
}

function Item({ className, children, ...props }) {
  return (
    <div {...props} className={`flex items-center font-almaria-light text-lg !text-black ${className}`}>
      {children}
    </div>
  );
}
function Trigger({ children }) {
  const { open, setOpen } = useContext(filterListContext);
  return (
    <Button type="ghost" className={'text-md flex h-12 items-center !border-none bg-secondary-l font-almaria-light !text-gray-800'} onClick={() => setOpen((prev) => !prev)}>
      {children}
      <Arrow className={`${open ? 'rotate-90 transition-all duration-300' : '-rotate-90 transition-all duration-300'} `} />
    </Button>
  );
}
FilterList.Trigger = Trigger;
FilterList.Item = Item;
FilterList.List = List;
export default FilterList;
// class="text-primary-l disabled:cursor-not-allowed rounded-lg  px-6 py-2 text-2xl min-w-40 border border-primary-l relative flex w-fit items-center gap-2 bg-accent-l-900 py-6 font-almaria text-xl text-black hover:bg-accent-l-900 font-almaria  "
