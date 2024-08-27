
function Tr({children , onClick , className}) {
 return (
     <div className={"w-full" + className} onClick={onClick}>
         {children}
     </div>
 );
}

export default Tr;