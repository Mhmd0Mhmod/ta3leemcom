export default function Button({ children, type = "primary", className, icon = false, iconStyle, circle = false, onClick }) {
  let style = `rounded-lg  px-6 py-2 text-2xl min-w-40 border border-primary ${className} font-almaria `;

  if (type === "primary") {
    if (icon) {
      return (
        <button onClick={onClick} className={` bg-primary text-white flex px-2 gap-1 ${style}`}>
          <span className={iconStyle}>{icon}</span>
          <span>{children}</span>
        </button>
      );
    }
    return (
      <button onClick={onClick} className={` bg-primary text-white ${style}`}>
        {children}
      </button>
    );
  }
  if (type === "outline") {
    if (icon) {
      return (
        <button onClick={onClick} className={`  text-accent-400 flex gap-2 items-center rounded-lg px-2 py- border border-accent-400 ${className} `}>
          <span>{children}</span>
          <span className={iconStyle}>{icon}</span>
        </button>
      );
    }
    return <button className={` border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 ${style}`}>{children}</button>;
  }
<<<<<<< HEAD
  return (
   <button
    onClick={onClick}
    className={` border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 ${style}`}
   >
    {children}
   </button>
  );
 }
 if (type === "outlineSecondary") {
  if (icon) {
   return (
    <button
     onClick={onClick}
     className={`  border-none text-secondary font-almaria-bold text-[16px]   flex items-center justify-between ${style} `}
    >
     <span className={iconStyle}>{icon}</span>
     <span className="">{children}</span>
    </button>
   );
  } else {
   return (
    <button
     onClick={onClick}
     className={` transition-all duration-500 rounded-lg  px-6 py-2 text-2xl min-w-40 ${className}`}
    >
     {children}
    </button>
   );
  }
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
=======
  if (type === "outlineSecondary") {
    return (
      <button onClick={onClick} className={` transition-all duration-500 rounded-lg  px-6 py-2 text-2xl min-w-40 ${className}`}>
        {children}
      </button>
    );
  }
  if (type === "Secondary") {
    if (icon) {
      return (
        <button onClick={onClick} className={` bg-secondary border-none text-white flex px-[12px] gap-4 items-center justify-between ${style}`}>
          <span className={iconStyle}>{icon}</span>
          <span className="mx-2">{children}</span>
        </button>
      );
    }
    return (
      <button onClick={onClick} className={`border-0 bg-[#0462CF] text-white ${style}`}>
        {children}
      </button>
    );
  }
  if (type === "ghost") {
    return (
      <button onClick={onClick} className={` text-primary ${style} `}>
        {children}
      </button>
    );
  }
  if (type === "normal") {
    return (
      <button onClick={onClick} className={` text-secondary border-secondary  ${circle ? "rounded-[50px]" : "rounded-xl"} ${style} font-almaria `}>
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
>>>>>>> main
  }
}
