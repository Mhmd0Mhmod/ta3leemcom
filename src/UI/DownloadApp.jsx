import Heading from "./Heading.jsx";
import Button from "./Button.jsx";
import PlayStore from "../../public/Icons/google.svg";
import AppStore from "../../public/Icons/apple.svg";

export default function DownloadApp() {
  return (
    <div className="bg-accent-600 flex flex-col items-center justify-between gap-10 p-8 text-center xl:flex-row">
      <div className="w-full space-y-10">
        <Heading as={"h1"} className={"font-Almaria-bold"}>
          حمل تطبيق ولي الأمر الآن
        </Heading>
        <Heading as={"h4"} className={"font-Almarai text-[#605E5E]"}>
          تابع أداء وتقدم ابنك الدراسي بكل سهولة.
        </Heading>

        <div className={"flex w-full gap-10"}>
          <Button
            type="light"
            className={"flex w-full justify-between p-2 opacity-75 shadow-2xl"}
          >
            <div>
              <p>تحميل تطبيق</p>
              <p>ولي الأمر</p>
            </div>
            <PlayStore />
          </Button>
          <Button
            type="light"
            className={"flex w-full justify-between p-2 opacity-75 shadow-2xl"}
          >
            <div>
              <p>تحميل تطبيق</p>
              <p>ولي الأمر</p>
            </div>
            <AppStore />
          </Button>
        </div>
      </div>
      <div className="min-w-fit">
        <img src="/public/imgs/DownloadApp.png" alt="DownloadApp" />
      </div>
    </div>
  );
}
