export default function Button({
 children,
 type = "primary",
 className,
 icon = false,
    iconStyle,
 circle = false,
}) {
 let style = `rounded-[15px] font-almaria px-[39px]  text-2xl min-w-[209px] min-h-[86px] border border-primary ${className}`;

 if (type === "primary") {
  if (icon) {
   return (
    <button className={` bg-primary text-white flex px-2 gap-1 ${style}`}>
     <span className={iconStyle}>{icon}</span>
     <span>{children}</span>
    </button>
   );
  }
  return (
   <button className={` bg-primary text-white ${style}`}>{children}</button>
  );
 }
 if (type === "outline") {
  return (
   <button
    className={` border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 ${style}`}
   >
    {children}
   </button>
  );
 }
 if (type === "ghost") {
  return <button className={` text-primary ${style} `}>{children}</button>;
 }
 if (type === "normal") {
  return (
   <button
    className={` text-secondary border-secondary  ${
     circle ? "rounded-[50px]" : "rounded-xl"
    } ${style} font-almaria `}
   >
    {children}
   </button>
  );
 }
 if (type === "store") {
  return (
   <button
    className={` bg-[#F4F4F4] flex rounded-[7px] border-[1px] border-[#CCCCCC] items-center justify-center gap-12 py-[14px] px-[10px] shadow-xl w-[239px] h-[83px] font-cairo text-[15px]  `}
   >
    <span>{children}</span>
    <img src={icon} alt="" />
   </button>
  );
 }
}
