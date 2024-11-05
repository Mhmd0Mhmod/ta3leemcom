import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

function AppLayout() {
  return (
    <div className={"container flex flex-col"}>
      <Header />
      <main className={"my-6 max-w-full flex-grow overflow-hidden"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
