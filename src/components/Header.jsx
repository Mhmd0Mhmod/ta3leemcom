import logo from '../../public/Icons/ta3leemComLogo.svg'
import {Link} from "react-router-dom";
import Button from "./ui/Button.jsx";
import Icon from "./ui/Icon.jsx";

export default function Header() {
    return (<div className={"flex justify-between font-almaria"}>
        <div className={"flex"}>
            <img src={logo} alt={"Icon"}/>
            <ul className={"w-[922px] flex items-center justify-between gap-[12px] text-[32px]"}>
                <li><Link to={"home"}>الرئيسية</Link></li>
                <li><Link to={"about"}>عن</Link></li>
                <li><Link to={"services"}>الخدمات</Link></li>
                <li><Link to={"instructions"}>تعليمات</Link></li>
                <li><Link to={"subscriptions"}>الاشتركات</Link></li>
                <li><Link to={"opinion"}>رأيك</Link></li>
                <li><Link to={"contact-with-us"}>تواصل معنا</Link></li>
            </ul>
        </div>
        <div className={"flex items-center gap-[10px]"}>
            <Button type={"ghost"}>تسجيل الدخول</Button>
            <Button type={"primary"} className={"flex items-center gap-2"}>
                انضم إلينا
                <Icon src={'../../public/Icons/leftArrow.svg'} className={"w-7"}/>
            </Button>
        </div>
    </div>)
}
