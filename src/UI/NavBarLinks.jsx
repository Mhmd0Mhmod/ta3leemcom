import { Link } from "react-router-dom";
import { useState } from "react";

function NavBarLinks({className}) {
  const [openList, setOpenList] = useState(false);
  return (
    <ul className={`navbar  ${className}`}>
      <li>
        <Link to="/home">الرئيسية</Link>
      </li>
      <li>
        <Link to="/about">عن</Link>
      </li>
      <li>
        <Link to="/services">الخدمات</Link>
      </li>
      <li>
        <Link to="/instructions">تعليمات</Link>
      </li>
      <li>
        <Link to="/subscriptions">الاشتركات</Link>
      </li>
      <li>
        <Link to="/opinion">رأيك</Link>
      </li>
      <li>
        <Link to="/contact-with-us">تواصل معنا</Link>
      </li>
    </ul>
  );
}

export default NavBarLinks;
