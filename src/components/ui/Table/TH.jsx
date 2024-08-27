function TH({children = null, className = "", onClick = null}) {
    return (
        <div className={"w-full font-almaria-bold text-center" + className} onClick={onClick}>
            {children}
        </div>
    );
}

export default TH;