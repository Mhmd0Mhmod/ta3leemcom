import { cloneElement, createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Exit from "../../public/Icons/exit.svg";

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

function Trigger({ id, children, ...props }) {
  const { name, setName } = useContext(ModelContext);
  const { onClick, ...otherProps } = props;

  function handleClick() {
    if (name === null || id !== name) {
      setName(id);
      onClick?.();
    }
  }

  return cloneElement(children, {
    onClick: handleClick,
    ...otherProps,
  });
}

function Content({ id, onExit, children, className }) {
  const { name, setName } = useContext(ModelContext);
  const handleExit = useCallback(
    function (e) {
      e.preventDefault();
      setName(null);
      onExit?.();
    },
    [setName, onExit],
  );
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleExit(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleExit]);
  if (id !== name) return null;

  return createPortal(
    <div className="fixed inset-0 z-[11] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`relative h-fit w-fit max-w-screen-sm overflow-hidden rounded-lg bg-white shadow-lg md:max-w-screen-md lg:h-5/6 lg:max-w-screen-lg ${className || ""}`}>
        <Exit className={"absolute inset-5 cursor-pointer"} onClick={handleExit} />
        {children}
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
