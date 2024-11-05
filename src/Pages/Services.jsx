import ServicesFeatures from "../UI/ServicesFeatures.jsx";
import Img from "/public/Icons/Group 117.svg";
import Circle from "/public/Icons/Ellipse 90.svg";
import Heading from "../UI/Heading.jsx";
export default function Services() {
  return (
    <>
      <div className="relative">
        <Heading as={"h1"} className="text-center">
          الخدمات
        </Heading>
        <div className="absolute left-0 top-0">
          <Img />
        </div>
        <div className="mx-6 border-b-2 p-4">
          <div className="relative flex">
            <Circle alt="" className="absolute -right-5 top-10" />
            <h2 className="z-10 my-8 font-cairo-bold text-[2.5rem]">معلم</h2>
          </div>

          <div className="grid grid-cols-1 gap-20 md:justify-items-center xl:grid-cols-2">
            <ServicesFeatures
              name={"إدارة شاملة للطلاب"}
              arr={[
                " تسجيل غيابات الطلاب بسهولة.",
                " إدارة ومتابعة دفع الرسوم الدراسية.",
                "إعداد اختبارات سواء كانت أونلاين أو أوفلاين.",
              ]}
            />
            <ServicesFeatures
              name={"اختبارات أوفلاين"}
              arr={[
                "رفع أوراق الامتحانات المصورة",
                "نماذج الإجابات",
                "إدخال وتسجيل درجات الطلاب",
              ]}
            />

            <ServicesFeatures
              name={"اختبارات أونلاين"}
              arr={[
                "إعداد اختبارات إلكترونية للطلاب عبر المنصة.",
                "متابعة الدرجات",
              ]}
            />
            <ServicesFeatures
              name={"متابعة أداء الطلاب"}
              arr={["متابعة الطلاب المتفوقين لكل مجموعة"]}
            />

            <ServicesFeatures
              name={"التواصل مع أولياء الأمور"}
              arr={[
                "الحصول على معلومات الاتصال الخاصة بأولياء الأمور.",
                "التواصل المباشر مع أولياء الأمور عبر المنصة",
              ]}
            />
            <ServicesFeatures
              name={"باقات اشتراكات متنوعة "}
              arr={[" اختيار الباقة المناسبة التي تلبي احتياجاتك التعليمية"]}
            />

            <ServicesFeatures
              name={"اجتماع مع الطلاب"}
              arr={[
                "إنشاء اجتماع مع طلابك من نفس المجموعة او من مجموعات مختلفة عبر المنصة.",
              ]}
            />
            <ServicesFeatures
              name={" رفع الملفات و الفيديوهات"}
              arr={["تعزيز عملية التعلم من خلال تحميل مواد تعليمية"]}
              isAvailable={true}
            />
            <ServicesFeatures
              name={"إنشاء شهادات تقدير"}
              arr={[
                "دعم جهود الطلاب إعداد شهادات تقدير بسهولة عبر المنصة لدعم وتشجيع الطلاب.",
              ]}
              isAvailable={true}
            />
          </div>
        </div>

        {/* طالب */}
        <div className="mx-6 border-b-2 p-4">
          <div className="relative flex">
            <Circle className="absolute -right-5 top-10" />
            <h2 className="z-10 my-8 font-cairo-bold text-[2.5rem]">طالب</h2>
          </div>
          <div className="grid grid-cols-1 gap-20 md:justify-items-center xl:grid-cols-2">
            <ServicesFeatures
              name={"متابعة شاملة"}
              arr={[
                "متابعة الغيابات والدرجات",
                " معرفة المتفوقين في مجموعتك الدراسية",
              ]}
            />
            <ServicesFeatures
              name={"الاختبارات أونلاين وأوفلاين "}
              arr={[
                "المشاركة في الاختبارات عبر المنصة",
                "الاطلاع على نماذج الإجابة للامتحانات الأوفلاين",
              ]}
            />
          </div>
        </div>

        {/* ولي الامر */}
        <div className="mx-6 p-4">
          <div className="relative flex">
            <Circle alt="" className="absolute -right-5 top-10" />
            <h2 className="z-10 my-8 font-cairo-bold text-[2.5rem]">
              ولي الامر
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-20 md:justify-items-center xl:grid-cols-2">
            <ServicesFeatures
              name={" مراقبة أداء الأبناء"}
              arr={[
                "إضافة الأبناء للحساب باستخدام كود الطلاب",
                "معرفة كافة التفاصيل الدراسية للأبناء.",
              ]}
            />
            <ServicesFeatures
              name={"التواصل مع المدرسين"}
              arr={["تواصل مع المدرسين عبر التطبيق لمتابعة تقدم الأبناء"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
