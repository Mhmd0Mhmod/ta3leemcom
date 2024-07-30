import AboutFetures from "../components/AboutFetures";
import rect from "../assets/about_imgs/Rectangle.svg";
import lamp from "../assets/about_imgs/lamp.svg";
import rocket from "../assets/about_imgs/rocket.svg";
import park from "../assets/about_imgs/icon-park.svg";
import gRect from "../assets/about_imgs/Rectangle 110.svg";

export default function About() {
  const divStyle = {
    direction: "rtl",

  };
  return (
    <div style={divStyle} className="bg-white mx-4">
      <div className="flex">
        <h2
          className="w-40 h-36 flex items-center justify-center text-2xl font-bold text-white rounded-full"
          style={{ backgroundColor: `#0884A2` }}
        >
          من نحن
        </h2>
        <div
          className="flex items-center p-8 w-full text-xl"
          style={{ backgroundColor: `#F5F7F9` }}
        >
          <div>
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
