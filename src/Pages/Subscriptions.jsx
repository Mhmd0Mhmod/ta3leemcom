import Circles from "/public/Icons/circles.svg";
import LightLamp from "/public/Icons/lightLamp.svg";
import Heading from "../UI/Heading.jsx";
import SubscriptionsGrid from "../UI/SubscriptionsGrid.jsx";

export default function Subscriptions() {
  return (
    <div className={"relative"}>
      <LightLamp alt="lamp" className={"absolute right-0 top-0 w-fit"} />
      <Circles alt="circles" className={"absolute left-0 top-0 -z-10 w-fit"} />

      <div className={"relative z-10 flex flex-col"}>
        <Heading className={"text-center"}>الاشتركات</Heading>
      </div>
      <div className={"mt-28 space-y-8 p-10 xl:my-20"}>
        <p className={"text-xl text-gray-400"}>لا تقلق حول التكلفه</p>
        <p className={"text-5xl"}>اشتركات تناسب ميزانيتك</p>
      </div>
      <SubscriptionsGrid />
    </div>
  );
}
