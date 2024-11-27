import { useEffect } from "react";
import TestTitle from "../UI/TestTitle";
import { createPortal } from "react-dom";
import TestTimer from "../UI/TestTimer";
import TestAnwers from "../UI/TestAnwers";
function Test() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return createPortal(
    <>
      <div className="test min-w-screen fixed -inset-0 z-[999999999] min-h-screen overflow-scroll bg-[#d3e1e5]">
        <div className="m-auto mt-7 w-11/12 space-y-4 md:w-3/4">
          <TestTitle title={"test"} />
          <TestTimer
            timeDuration={{
              hours: 1,
              minutes: 30,
              days: 0,
            }}
          />
          <TestAnwers />
        </div>
      </div>
    </>,
    document.body,
  );
}
export default Test;
