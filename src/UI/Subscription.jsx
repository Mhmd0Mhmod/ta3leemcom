import Supported from "/public/Icons/true.svg";
import NotSupported from "/public/Icons/false.svg";
import Button from "./Button.jsx";

function Subscription({ title, price, support, notSupport }) {
  return (
    <div className={"flex flex-col items-center gap-5 rounded-lg border-2 p-3"}>
      <div
        className={
          "flex w-full justify-between rounded-lg bg-gray-300 p-5 font-Almarai-bold"
        }
      >
        <h1 className={"text-2xl"}>{title}</h1>
        <p className={"w-24 text-2xl"}>
          <span className={"text-[#0884A2]"}> {price} جنيه </span> / شهريا
        </p>
      </div>
      <div className={"relative w-full"}>
        <hr />
        <div
          className={
            "absolute -top-3.5 left-[40%] bg-white pl-2 pr-2 text-gray-400"
          }
        >
          <span>تشمل كلاً من</span>
        </div>
      </div>
      <ul className={"flex w-full flex-col gap-5 p-5"}>
        {support?.map((el, idx) => {
          return (
            <li className={"flex gap-5"} key={idx}>
              <span className={"text-blue-400"}>
                <Supported alt={"Supported"} />
              </span>
              <p>{el}</p>
            </li>
          );
        })}
        {notSupport?.map((el, idx) => {
          return (
            <li className={"flex gap-5"} key={idx}>
              <span className={"text-blue-400"}>
                <NotSupported alt={"NotSupported"} />
              </span>
              <p>{el}</p>
            </li>
          );
        })}
      </ul>
      <div>
        <Button type={"outlinePrimary"} className={"px-10 text-2xl"}>
          اختيار
        </Button>
      </div>
    </div>
  );
}

export default Subscription;
