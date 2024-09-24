import Logo from "../../public/Icons/logo_solid.svg";
export function SolidLogo() {
 return (
  <div className="flex items-center gap-1 font-almaria-bold ">
   <p className="text-secondary-l text-xl">تعليم</p>
   <span className="text-primary-l text-lg mt-2">كوم</span>
   <Logo />
  </div>
 );
}
