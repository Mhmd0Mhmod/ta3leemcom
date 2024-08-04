import ServicesFeatures from "../components/ServicesFeatures";
import img from "../../public/Icons/Group 117.svg";
export default function Services() {
  return (
    <>
      <div className="relative">
        <h2 className="text-center text-4xl font-almaria-bold mt-10">الخدمات</h2>
        <div className="absolute left-10 top-0">
          <img src={img} alt="" />
        </div>
        {/* معلم */}
        <div className="border-b-2 p-4 mx-6">
          <h2 className="text-3xl font-almaria-bold mt-8">معلم</h2>

          <div className="grid grid-cols-2">
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
              arr={["رفع أوراق الامتحانات المصورة", "نماذج الإجابات", "إدخال وتسجيل درجات الطلاب"]}
            />

            <ServicesFeatures
              name={"اختبارات أونلاين"}
              arr={["إعداد اختبارات إلكترونية للطلاب عبر المنصة.", "متابعة الدرجات"]}
            />
            <ServicesFeatures name={"متابعة أداء الطلاب"} arr={["متابعة الطلاب المتفوقين لكل مجموعة"]} />

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
              arr={["إنشاء اجتماع مع طلابك من نفس المجموعة او من مجموعات مختلفة عبر المنصة."]}
            />
            <ServicesFeatures
              name={" رفع الملفات و الفيديوهات"}
              arr={["تعزيز عملية التعلم من خلال تحميل مواد تعليمية"]}
              isAvailable={true}
            />
            <ServicesFeatures
              name={"إنشاء شهادات تقدير"}
              arr={["دعم جهود الطلاب إعداد شهادات تقدير بسهولة عبر المنصة لدعم وتشجيع الطلاب."]}
              isAvailable={true}
            />
          </div>
        </div>

        {/* طالب */}
        <div className="border-b-2 p-4 mx-6">
          <h2 className="text-3xl font-almaria-bold mt-8">طالب</h2>

          <div className="grid grid-cols-2">
            <ServicesFeatures
              name={"متابعة شاملة"}
              arr={["متابعة الغيابات والدرجات", " معرفة المتفوقين في مجموعتك الدراسية"]}
            />
            <ServicesFeatures
              name={"الاختبارات أونلاين وأوفلاين "}
              arr={["المشاركة في الاختبارات عبر المنصة", "الاطلاع على نماذج الإجابة للامتحانات الأوفلاين"]}
            />
          </div>
        </div>

        {/* ولي الامر */}
        <div className="p-4 mx-6">
          <h2 className="text-3xl font-almaria-bold mt-8">ولي الأمر </h2>

          <div className="grid grid-cols-2">
            <ServicesFeatures
              name={" مراقبة أداء الأبناء"}
              arr={["إضافة الأبناء للحساب باستخدام كود الطلاب", "معرفة كافة التفاصيل الدراسية للأبناء."]}
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
