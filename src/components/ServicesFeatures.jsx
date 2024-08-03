import rect from "../../public/img_services/Rectangle 91.svg";
export default function ServicesFeatures({ name, arr, isAvailable = false }) {
    return (
        <>
        <div className="mt-5 flex gap-x-4 ms-16 ">
            <div className="border-l-2 p-4 w-60 relative">
                <img src={rect} alt="" />
                <h2 className="font-almaria-bold text-xl ms-6 w-[150px]">{name}</h2>
                <span className="absolute top-12 -left-8 text-5xl -rotate-45">
                    {isAvailable ? <p>قريبا</p> : null}
                </span>
            </div>
            <div>
            <ul className="w-64 flex h-[150px] items-center">
                <div>
                {arr.map((el) => (
                    <li className="mt-4">{el}</li>
                ))}
                </div>
            </ul>
            </div>
        </div>
        </>
    );
}
