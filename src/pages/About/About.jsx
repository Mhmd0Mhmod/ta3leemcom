import AboutFetures from "./Components/AboutFetures.jsx";
import rect from "../../../public/Icons/Rectangle.svg";
import lamp from "../../../public/Icons/lamp.svg";
import rocket from "../../../public/Icons/rocket.svg";
import park from "../../../public/Icons/icon-park.svg";
import gRect from "../../../public/Icons/Rectangle 110.svg";

export default function About() {
  return (
    <div className="font-cairo mt-4 flex flex-col gap-20">
      <div className=" relative  w-fit text-[20px] leading-[50px] right-7 rounded-[15px] px-8 py-4  bg-[#F5F7F9]   ">
            <div className="absolute w-[180px] rounded-full  -right-9 -top-3">
                <img src="../../../public/Icons/Ellipse%2089.svg" alt="Ellipse" className={"w-full"}/>
                <h2
                    className="w-[100%] text-center z-10 text-[2rem] text-white font-cairo-bold absolute top-1/2 transform -translate-y-1/2"
                >
                    من نحن
                </h2>
            </div>
        <div className={"pr-[9rem]"}>
            <p>
              تعليم كوم هي منصة تعليمية إلكترونية مبتكرة ومتكاملة تهدف إلى تحسين
              تجربة التعلم والتعليم لكل من الطلاب والمدرسين وأولياء الأمور.
            </p>
            <p>
              نسعى لتقديم بيئة تعليمية تفاعلية ومتقدمة، حيث يمكن للجميع الوصول
              إلى الأدوات والموارد التي يحتاجونها لتحقيق أفضل النتائج للدروس
              الخصوصية.
            </p>
        </div>
      </div>






      <div className="grid grid-cols-3">
        <AboutFetures
          rect={rect}
          icon={lamp}
          header={"الرؤية"}
          grayRect={gRect}
          paragraph={
            "نطمح في تعليم كوم إلى أن نصبح المنصة التعليمية الرائدة ،  من خلال دمج التكنولوجيا الحديثة وتقديم حلول تعليمية مبتكرة. نسعى لأن نكون الخيار الأول للمعلمين والطلاب وأولياء الأمور في الدروس الخصوصية من خلال توفير أدوات تعليمية متطورة، وتجربة تعليمية متميزة، ودعم مستمر لتحسين الدروس الخصوصية وبناء مستقبل أفضل للأجيال القادمة."
          }
        />
        <AboutFetures
          rect={rect}
          icon={rocket}
          header={"المهمة"}
          grayRect={gRect}
          paragraph={
            "نسعى إلى توفير تجربة تعليمية شاملة ومتكاملة لجميع الاطراف في الدروس الخصوصية، سواء كانوا طلابًا، معلمين، أو أولياء أمور. نهدف إلى تحسين الجودة وتعزيز التواصل بين جميع الأطراف من خلال منصتنا التعليمية المتكاملة التي توفر أدوات وموارد تكنولوجية حديثة تساهم في تسهيل العملية للدروس الخصوصية  وجعلها أكثر فعالية ومتعة."
          }
        />
        <AboutFetures
          rect={rect}
          icon={park}
          header={"القيم"}
          grayRect={gRect}


          list={
              {

                "الابتكار" : " نسعى دائمًا لتقديم حلول تعليمية مبتكرة تواكب التطورات التكنولوجية." ,
                "الجودة"  : "نلتزم بتقديم خدمات تعليمية عالية الجودة وأدوات تعليمية متطورة، مع التركيز على تحقيق أفضل نتائج ممكنة للطلاب.",
                "الشفافية": " نؤمن بأهمية الشفافية في جميع تعاملاتنا، ونحرص على بناء علاقات قائمة على الثقة والمصداقية مع المعلمين والطلاب وأولياء الأمور."
              }
            }
        />
      </div>
    </div>
  );
}
