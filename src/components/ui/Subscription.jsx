import Button from "./Button.jsx";

function Subscription({title, price, support, notSupport}) {
    return (
        <div className={"border-2 rounded-lg p-3 flex flex-col items-center gap-5 "}>
            <div className={"flex justify-between p-5 font-almaria-bold bg-gray-300 rounded-lg w-full"}>
                <h1 className={"text-2xl"}>{title}</h1>
                <p className={"text-2xl w-24"}><span className={"text-blue-400 "}> {price} جنيه </span> / شهريا</p>
            </div>
            <div className={"w-full relative"}>
                <hr/>
                <div className={"bg-white  absolute -top-3.5 left-[40%] text-gray-400 pr-2 pl-2"}>
                    <span>تشمل كلاً من</span>
                </div>
            </div>
            <ul className={"flex flex-col p-5 gap-5 w-full"}>
                {support?.map((el) => {
                    return <li className={"flex gap-5"}>
                        <span className={"text-blue-400"}><img src="../../../public/Icons/true.svg"/></span>
                        <p>{el}</p>
                    </li>
                })}
                {notSupport?.map((el) => {
                    return <li className={"flex gap-5"}>
                        <span className={"text-blue-400"}><img src="../../../public/Icons/false.svg"/></span>
                        <p>{el}</p>
                    </li>
                })}
            </ul>
            <div>
                <Button type={"outline"}>اختيار</Button>
            </div>
        </div>
    );
}

export default Subscription;