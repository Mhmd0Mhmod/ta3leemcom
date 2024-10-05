function PopUp({className, children}) {
    const style = `w-fit border border-[#76D8A3] bg-[#F2FFF7] shadow-[0px_13px_19px_0px_#00000012] p-4 ${className}`;
    return (<div className={style}>

        {children}
    </div>);
}

export default PopUp;