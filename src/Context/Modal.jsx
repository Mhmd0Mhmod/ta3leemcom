import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Exit from "/public/Icons/exit.svg";

const ModelContext = createContext();

function Modal({ children }) {
  const [name, setName] = useState(null);
  return (
    <ModelContext.Provider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

function Trigger({ id, children }) {
  const { name, setName } = useContext(ModelContext);

  function handleClick() {
    console.log(name, id);
    if (name === null || id !== name) {
      setName(id);
    }
  }

  return cloneElement(children, {
    onClick: handleClick,
  });
}

function Content({ id, children }) {
  const { name, setName } = useContext(ModelContext);
  if (id !== name) return null;

  function handleExit() {
    setName(null);
  }

  return createPortal(
    <div className="fixed inset-0 z-[11] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative h-1/2 w-full max-w-screen-sm overflow-hidden rounded-lg bg-white shadow-lg sm:h-3/5 md:max-w-screen-md lg:h-5/6 lg:max-w-screen-lg">
        {children}
        <Exit className={"absolute inset-5 cursor-pointer"} onClick={handleExit} />
      </div>
    </div>,
    document.body,
  );
}

export function useCloseModal() {
  const { setName } = useContext(ModelContext);
  return function close() {
    setName(null);
  };
}

Modal.Trigger = Trigger;
Modal.Content = Content;
export default Modal;
