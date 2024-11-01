function TBody({children = null, className = "", onClick = null}) {
    return (<div className={`w-full ${className}`} onClick={onClick}>
            {children}
        </div>);
}

export default TBody;