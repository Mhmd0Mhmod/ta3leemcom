import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
 return (
  <div className="min-h-screen flex flex-col container mx-auto ">
   <Header />
     <main className="flex-1">
    <Outlet />
   </main>
   <Footer />
  </div>
 );
}