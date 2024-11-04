function FeaturesCard({ feature }) {
  return (
    <div
      className={
        "d-rtl col-span-1 flex w-full flex-col gap-4 rounded-br-xl rounded-tl-xl bg-white p-8 pb-14 shadow-xl"
      }
    >
      {feature.icon}
      <h2 className={"font-Almarai-bold text-xl"}>{feature.text}</h2>
      <span className="mt-2 block h-[2px] w-12 bg-secondary"></span>
    </div>
  );
}

export default FeaturesCard;
