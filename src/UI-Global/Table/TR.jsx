function TR({children = null, className = "", onClick = null}) {
    return (<div className={`table__tr w-full flex items-center ${className}`} onClick={onClick}>
            {children}
        </div>);
}

export default TR;