import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Logo from '../../../public/imgs/profileLogo.svg';
import Exit from '../../../public/Icons/exitt.svg';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import TeacherProfileSide from '../Profile/Components/TeacherProfileSide';
const modalContext = createContext();
function Modal({ children }) {
  const [name, setName] = useState('');
  const open = setName;
  const close = () => setName('');
  return (
    <modalContext.Provider
      value={{
        open,
        close,
        name,
      }}
    >
      {children}
    </modalContext.Provider>
  );
}
Modal.Window = function Window({ name, children }) {
  const auth = useAuthUser();
  const { name: contextName, close } = useContext(modalContext);
  if (name !== contextName) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 m-0 h-screen w-full bg-[rgb(0,0,0,0.4)]">
      <div className="absolute right-[15.625rem] top-[6.25rem] z-[999] flex h-[49.75rem] w-[88.188rem] overflow-scroll rounded-xl border-2 bg-[white]">
        <div className="h-[100%]">
          <div className="flex h-[4.375rem] w-full items-center border-b-2 border-l-2 p-4">
            <Exit alt="exit" width={30} onClick={close} id="exit" />
          </div>
          <div className="h-[41.563rem] border-l-2">{auth.role === 'Teacher' && <TeacherProfileSide />}</div>
        </div>

        <div className="h-full w-[85%]">
          <div className="flex h-[4.375rem] w-full items-center justify-center border-b-2">
            <Logo alt="logo" width={135} />
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
Modal.Open = function Open({ name, className, children }) {
  const { open } = useContext(modalContext);

  return (
    <div onClick={() => open(name)} className={className}>
      {children}
    </div>
  );
};
export default Modal;
