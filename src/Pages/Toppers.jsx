import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useToppers } from "../Features/Toppers/useToppers";
import Loading from "../UI/Loading";
import Heading from "../UI/Heading";

const style = {
  0: {
    text: "!bg-[#8F2222] text-white",
    number: "bg-gradient-to-r from-[#FFD700] to-[#FF6A00] text-white !border-[#8F2222]",
  },
  1: {
    text: "!bg-[#616E7C] text-white",
    number: "!bg-[#869DB5] text-white !border-[#616E7C]",
  },
  2: {
    text: "!bg-[#EE943C] text-white",
    number: "!bg-[#B46300] text-white !border-[#EE943C]",
  },
};

function Toppers() {
  const { height } = useWindowSize();
  const { toppers, isLoading, error } = useToppers();
  const [animation, setAnimation] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <Confetti height={height} numberOfPieces={2000} tweenDuration={5000} recycle={animation} />
      <div className={"m-auto flex flex-col gap-6 text-center"}>
        <Heading className={"font-Almarai-bold"}>المتفوقون</Heading>
        <hr className="h-2 w-[70%]" />
      </div>
      <div className={"m-auto flex w-3/4 flex-col font-Almarai-bold"}>
        {!isLoading && !toppers && <div className={"text-center text-xl"}>لا يوجد متفوقون </div>}
        {toppers?.map((el, index) => (
          <div className={`relative flex items-center rounded`} key={el.id}>
            <div className={`relative`}>
              <div className={"rounded-full border-4 border-[#F5F7F9]"}>
                <span className={`bg flex h-10 w-10 items-center justify-center rounded-full border-8 border-[#C6C6C6] bg-white p-7 text-xl ${style[index]?.number}`}>
                  {index + 1}
                </span>
              </div>
            </div>
            <h3 className={`-mr-5 w-full rounded-xl bg-[#C6C6C6] p-4 text-center text-xl ${style[index]?.text}`}>{el.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Toppers;
