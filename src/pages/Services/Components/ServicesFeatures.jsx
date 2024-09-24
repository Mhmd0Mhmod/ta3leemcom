import rect from "../../../../public/Icons/Rectangle 91.svg";


export default function ServicesFeatures({ name, arr, isAvailable = false }) {
    return (
        <>
        <div className="mt-5 flex gap-x-4 ms-16 font-cairo">
            <div className="border-l-[1px] p-4 w-[300px] h-[143px] relative">
                <img src={rect} alt="" />
                <h2 className="font-cairo-bold text-[24px] ms-6 w-[204px] ">{name}</h2>
                
                <span className="absolute top-5 -left-16 text-[64px] -rotate-45">
                    {isAvailable ? <p>قريبا</p> : null}
                </span>
            </div>
            
            <div>
                <ul className="w-64 leading-[40px] flex text-[20px] items-center font-cairo w-[364px] h-[150px]">
                    <div>
                    {arr.map((el) => (
                        <li className="">{el}</li>
                    ))}
                    </div>
                </ul>
            </div>
        </div>
        </>
    );
}
