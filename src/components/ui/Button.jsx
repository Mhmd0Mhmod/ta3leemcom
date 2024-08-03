export default function Button({
 children,
 type = "primary",
 className,
 icon = false,
 circle = false,
}) {
 let style = `rounded-lg font-almaria-light px-6 py-2 text-2xl min-w-40 border border-primary ${className}`;
 if (type === "primary") {
  if (icon) {
   return (
    <button className={` bg-primary text-white flex px-2 gap-1 ${style}`}>
     <span>{icon}</span>
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
  return <button className={` text-primary ${style}`}>{children}</button>;
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
}
