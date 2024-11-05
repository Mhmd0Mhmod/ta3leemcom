import { createContext, useContext, useState } from "react";
import Button from "./Button.jsx";

const CarouselContext = createContext();

function Carousel({ length, containerClassName, children }) {
  const [current, setCurrent] = useState(0);

  function increase() {
    setCurrent((current + 1) % length);
  }

  function decrease() {
    if (current === 0) setCurrent(length - 1);
    else setCurrent(current - 1);
  }

  function handleCurrentChange(index) {
    setCurrent(index);
  }

  return (
    <CarouselContext.Provider
      value={{
        current,
        increase,
        length,
        decrease,
        handleCurrentChange,
      }}
    >
      <div className={`overflow-hidden ${containerClassName}`}>{children}</div>
    </CarouselContext.Provider>
  );
}

function RightButton({ children }) {
  const { decrease } = useContext(CarouselContext);

  return (
    <Button type={"normal"} onClick={decrease}>
      {children}
    </Button>
  );
}

function LeftButton({ children }) {
  const { increase } = useContext(CarouselContext);

  return (
    <Button type={"normal"} onClick={increase}>
      {children}
    </Button>
  );
}

function Dotes({
  containerClassName,
  DotesClassName,
  activeStyle,
  notActiveStyle,
}) {
  const { current, length, handleCurrentChange } = useContext(CarouselContext);
  return (
    <div className={`flex justify-center ${containerClassName}`}>
      {Array.from({ length }, (_, i) => (
        <div
          key={i}
          onClick={() => handleCurrentChange(i)}
          className={
            DotesClassName
              ? `${DotesClassName} ${i === current ? activeStyle : notActiveStyle}`
              : `mx-1 h-3 cursor-pointer rounded-full ${
                  i === current ? "w-10 bg-primary" : "w-3 bg-gray-300"
                }`
          }
        />
      ))}
    </div>
  );
}

function Items({ className, children, ...props }) {
  const { current, length } = useContext(CarouselContext);

  return (
    <div
      {...props}
      className={className}
      style={{
        transform: `translateX(${current * 100}%)`,
        gridTemplateColumns: `repeat(${length}, 100%)`,
        display: "grid",
      }}
    >
      {children}
    </div>
  );
}

Carousel.RightButton = RightButton;
Carousel.LeftButton = LeftButton;
Carousel.Dotes = Dotes;
Carousel.Items = Items;
export default Carousel;
