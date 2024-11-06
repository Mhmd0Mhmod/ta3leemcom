import { useEffect, useRef } from "react";

function UseOutsideRef(handler, listenCapturing = false) {
  const ref = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler?.();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);
  return ref;
}

export default UseOutsideRef;
