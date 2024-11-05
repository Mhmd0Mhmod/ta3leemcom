import Rect from "/public/Icons/Rectangle 91.svg";

export default function ServicesFeatures({ name, arr, isAvailable = false }) {
  return (
    <>
      <div className="flex h-40 gap-4 font-cairo">
        <div className="relative w-60">
          <Rect />
          <h2 className="font-cairo-bold text-2xl">{name}</h2>

          <span className="absolute -left-16 top-5 -rotate-45 text-4xl">
            {isAvailable ? <p>قريبا</p> : null}
          </span>
        </div>
        <hr className={"h-full w-px bg-black"} />

        <div>
          <ul className="flex w-80 items-center font-cairo text-xl leading-10">
            <div>
              {arr.map((el) => (
                <li key={el}>{el}</li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
