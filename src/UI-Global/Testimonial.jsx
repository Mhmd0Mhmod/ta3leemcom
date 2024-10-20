import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
// import AutoPlay from "embla-carousel-autoplay";
import {
  usePrevNextButtons,
  //  PrevButton,
  //  NextButton,
} from '../pages/Home/Components/EmblaCarouselArrowButtons.jsx';
import { DotButton, useDotButton } from '../pages/Home/Components/EmblaCarouselDotButton.jsx';
import '../embla.css';
// import Button from "./Button";
import Heading from './Heading.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Testimonial({ setRef = () => {}, slides, type = 'primary' }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    setRef({
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    });
  }, [setRef, prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick]);
  const [feedBacks, setFeedBacks] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/Comments/GetAllFeedBacks`).then((data) => setFeedBacks([...data.data]));
  }, []);

  return (
    <div className="carousel-container mx-8 overflow-hidden">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {feedBacks?.map((el) => (
              <div className="embla__slide" key={el.id}>
                <div className="h-full w-full p-8">
                  <div>
                    <div>
                      <div className="d-rtl rounded-xl shadow-2xl">
                        <div className="relative p-8">
                          <p className="p-20 text-justify text-[18px] text-accent-l-100">{el.message}</p>
                          {/* <div className="absolute -right-16"> */}
                          <div className="absolute inset-0 inset-x-10 inset-y-16 flex items-end">
                            <img src="Icons/quotation-mark.svg" alt="" />
                          </div>
                          {/* <div className="absolute -left-16 -top-6 rotate-180"> */}
                          <div className="absolute inset-x-10 inset-y-16 flex rotate-180 items-end">
                            <img src="Icons/quotation-mark.svg" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="-mt-14">
                        <div className="rounded-xl shadow-xl">
                          <div className="pb-10 pt-24">
                            <div className="my-3 flex w-full justify-center gap-3">
                              {[1, 2, 3, 4, 5].map((index) => (
                                <svg key={index} width="22" height="22" viewBox="0 0 22 22" fill={index <= el.stars ? '#FFA033' : 'none'} xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M11.0002 1.83398L13.8327 7.57232L20.1668 8.49815L15.5835 12.9623L16.6652 19.269L11.0002 16.2898L5.33516 19.269L6.41683 12.9623L1.8335 8.49815L8.16766 7.57232L11.0002 1.83398Z"
                                    stroke="#FFA033"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ))}
                            </div>
                            <div className="flex justify-center gap-32">
                              {type === 'sec' && (
                                <button onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
                                  <img src="Icons/arrow-small.svg" alt="arrow" className="rotate-180" />
                                </button>
                              )}
                              <Heading as={'h4'}>{el.name}</Heading>
                              {type === 'sec' && (
                                <button onClick={onNextButtonClick} disabled={nextBtnDisabled}>
                                  <img src="Icons/arrow-small.svg" alt="arrow" />
                                </button>
                              )}
                            </div>
                            <Heading as={'h5'} className={'my-2 text-gray-600'}>
                              {el.userRole}
                            </Heading>
                            {type === 'sec' && (
                              <div className="mt-3 flex items-center justify-center gap-3">
                                {scrollSnaps.map((_, index) => (
                                  <DotButton key={index} onClick={() => onDotButtonClick(index)} className={'embla__dot'.concat(index === selectedIndex ? 'embla__dot--selected transition-all duration-300' : '')} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls mt-0 flex w-full justify-end"></div>

        {type === 'primary' && (
          <div className="mb-16 mt-28 flex items-center justify-center gap-3">
            {scrollSnaps.map((_, index) => (
              <DotButton key={index} onClick={() => onDotButtonClick(index)} className={'embla__dot'.concat(index === selectedIndex ? 'bg-accent-700 transition-all duration-300' : '')} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
