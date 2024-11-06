import { Link, useLocation } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import DropDashBoardList from "/public/Icons/DropNavBar.svg";
import Menu from "./Menu.jsx";
import TeacherSidebar from "./TeacherSidebar.jsx";
import Sidebar from "./Sidebar.jsx";
import Heading from "./Heading.jsx";

const links = [
  {
    title: "الرئيسية",
    to: "/home",
  },
  {
    title: "عن",
    to: "/about",
  },
  {
    title: "الخدمات",
    to: "/services",
  },
  {
    title: "تعليمات",
    to: "/instructions",
  },
  {
    title: "الاشتركات",
    to: "/subscriptions",
  },
  {
    title: "رأيك",
    to: "/opinion",
  },
  {
    title: "تواصل معنا",
    to: "/contact",
  },
];

const teacherDashboard = [
  {
    to: "/TDashboard/student/add",
    title: "اضافة طالب",
  },
  {
    to: "/TDashboard/group/add",
    title: "اضافة مجموعه",
  },
  {
    to: "/TDashboard/level",
    title: "المراحل الدراسيه",
  },
];

function NavBarLinks({ className }) {
  const active = useLocation().pathname;
  const user = useAuthUser();
  const { role } = user || {};
  return (
    <ul className={`navbar ${className}`}>
      {links.map((link, index) => (
        <li key={index} className={`navbar-link ${active === link.to ? "active" : ""}`}>
          <Link to={link.to}>{link.title}</Link>
        </li>
      ))}
      <li>
        <Heading as={"h2"} className={"border-t-0 font-Almarai-bold text-secondary"}>
          لوحة التحكم
        </Heading>
      </li>
      {role &&
        teacherDashboard.map((link, index) => (
          <li key={index} className={`navbar-link ${active === link.to ? "active" : ""} !py-1`}>
            <Link to={link.to}>{link.title}</Link>
          </li>
        ))}
    </ul>
  );
}

export default NavBarLinks;
