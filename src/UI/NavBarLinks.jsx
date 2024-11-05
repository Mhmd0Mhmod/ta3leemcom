import { Link, useLocation } from "react-router-dom";

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

function NavBarLinks({ className }) {
  const active = useLocation().pathname;
  return (
    <ul className={`navbar ${className}`}>
      {links.map((link, index) => (
        <li
          key={index}
          className={`navbar-link ${active === link.to ? "active" : ""}`}
        >
          <Link to={link.to}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default NavBarLinks;
