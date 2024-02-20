import type { NavigationOptions } from "swiper/types";

import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { StateContext } from "@/libs/reducer";
import { Button } from "./utils/Button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/Slider.css";

import arrow from "/arrow.svg";
import { useWindowDimensions } from "@/libs/utils";

export const Slider = () => {
  const { state } = useContext(StateContext);

  if (state.events === undefined) return;

  const { width } = useWindowDimensions();
  const nextEl = useRef(null);
  const prevEl = useRef(null);
  const pagiEl = useRef(null);

  const slides = Object.entries(state.events).map((slide) => {
    const [year, event] = slide;

    return (
      <SwiperSlide key={year}>
        <h1>{year}</h1>
        <h2>{event}</h2>
      </SwiperSlide>
    );
  });

  return (
    <>
      <div className="slider-container">
        {width > 900 && (
          <Button
            cssButton={"navigation next"}
            cssArrow={"nav-arrow"}
            src={arrow}
            alt={"next"}
            nodeRef={nextEl}
          />
        )}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: nextEl.current,
            prevEl: prevEl.current,
          }}
          pagination={width > 900 ? false : { el: pagiEl.current }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation as NavigationOptions;

            navigation.nextEl = nextEl.current;
            navigation.prevEl = prevEl.current;
          }}
          className="slider"
          spaceBetween={width > 1440 ? 120 : width > 930 ? 80 : 40}
          slidesPerView={width > 1440 ? 3 : 2}
          speed={500}
        >
          {slides}
        </Swiper>
        {width > 930 && (
          <Button
            cssButton={"navigation prev"}
            cssArrow={"nav-arrow"}
            src={arrow}
            alt={"prev"}
            nodeRef={prevEl}
          />
        ) }
      </div>
      {width < 930 && (
        <div ref={pagiEl} className="pagination"></div>
      )}
    </>
  );
};
