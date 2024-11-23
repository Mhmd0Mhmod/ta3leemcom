import { Ban, CircleCheckBig, TriangleAlert, X } from "lucide-react";
import { createContext, useContext } from "react";

let style = "flex items-center animate-slide-in gap-2 p-4 shadow-[0px_13px_19px_0px_#00000012] rounded-sm absolute bottom-20  -translate-x-1/2  z-20 flex  duration-500";
const AlertContext = createContext(null);

function Alert({ type, children }) {
  if (!type) return null;
  return <AlertContext.Provider value={{ type }}>{children}</AlertContext.Provider>;
}

function Success({ children }) {
  const { type } = useContext(AlertContext);

  if (type !== "success") return null;

  return (
    <div className={`border-[#76D8A3] bg-[#F2FFF7] text-[#2DC071] ${style}`}>
      <CircleCheckBig />
      {children}
    </div>
  );
}

function Error({ children }) {
  const { type } = useContext(AlertContext);
  if (type !== "error") return null;
  return (
    <div className={`border-[#DF1E1E] bg-[#FFDEDE] text-[#E0232E] ${style}`}>
      <Ban />
      {children}
    </div>
  );
}

function Warning({ children }) {
  const { type } = useContext(AlertContext);
  if (type !== "warning") return null;
  return <div className={`border-[#E77C40] bg-[#FFF6EF] text-[#E77C40] ${style}`}>{children}</div>;
}

Alert.Success = Success;
Alert.Error = Error;
Alert.Warning = Warning;

export default Alert;
