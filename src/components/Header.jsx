// src/components/Header.jsx
import { useLocation, Link } from "react-router-dom";
import logo from '../../public/Icons/ta3leemComLogo.svg';
import Button from "./ui/Button.jsx";
import Icon from "./ui/Icon.jsx";

export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className={"relative flex justify-between font-almaria ml-10 my-3"}>
            <div className={"flex"}>
                <img src={logo} alt={"Icon"} />
                <ul className={"w-[922px] flex items-center justify-between gap-[12px] text-[32px]"}>
                    <li className={`hover:text-[#0884A2] duration-500 ${currentPath === "/home" ? "active" : ""}`}><Link to="/home">الرئيسية</Link></li>
                    <li className={`hover:text-[#0884A2] duration-500 ${ currentPath === "/about" ? "active" : ""}`}><Link to="/about">عن</Link></li>
                    <li className={`hover:text-[#0884A2] duration-500 ${currentPath === "/services" ? "active" : ""}`}><Link to="/services">الخدمات</Link></li>
                    <li className={`hover:text-[#0884A2] duration-500 ${currentPath === "/instructions" ? "active" : ""}`}><Link to="/instructions">تعليمات</Link></li>
                    <li className={`hover:text-[#0884A2] duration-500 ${currentPath === "/subscriptions" ? "active" : ""}`}><Link to="/subscriptions">الاشتركات</Link></li>
                    <li className={`hover:text-[#0884A2] duration-500 ${currentPath === "/opinion" ? "active" : ""}`}><Link to="/opinion">رأيك</Link></li>
                    <li className={`hover:text-[#0884A2] duration-500 ${currentPath === "/contact-with-us" ? "active" : ""}`}><Link to="/contact-with-us">تواصل معنا</Link></li>
                </ul>
            </div>
            <div className={"flex items-center gap-[10px]"}>
                <Button type={"ghost"} className={"border-0 "}>تسجيل الدخول</Button>
                <Button type={"primary"} className={"flex items-center gap-2"}>
                    انضم إلينا
                    <Icon src={'../../public/Icons/leftArrow.svg'} className={"w-7"} />
                </Button>
            </div>
        </nav>
    );
}