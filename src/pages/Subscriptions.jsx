import Subscription from "../components/ui/Subscription.jsx";

export default function Subscriptions() {
    return (
        <div className={"relative mt-5"}>
            <div className={"w-[50%] absolute left-0 z-0"}>
                <img src="../../public/circles.svg" alt="circles" className={"w-[100%]"}/>
            </div>
            <div className={"relative z-10 flex flex-col gap-10"}>
                    <h1 className={"text-center text-3xl font-almaria-bold "}>الاشتركات</h1>
                <div className={"w-[10%]  right-5 "}>
                    <img src="../../public/lamp.svg" alt="lamp" className={"w-[70%]"}/>
                    <p className={"text-gray-400 text-m"}>لا تقلق حول التكلفه</p>
                </div>
                <p className={"text-5xl "}>اشتركات تناسب ميزانيتك</p>
                <div className={"grid grid-cols-3 gap-10 "}>
                    <Subscription title={"الباقة الأساسيه "} price={"100"}
                                  support={["إداره شامله للطلاب", "اختبارات اوفلين", "متابعه اداء الطلاب", "التواصل مع اولياء الامور"]}
                                  notSupport={["انشاء شهادات تقدير", "رفع الملفات والفيديوهات"]}/>
                    <Subscription title={"الباقة المتقدمة "} price={"200"}
                                  support={["إداره شامله للطلاب", "اختبارات اوفلين", "متابعه اداء الطلاب", "التواصل مع اولياء الامور", "انشاء شهادات تقدير"]}
                                  notSupport={["رفع الملفات والفيديوهات"]}/>
                    <Subscription title={"الباقة الاحترافية "} price={"300"}
                                  support={["إداره شامله للطلاب", "اختبارات اوفلين", "متابعه اداء الطلاب", "التواصل مع اولياء الامور", "انشاء شهادات تقدير", "رفع الملفات والفيديوهات"]}/>
                </div>
            </div>
        </div>
    );
}
