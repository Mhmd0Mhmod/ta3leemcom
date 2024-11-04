import Logo from "/public/Icons/logo.svg";
import Decore from "/public/Icons/decore.svg";
import FeaturesCarousel from "./FeaturesCarousel.jsx";

function Ta3lemComDescription() {
  return (
    <div className={"container relative flex flex-col gap-4 p-8 xl:flex-row"}>
      <div>
        <div className={"w-full"}>
          <Logo className={"w-full"} />
          <Decore className={"w-full"} />
        </div>
        <p className={"font-Almarai-bold text-xl leading-[3]"}>
          منصة مصممة لتلبية احتياجات المدرسين، الطلاب، وأولياء الأمور. تهدف إلى
          توفير بيئة تعليمية شاملة ومتكاملة تسهل العملية التعليمية والتواصل بين
          جميع الأطراف المعنية.
        </p>
      </div>

      <FeaturesCarousel />

      <img
        src="/public/Imgs/shape.png"
        alt="shape"
        className="absolute -left-52 -top-24 -z-10"
      />
    </div>
  );
}

export default Ta3lemComDescription;
