
function THead({children , className,onClick}) {
 return (
     <div className={"w-full" + className} onClick={onClick}>
      {children}
     </div>
 );
}

export default THead;