function FeaturesCard({ feature }) {
  return (
    <div className={"d-rtl col-span-1 flex w-full flex-col gap-4 rounded-br-xl rounded-tl-xl bg-white p-8 pb-14 shadow-xl"}>
      {feature.icon}
      <h2 className={"font-Almarai-bold text-xl"}>{feature.text}</h2>
      <span className="bg-Secondary-500 mt-2 block h-[2px] w-12"></span>
    </div>
  );
}

export default FeaturesCard;
