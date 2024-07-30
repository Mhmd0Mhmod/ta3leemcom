export default function Button({
 children,
 type = "primary",
 className,
 icon = false,
}) {
 let style =
  "rounded-lg font-almaria-light px-6 py-2 text-2xl min-w-40" + className;
 if (type === "primary") {
  if (icon) {
   return (
    <button className={`${style} bg-primary text-white flex px-2 gap-1`}>
     <span>{icon}</span>
     <span>{children}</span>
    </button>
   );
  }
  return (
   <button className={`${style} bg-primary text-white`}>{children}</button>
  );
 }
 if (type === "outline") {
  return (
   <button className={`${style} border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500`}>
    {children}
   </button>
  );
 }
 if (type === "ghost") {
  return <button className={`${style} text-primary`}>{children}</button>;
 }
}
