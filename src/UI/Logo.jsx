import LogoIcon from "/public/Icons/logo_solid.svg";

function Logo() {
  return (
    <div className="flex items-center gap-1 font-Almarai-bold">
      <p className="text-xl text-Secondary-500">تعليم</p>
      <span className="mt-2 text-lg text-primary">كوم</span>
      <LogoIcon />
    </div>
  );
}

export default Logo;
