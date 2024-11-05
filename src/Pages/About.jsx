import AboutFeatures from "../UI/AboutFeatures.jsx";
import Rect from "/public/Icons/Rectangle.svg";
import lamp from "/public/Icons/lamp.svg";
import rocket from "/public/Icons/rocket.svg";
import park from "/public/Icons/icon-park.svg";
import GRect from "/public/Icons/Rectangle 110.svg";
import Ellipse from "/public/Icons/Ellipse 89.svg";
import Heading from "../UI/Heading.jsx";

export default function About() {
  return (
    <div className="mt-10 flex flex-col gap-20 font-cairo">
      <div className="relative flex w-fit flex-col rounded-2xl bg-[#F5F7F9] text-xl md:max-h-96 xl:flex-row 2xl:max-h-28">
        <div
          className={
            "flex min-h-[9.7rem] min-w-40 items-center justify-center self-center rounded-full border-8 border-white bg-secondary shadow-xl"
          }
        >
          <Heading as={"h2"} className="font-Almarai-bold text-white">
            من نحن
          </Heading>
        </div>

        <p className={"p-4 pr-4 leading-10"}>
          تعليم كوم هي منصة تعليمية إلكترونية مبتكرة ومتكاملة تهدف إلى تحسين
          تجربة التعلم والتعليم لكل من الطلاب والمدرسين وأولياء الأمور.
          <br />
          نسعى لتقديم بيئة تعليمية تفاعلية ومتقدمة، حيث يمكن للجميع الوصول إلى
          الأدوات والموارد التي يحتاجونها لتحقيق أفضل النتائج للدروس الخصوصية.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <AboutFeatures
          Rect={Rect}
          Icon={lamp}
          header={"الرؤية"}
          paragraph={
            "نطمح في تعليم كوم إلى أن نصبح المنصة التعليمية الرائدة ،  من خلال دمج التكنولوجيا الحديثة وتقديم حلول تعليمية مبتكرة. نسعى لأن نكون الخيار الأول للمعلمين والطلاب وأولياء الأمور في الدروس الخصوصية من خلال توفير أدوات تعليمية متطورة، وتجربة تعليمية متميزة، ودعم مستمر لتحسين الدروس الخصوصية وبناء مستقبل أفضل للأجيال القادمة."
          }
        />
        <AboutFeatures
          Rect={Rect}
          Icon={rocket}
          header={"المهمة"}
          paragraph={
            "نسعى إلى توفير تجربة تعليمية شاملة ومتكاملة لجميع الاطراف في الدروس الخصوصية، سواء كانوا طلابًا، معلمين، أو أولياء أمور. نهدف إلى تحسين الجودة وتعزيز التواصل بين جميع الأطراف من خلال منصتنا التعليمية المتكاملة التي توفر أدوات وموارد تكنولوجية حديثة تساهم في تسهيل العملية للدروس الخصوصية  وجعلها أكثر فعالية ومتعة."
          }
        />
        <AboutFeatures
          Rect={Rect}
          Icon={park}
          header={"القيم"}
          list={{
            الابتكار:
              " نسعى دائمًا لتقديم حلول تعليمية مبتكرة تواكب التطورات التكنولوجية.",
            الجودة:
              "نلتزم بتقديم خدمات تعليمية عالية الجودة وأدوات تعليمية متطورة، مع التركيز على تحقيق أفضل نتائج ممكنة للطلاب.",
            الشفافية:
              " نؤمن بأهمية الشفافية في جميع تعاملاتنا، ونحرص على بناء علاقات قائمة على الثقة والمصداقية مع المعلمين والطلاب وأولياء الأمور.",
          }}
        />
      </div>
    </div>
  );
}
