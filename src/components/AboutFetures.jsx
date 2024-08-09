export default function AboutFetures({rect , icon , header , grayRect , paragraph , list}) {
    return (
        <>
            <div className="mt-8 p-4 text-[2.5rem]">
                <div className="flex gap-[1rem]">
                    <img src={rect} alt="" width={8}/>
                    <div>
                        <img src={icon} alt="" width={30} className="ms-2"/>
                        <h2 style={{color:`#F54547`}} className="text-3xl font-bold ms-8 font-cairo-bold">{header}</h2>
                    </div>
                </div>
                <div className="flex border-r-[0.063rem] mt-4 ms-1  text-[20px] ps-4 leading-[2.188rem]">
                    {/* <img src={grayRect} alt="" className="ms-0.5 mt-5" /> */}
                    {
                        paragraph?<p className= "">{paragraph}</p>:
                        <ul className=" list-[square] ps-8">
                            {
                                Object.entries(list).map(([key ,val])=> 
                                    <li style={{color:`#0884A2`}}><span className="font-almaria-bold text-xl">{key} :</span> <span style={{color:`black`}}>{val}</span></li>
                                )
                            }
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}
