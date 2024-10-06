import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Header from './Header/Header.jsx';
import Footer from './Footer';
import MainRegister from '@/UI-Global/MainRegister/MainRegister.jsx';
import Profile from '@/UI-Global/Profile/Profile.jsx';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function AppLayout() {
  const authHeader = useAuthHeader();
  const signOut = useSignOut();

  // console.log(authHeader.split(' ')[1]);
  useEffect(() => {
    const token = authHeader?.split(' ')[1];
    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      // console.log(new Date(decoded.exp * 1000).toLocaleString(), new Date(Date.now()).toLocaleString());

      if (isExpired) {
        signOut();
      }
    }
  }, [authHeader, signOut]);

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
