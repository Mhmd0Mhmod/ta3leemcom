function THead({children = null, className = "", onClick = null}) {
    return (<div className={`table__thead w-full ${className}`} onClick={onClick}>
            {children}
        </div>);
}

export default THead;