function TH({children = null, className = "", onClick = null}) {
    return (<div className={`table__th w-full font-almaria-bold  flex items-center py-2 justify-center gap-2 ${className}`} onClick={onClick}>
        {children}
    </div>);
}

export default TH;