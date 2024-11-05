export default function AboutFeatures({ Rect, Icon, header, paragraph, list }) {
  return (
    <>
      <div className="p-4 text-5xl">
        <div className="flex gap-4">
          <Rect />
          <div>
            <Icon />
            <h2
              style={{ color: `#F54547` }}
              className="ms-8 font-cairo-bold text-3xl font-bold"
            >
              {header}
            </h2>
          </div>
        </div>
        <div className="flex border-r ps-4 text-xl leading-loose">
          {/* <img src={grayRect} alt="" className="ms-0.5 mt-5" /> */}

          {paragraph ? (
            <p>{paragraph}</p>
          ) : (
            <ul className="list-[square] ps-8">
              {Object.entries(list).map(([key, val]) => (
                <li style={{ color: `#0884A2` }} key={key}>
                  <span className="font-Almaria-bold text-4xl"> {key} :</span>{" "}
                  <span className={"text-black"}>{val}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
