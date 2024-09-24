export default function Button({
 children,
 type = "primary",
 className,
 icon = false,
 iconStyle,
 circle = false,
 onClick,
}) {
 let style = `rounded-lg  px-6 py-2 text-2xl min-w-40 border border-primary-l ${className} font-almaria `;

 if (type === "primary") {
  if (icon) {
   return (
    <button
     onClick={onClick}
     className={` bg-primary-l text-white flex px-2 gap-1 ${style}`}
    >
     <span className={iconStyle}>{icon}</span>
     <span>{children}</span>
    </button>
   );
  }
  return (
   <button onClick={onClick} className={` bg-primary-l  text-white ${style}`}>
    {children}
   </button>
  );
 }
 if (type === "outline") {
  if (icon) {
   return (
    <button
     onClick={onClick}
     className={`  text-accent-l-400 flex gap-2 items-center rounded-lg px-2 py- border border-accent-l-400 ${className} `}
    >
     <span>{children}</span>
     <span className={iconStyle}>{icon}</span>
    </button>
   );
  }
  return (
   <button
    className={` border border-primary-l text-primary-l hover:bg-primary hover:text-white transition-all duration-500 ${style}`}
   >
    {children}
   </button>
  );
 }
 if (type === "outlineSecondary") {
  return (
   <button
    onClick={onClick}
    className={` transition-all duration-500 rounded-lg  px-6 py-2 text-2xl min-w-40 ${className}`}
   >
    {children}
   </button>
  );
 }
 if (type === "Secondary") {
  if (icon) {
   return (
    <button
     onClick={onClick}
     className={` bg-secondary border-none text-white flex px-[12px] gap-4 items-center justify-between ${style}`}
    >
     <span className={iconStyle}>{icon}</span>
     <span className="mx-2">{children}</span>
    </button>
   );
  }
  return (
   <button
    onClick={onClick}
    className={`border-0 bg-[#0462CF] text-white ${style}`}
   >
    {children}
   </button>
  );
 }
 if (type === "ghost") {
  return (
   <button onClick={onClick} className={` text-primary-l ${style} `}>
    {children}
   </button>
  );
 }
 if (type === "normal") {
  return (
   <button
    onClick={onClick}
    className={` text-secondary-l border-secondary-l  ${
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
    onClick={onClick}
    className={` bg-[#F4F4F4] flex rounded-[7px] border-[1px] border-[#CCCCCC] items-center justify-center gap-12 py-[14px] px-[10px] shadow-xl w-[239px] h-[83px] font-cairo text-[15px]  `}
   >
    <span>{children}</span>
    <img src={icon} alt="" />
   </button>
  );
 }
 if (type === "icon") {
  return (
   <button
    onClick={onClick}
    className={`border border-accent-l-50 rounded-md p-1 ${className} hover:bg-accent-1200 transition-all duration-300 `}
   >
    <span>{children}</span>
   </button>
  );
 }
}
