import { useLocation , Link } from 'react-router-dom';
import Logo from '/public/Icons/ta3leemComLogo.svg';
function NavLinks() {
  const location = useLocation();
  const currentPath = location.pathname;
 return (
   <ul className={'flex items-center justify-between gap-5 text-3xl'}>
     <Logo />
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/home' ? 'active' : ''}`}>
       <Link to="/home">الرئيسية</Link>
     </li>
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/about' ? 'active' : ''}`}>
       <Link to="/about">عن</Link>
     </li>
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/services' ? 'active' : ''}`}>
       <Link to="/services">الخدمات</Link>
     </li>
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/instructions' ? 'active' : ''}`}>
       <Link to="/instructions">تعليمات</Link>
     </li>
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/subscriptions' ? 'active' : ''}`}>
       <Link to="/subscriptions">الاشتركات</Link>
     </li>
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/opinion' ? 'active' : ''}`}>
       <Link to="/opinion">رأيك</Link>
     </li>
     <li
       className={`whitespace-nowrap pb-2 duration-500 hover:text-[#0884A2] ${currentPath === '/contact-with-us' ? 'active' : ''}`}>
       <Link to="/contact-with-us">تواصل معنا</Link>
     </li>
   </ul>);
}

export default NavLinks;