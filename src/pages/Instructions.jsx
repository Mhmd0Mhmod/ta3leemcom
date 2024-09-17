import { CirclePlay, User } from "lucide-react";
import Button from "../components/ui-local/Button";
import InstructionItem from "../components/InstructionItem";
import Heading from "../components/ui-local/Heading";

export default function Instructions() {
 return (
  <>
   <div className="relative">
    <Heading
     as={"h1"}
     className="font-almaria-bold text-[46px] text-center pb-10 pt-2"
    >
     تعليمات
    </Heading>
    <div>
     <div className="flex gap-8 w-full justify-center">
      <Button>المدرسين</Button>
      <Button type={"outline"}>الطلاب</Button>
      <Button type={"outline"}>اولياء الامور</Button>
     </div>
    </div>
    <div className="absolute left-0 top-16 -rotate-12">
     <img src="Icons/lamp.svg" alt="lamp" className="w-24" />
    </div>
   </div>
   <div className="grid grid-cols-9 gap-12 items-center my-28">
    <div className="flex flex-col col-span-3 gap-1 relative">
     {[1, 2, 3, 4, 5].map((index) => (
      <InstructionItem
       title={"تسجيل الدخول"}
       desc={"قم بزيارة الصفحة الرئيسية للمنصة واضغط على رابط تسجيل الدخول."}
       icon={<User fill="white" stroke="white" />}
       key={index}
      />
     ))}
     <div className="absolute  -bottom-32 -left-32">
      <svg
       className="absolute -bottom-2 left-0"
       width="38"
       height="31"
       viewBox="0 0 38 31"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8131 12.3921C17.2437 14.5223 18.6562 16.8008 19.7425 19.0016C21.4205 22.4377 22.3769 25.6451 21.7223 28.1291C21.5787 29.348 20.3497 30.2305 18.9998 30.0882C17.6437 29.9591 16.6619 28.8545 16.8202 27.6412C16.8074 27.0461 16.496 26.4613 16.1864 25.7995C15.4723 24.2379 14.1379 22.6725 12.688 20.9855C10.8354 18.8341 8.67159 16.7193 6.8029 14.7482C5.10414 12.9661 3.66275 11.2978 2.70719 9.95468C1.19932 7.84164 0.876701 5.96334 0.997652 4.82899C1.0341 4.53224 3.11144 -0.0495312 7.89933 1.15588C9.61171 1.59174 13.8861 2.8964 14.0973 2.96145C16.6847 3.88647 21.4827 5.54619 25.9259 6.20071C27.3304 6.41037 28.6825 6.58451 29.8811 6.49817C29.9308 6.39288 29.9805 6.2876 30.0449 6.1879C30.9643 4.64366 33.0842 4.07006 34.8085 4.88325C35.7541 5.25954 37.0851 6.46635 37.5016 7.23105C38.3032 8.71735 37.8174 10.0387 36.3474 11.2486C34.3443 12.8919 31.2245 13.6432 27.6199 13.7746C23.8292 13.8972 19.4171 13.1769 15.8131 12.3921ZM10.868 5.6281C10.5384 5.19168 10.4013 4.85979 10.7497 4.74418C11.1398 4.61343 10.9564 5.25797 10.868 5.6281Z"
        fill="#F54547"
       />
      </svg>

      <svg
       width="137"
       height="86"
       viewBox="0 0 137 86"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.39962 68.2899C2.2523 67.326 3.79528 67.1691 4.87389 67.9224C17.7574 76.6123 30.5821 80.3403 42.9699 79.1021C55.032 77.8948 66.5595 71.8549 77.2276 61.2311C79.604 58.9069 83.1285 54.2249 86.0549 48.8332C82.4923 45.2528 79.8414 40.8397 78.235 36.4834C75.8646 30.0493 76.106 23.8662 78.1174 20.5951C79.2321 18.7836 80.8232 17.5734 82.7883 16.9252C85.3041 16.0988 88.8888 16.1927 93.348 18.826C99.503 22.4791 101.69 28.4237 100.942 35.3144C100.544 38.9372 99.2745 42.833 97.5492 46.6327C100.358 48.186 103.686 48.8966 107.508 48.0867C115.604 46.4225 120.925 39.6922 124.325 32.0893C127.276 25.511 130.602 15.9069 128.407 8.80958C127.662 6.39753 126.178 4.41769 128.16 2.16048C131.19 -1.32785 134.795 1.53904 135.823 4.85138C138.027 11.9675 136.345 21.0182 134.421 28.0195C130.895 40.9021 122.635 53.0505 109.648 56.0329C103.556 57.4055 98.1053 56.5063 93.4782 54.2283C90.1302 59.7077 86.3466 64.353 83.7763 66.7585C71.0298 78.4533 57.4521 84.7362 43.5942 85.5379C29.751 86.3451 15.5903 81.7501 1.80852 71.4127C0.736124 70.6463 0.546947 69.2538 1.39962 68.2899ZM90.3594 38.4376C90.9381 36.2974 91.2434 34.2238 91.1524 32.294C91.0323 29.8406 90.2029 27.6447 87.877 26.2758C87.4835 26.048 86.9977 25.7228 86.6041 25.495C86.4508 26.3685 86.213 28.0796 86.3937 29.4533C86.8129 32.5178 88.0861 36.0791 90.1058 39.3039C90.2133 39.0032 90.2937 38.7232 90.3594 38.4376Z"
        fill="#F54547"
       />
      </svg>
     </div>
    </div>
    <div className="col-span-1"></div>
    <div className="col-span-5 relative ">
     <img
      src="imgs/video.svg"
      alt="vidoe"
      className="aspect-video w-full rounded-[30px] brightness-75"
     />
     <span className="absolute inset-0 flex items-center justify-center">
      <img src="Icons/ellipse.svg" alt="play" className="absolute" />
      <img src="Icons/play.svg" alt="play" />
     </span>
     <div className="absolute -right-8 -bottom-12">
      <svg
       //  className="absolute"
       width="409"
       height="267"
       viewBox="0 0 409 267"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <g filter="url(#filter0_d_1625_860)">
        <path
         d="M7.93032 216.326L386.153 2.53024C396.153 -3.12204 408.535 4.10207 408.535 15.5884V229.384C408.535 237.668 401.819 244.384 393.535 244.384H15.3117C-0.107399 244.384 -5.49267 223.913 7.93032 216.326Z"
         fill="#F54547"
        />
       </g>
       <defs>
        <filter
         id="filter0_d_1625_860"
         x="0.287109"
         y="0.566406"
         width="408.248"
         height="265.818"
         filterUnits="userSpaceOnUse"
         color-interpolation-filters="sRGB"
        >
         <feFlood flood-opacity="0" result="BackgroundImageFix" />
         <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
         />
         <feOffset dy="22" />
         <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.984314 0 0 0 0 0.611765 0 0 0 0 0.27451 0 0 0 0.07 0"
         />
         <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1625_860"
         />
         <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1625_860"
          result="shape"
         />
        </filter>
       </defs>
      </svg>
     </div>
    </div>
   </div>
  </>
 );
}
