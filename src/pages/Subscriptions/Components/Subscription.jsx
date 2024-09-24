import Button from "../../../UI-Global/Button.jsx";
import  Supoorted from"../../../../public/Icons/true.svg"
import  NotSupported from"../../../../public/Icons/false.svg"
import PropTypes from 'prop-types';

Subscription.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    support: PropTypes.array,
    notSupport: PropTypes.array
}


function Subscription({title, price, support, notSupport}) {
    return (
        <div className={"border-2 rounded-lg p-3 flex flex-col items-center gap-5 "}>
            <div className={"flex justify-between p-5 font-almaria-bold bg-gray-300 rounded-lg w-full"}>
                <h1 className={"text-2xl"}>{title}</h1>
                <p className={"text-2xl w-24"}><span className={"text-[#0884A2] "}> {price} جنيه </span> / شهريا</p>
            </div>
            <div className={"w-full relative"}>
                <hr/>
                <div className={"bg-white  absolute -top-3.5 left-[40%] text-gray-400 pr-2 pl-2"}>
                    <span>تشمل كلاً من</span>
                </div>
            </div>
            <ul className={"flex flex-col p-5 gap-5 w-full"}>
                {support?.map((el,idx) => {
                    return <li className={"flex gap-5"} key={idx}>
                        <span className={"text-blue-400"}><Supoorted alt={'Supported'}/></span>
                        <p>{el}</p>
                    </li>
                })}
                {notSupport?.map((el,idx) => {
                    return <li className={"flex gap-5"} key={idx}>
                        <span className={"text-blue-400"}><NotSupported alt={"NotSupported"}/></span>
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