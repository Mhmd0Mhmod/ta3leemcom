import { Link, useLocation } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import DropDashBoardList from "/public/Icons/DropNavBar.svg";
import Menu from "./Menu.jsx";
import TeacherSidebar from "./TeacherSidebar.jsx";
import Sidebar from "./Sidebar.jsx";
import Heading from "./Heading.jsx";
import { IoReorderThreeOutline } from "react-icons/io5";

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
    <>
      <ul className={`navbar ${className}`}>
        {links.map((link, index) => (
          <li key={index} className={`navbar-link ${active === link.to ? "active" : ""}`}>
            <Link to={link.to}>{link.title}</Link>
          </li>
        ))}
        {role && (
          <div className={"relative border-r-2"}>
            <Menu.Trigger name={"teacherDashboard"}>
              <DropDashBoardList />
            </Menu.Trigger>
            <Menu.List name={"teacherDashboard"} className={"relative"}>
              <div className={"absolute z-[12] shadow-md"}>
                <Sidebar>
                  <TeacherSidebar />
                </Sidebar>
              </div>
            </Menu.List>
          </div>
        )}
      </ul>
      {window.innerWidth < 1280 && (
        <div className={"order-last xl:hidden"}>
          <Menu.Trigger name={"navbarLinks"}>
            <IoReorderThreeOutline />
          </Menu.Trigger>
          <Menu.List name={"navbarLinks"}>
            <div className={"fixed right-3/4 top-0 z-10 h-screen w-full rounded-lg bg-gray-200 p-4"}>
              <Menu.Trigger name={"navbarLinks"}>
                <IoReorderThreeOutline />
              </Menu.Trigger>
              <div className={"flex flex-col gap-5"}>
                {links.map((link, index) => (
                  <Link to={link.to} key={index}>
                    {link.title}
                  </Link>
                ))}
                {role === "Teacher" && (
                  <>
                    <span className={"text-xl text-primary"}>لوحه التحكم</span>
                    {teacherDashboard.map((link, index) => (
                      <Link to={link.to} key={index}>
                        {link.title}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Menu.List>
        </div>
      )}
    </>
  );
}

export default NavBarLinks;
