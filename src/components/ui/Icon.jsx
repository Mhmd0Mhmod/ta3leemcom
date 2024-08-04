function Icon({src, className , onClick }) {
    return (<div className={`w-10 ${className}`} onClick={onClick}>
            <img src={src} alt={"icon"} className={"w-full"}/>
        </div>);
}

export default Icon;