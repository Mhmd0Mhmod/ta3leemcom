function Th({children, onClick, className}) {
    return (
        <div className={"w-full font-almaria-bold text-center" + className} onClick={onClick}>
            {children}
        </div>
    );
}

export default Th;