import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MainRegister from "@/UI-Global/MainRegister/MainRegister.jsx";
import Profile from "@/UI-Global/Profile/Profile.jsx";

export default function AppLayout() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Profile />
      <MainRegister />
      <Header />
      <main className="flex-1 min-h-[80lvh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
