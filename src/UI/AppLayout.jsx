import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

function AppLayout() {
  return (
    <div className={"flex flex-col container"}>
      <Header />
      <main className={"flex-grow max-w-full overflow-hidden"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
