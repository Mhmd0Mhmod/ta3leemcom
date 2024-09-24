function TD({children = null, className = "", onClick = null}) {
    return (<div className={`table__td w-full ${className}`} onClick={onClick}>
            {children}
        </div>);
}

export default TD;