
function TR({children = null, className = "", onClick = null}) {
 return (
     <div className={"w-full flex " + className} onClick={onClick}>
         {children}
     </div>
 );
}

export default TR;