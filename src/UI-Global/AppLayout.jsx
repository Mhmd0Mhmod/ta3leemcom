import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer';
import MainRegister from '@/UI-Global/MainRegister/MainRegister.jsx';
import Profile from '@/UI-Global/Profile/Profile.jsx';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
    return (

            <div className="container mx-auto flex min-h-screen flex-col">
                <div className="ltr">
                    <Toaster position="top-center" />
                </div>
                <Profile />
                <MainRegister />
                <Header />
                <main className="min-h-[80lvh] flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>

    );
}