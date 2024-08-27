function Table({children = null, className = "", onClick = null}) {
    return (
        <div className={"w-full relative" + className} onClick={onClick}>
            {children}
        </div>
    );
}

export default Table;