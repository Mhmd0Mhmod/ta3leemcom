export default function Tab({ type = "primary", text, path, className = "" }) {
 if (type === "primary")
  return (
   <div
    className={`flex items-center gap-2 bg-accent-1000 rounded-lg pl-6 pr-1 py-1 ${className}`}
   >
    <img src={path} alt="icon" />
    <span>{text}</span>
   </div>
  );
 else if (type === "ghost")
  return (
   <div className="flex items-center gap-2">
    <img src={path} alt={"icon"} />
    <span className="font-almaria-light text-accent-400 ">
     {text}
    </span>
   </div>
  );
}
