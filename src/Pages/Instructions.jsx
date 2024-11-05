import Heading from "../UI/Heading.jsx";
import Button from "../UI/Button.jsx";
import Lamp from "/public/Icons/lightLamp.svg";
import RedUser from "/public/Icons/RedUser.svg";
import RedArrow from "/public/Icons/RedArrow.svg";
import Video from "/public/Icons/video.svg";
import Circle from "/public/Icons/ellipse.svg";
import Play from "/public/Icons/play.svg";
import Tringle from "/public/Icons/RedTringle.svg";
import InstructionItem from "../UI/InstructionItem.jsx";

function Instructions() {
  return (
    <>
      <div className="relative space-y-5">
        <div className="absolute left-0 top-16 -rotate-12">
          <Lamp alt="lamp" className="w-24" />
        </div>
        <Heading as={"h1"} className="text-center">
          تعليمات
        </Heading>
        <div className="flex justify-center gap-8">
          <Button>المدرسين</Button>
          <Button type={"outlinePrimary"}>الطلاب</Button>
          <Button type={"outlinePrimary"}>اولياء الامور</Button>
        </div>
      </div>
      <div className="my-14 flex flex-col items-center gap-20 xl:flex-row">
        <div className="relative col-span-3 flex flex-col gap-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <InstructionItem
              title={"تسجيل الدخول"}
              desc={
                "قم بزيارة الصفحة الرئيسية للمنصة واضغط على رابط تسجيل الدخول."
              }
              icon={<RedUser />}
              key={index}
            />
          ))}
          <RedArrow className={"mr-[35rem] hidden self-end xl:block"} />
        </div>
        <div>
          <div className="relative col-span-5">
            <Video
              alt="vidoe"
              className="aspect-video w-full rounded-xl brightness-75"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <Circle alt="" className="absolute" />
              <Play alt="play" />
            </span>
            <div className={"absolute -bottom-12 -right-8 w-80"}>
              <Tringle className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Instructions;
