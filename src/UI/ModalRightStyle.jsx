import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import Circles from "/public/Icons/circles1.svg";

function ModalRightStyle() {
  return (
    <div
      className={"relative flex h-full w-1/2 items-center justify-center"}
      style={{
        background: "linear-gradient(180deg, #0884A2 0%, #02298A 84.79%, #021B79 100%)",
      }}
    >
      <div className={"z-10 flex flex-col justify-center gap-8 p-8 text-white"}>
        <Heading as={"h1"}>تعليم كوم</Heading>
        <p>تجربة تعليمية ممتعة وسلسة لكافة مستخدمينا</p>
        <Button type={"normal"} className={"w-fit rounded-3xl border-0 bg-blue-600 text-sm text-white"}>
          اعرف المزيد
        </Button>
      </div>

      <div className={"absolute bottom-0 left-0"}>
        <Circles alt={"circles"} className={"w-full"} />
      </div>
    </div>
  );
}

export default ModalRightStyle;
