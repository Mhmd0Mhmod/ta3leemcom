import { Outlet } from "react-router-dom";

import ThreeCircles from "/public/Icons/threeCirlceDashboard.svg";

function Dashboard({ children }) {
  return (
    <div className={"relative flex flex-col gap-4 px-5 xl:flex-row"}>
      {children}
      <div className={"w-px self-stretch bg-gray-300"} />
      <div className={"relative flex-grow self-stretch overflow-y-auto overflow-x-hidden rounded-xl bg-[#F5F7F9] p-8"}>
        <div className={"absolute left-0 top-0"}>
          <ThreeCircles />
        </div>
        <div className={"relative z-10 min-h-screen"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
