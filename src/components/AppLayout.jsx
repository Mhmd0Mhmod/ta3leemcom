import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainRegister from "./MainRegister";
import Profile from "./Profile";
import StartProfile from "./StartProfile";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col container mx-auto ">
      <Profile>
        <StartProfile/>
      </Profile>
      <MainRegister />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
