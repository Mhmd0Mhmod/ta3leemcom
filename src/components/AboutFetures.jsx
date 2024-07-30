export default function AboutFetures({rect , icon , header , grayRect , paragraph , list}) {
    return (
        <>
            <div className="mt-8 p-4">
                <div className="flex">
                    <img src={rect} alt="" width={8}/>
                    <div>
                        <img src={icon} alt="" width={30} className="ms-2"/>
                        <h2 style={{color:`#F54547`}} className="text-3xl font-bold ms-8">{header}</h2>
                    </div>
                </div>
                <div className="flex border-r-2 mt-4 ms-1 h-52">
                    {/* <img src={grayRect} alt="" className="ms-0.5 mt-5" /> */}
                    {
                        paragraph?<p className="p-4 ">{paragraph}</p>:
                        <ul className=" list-[square] p-4 ms-4">
                            {
                                Object.entries(list).map(([key ,val])=> 
                                    <li style={{color:`#0884A2`}}>{key} : <span style={{color:`black`}}>{val}</span></li>
                            
                                )
                            }
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}
