import Star1 from "/public/Icons/star-1.svg";
import Star2 from "/public/Icons/star-2.svg";
import Star3 from "/public/Icons/star-3.svg";
import Star4 from "/public/Icons/star-4.svg";
import Star5 from "/public/Icons/star-5.svg";
import FilledStar1 from "/public/Icons/filled-star-1.svg";
import FilledStar2 from "/public/Icons/filled-star-2.svg";
import FilledStar3 from "/public/Icons/filled-star-3.svg";
import FilledStar4 from "/public/Icons/filled-star-4.svg";
import FilledStar5 from "/public/Icons/filled-star-5.svg";
import Qouts from "/public/Icons/qout.svg";
import { useState } from "react";
import CustomersOpinionsCarousel from "../UI/CustomersOpinionsCarousel.jsx";
import Heading from "../UI/Heading.jsx";
import Button from "../UI/Button.jsx";
import { useForm } from "react-hook-form";

function Opinion() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const rate = watch("rate", 0);

  const handleSetRate = (value) => {
    setValue("rate", value);
  };
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
    // sendOpinion(rate, comment)
    //   .then((res) => {
    //     if (res?.status === 200) {
    //       toast.success("تم ارسال رايك بنجاح");
    //       setRate(0);
    //       setComment("");
    //     } else {
    //       toast.error("حدث خطأ اثناء ارسال رايك");
    //     }
    //   })
    //   .finally(() => setLoading(false));
  };
  return (
    <div className={"p-5"}>
      <div className="space-y-4 text-center">
        <Heading as={"h5"} className={"text-secondary"}>
          ماذا يقول عملائنا
        </Heading>
        <Heading as={"h1"} className={"font-Almarai-bold"}>
          ملاحظات المستخدمين
        </Heading>
      </div>
      <div className={"space-y-8 pr-3"}>
        <div className="flex items-center gap-4">
          <Heading as={"h2"} className={"font-Almarai-bold text-secondary"}>
            رايك يهمنا
          </Heading>
          <Qouts />
        </div>
        <Heading as={"h2"} className={"text-start"}>
          ما رأيك في تجربتك معنا؟
        </Heading>
        <Heading as={"h2"} className={"mt-2 text-start text-gray-500"}>
          تقيمك
        </Heading>
      </div>
      <div className="my-4 flex flex-col gap-10 xl:flex-row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-6 flex items-center justify-center gap-4">
            {rate >= 1 ? <FilledStar1 data-value={1} onClick={() => handleSetRate(1)} /> : <Star1 data-value={1} onClick={() => handleSetRate(1)} />}
            {rate >= 2 ? <FilledStar2 data-value={2} onClick={() => handleSetRate(2)} /> : <Star2 data-value={2} onClick={() => handleSetRate(2)} />}
            {rate >= 3 ? <FilledStar3 data-value={3} onClick={() => handleSetRate(3)} /> : <Star3 data-value={3} onClick={() => handleSetRate(3)} />}
            {rate >= 4 ? <FilledStar4 data-value={4} onClick={() => handleSetRate(4)} /> : <Star4 data-value={4} onClick={() => handleSetRate(4)} />}
            {rate >= 5 ? <FilledStar5 data-value={5} onClick={() => handleSetRate(5)} /> : <Star5 data-value={5} onClick={() => handleSetRate(5)} />}
          </div>
          <div className={"flex flex-col items-center xl:items-stretch"}>
            <Heading as={"h2"} className={"mt-2 text-start text-gray-600"}>
              اكتب رايك
            </Heading>
            <textarea
              className="my-6 min-h-72 w-8/12 resize-none rounded-lg border border-gray-300 bg-accent-300 p-4 text-xl xl:w-full"
              placeholder="اكتب رايك هنا"
              {...register("comment")}
            ></textarea>
          </div>
          <div className={"text-center"}>
            <Button disabled={loading} className={"self-center px-10 py-3 text-3xl disabled:cursor-not-allowed disabled:bg-gray-700"}>
              إرسال
            </Button>
          </div>
        </form>
        <CustomersOpinionsCarousel opinionClassName={"xl:w-10/12 "} />
      </div>
    </div>
  );
}

export default Opinion;
