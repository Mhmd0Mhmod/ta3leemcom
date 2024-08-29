function Icon({src, className, onClick}) {
    return <img src={src} alt={"icon"} className={`w-7 ${className}`} onClick={onClick}/>
}

export default Icon;