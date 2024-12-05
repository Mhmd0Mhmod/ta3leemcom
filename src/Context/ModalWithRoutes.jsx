import { cloneElement, createContext, useContext, useState } from "react";
import Modal from "./Modal";

import Arrow from "/public/Icons/arrow-back.svg";
const ModalWithRoutesContext = createContext();

function ModalWithRoutes({ routes, children }) {
  const [to, setTo] = useState("");
  const [stackHistory, setStackHistory] = useState([]);

  function handleSetTo(to) {
    setStackHistory((prev) => [...prev.filter((item) => item != to), to]);
    setTo(to);
  }

  function handleBack() {
    const stack = [...stackHistory];
    stack.pop();
    setStackHistory(stack);
    setTo(stack[stack.length - 1]);
  }

  function reset() {
    setStackHistory([]);
    setTo("");
  }

  return (
    <ModalWithRoutesContext.Provider
      value={{
        to,
        setTo: handleSetTo,
        stackHistory,
        handleBack,
        reset,
        routes,
      }}
    >
      <Modal>{children}</Modal>
    </ModalWithRoutesContext.Provider>
  );
}
function BackArrow({ className }) {
  const { stackHistory, handleBack } = useContext(ModalWithRoutesContext);
  return stackHistory.length > 1 && <Arrow onClick={handleBack} className={`absolute inset-y-4 right-[45%] h-10 w-10 cursor-pointer ${className || ""}`} />;
}

function Content({ id, children }) {
  const { reset } = useContext(ModalWithRoutesContext);

  return (
    <Modal.Content id={id} onExit={reset}>
      {children}
    </Modal.Content>
  );
}

function OpenModal({ to, id, children }) {
  const { setTo } = useContext(ModalWithRoutesContext);
  return (
    <Modal.Trigger id={id} onClick={() => setTo(to)}>
      {children}
    </Modal.Trigger>
  );
}

function Trigger({ to, children }) {
  const { setTo } = useContext(ModalWithRoutesContext);
  return cloneElement(children, { onClick: () => setTo(to) });
}

function Outlet() {
  const { to, routes } = useContext(ModalWithRoutesContext);

  function getComponent(routes, to) {
    return routes.find((route) => route.to === to)?.component;
  }

  const Component = getComponent(routes, to);
  return Component ? Component : null;
}

const useNavigate = () => {
  const { setTo } = useContext(ModalWithRoutesContext);
  return setTo;
};
ModalWithRoutes.Content = Content;
ModalWithRoutes.Trigger = Trigger;
ModalWithRoutes.BackArrow = BackArrow;
ModalWithRoutes.Outlet = Outlet;
ModalWithRoutes.OpenModal = OpenModal;
ModalWithRoutes.useNavigate = useNavigate;
export default ModalWithRoutes;
