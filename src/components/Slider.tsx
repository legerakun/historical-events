import type { NavigationOptions } from "swiper/types";

import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { StateContext } from "@/libs/reducer";
import { Button } from "./utils/Button";

import "swiper/css";
import "swiper/css/navigation";
import "@/components/Slider.css";

import arrow from "/arrow.svg";
import { useWindowDimensions } from "@/libs/utils";

export const Slider = () => {
  const { state } = useContext(StateContext);

  if (state.events === undefined) return;

  const { width } = useWindowDimensions();
  const nextEl = useRef(null);
  const prevEl = useRef(null);

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
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: nextEl.current,
          prevEl: prevEl.current,
        }}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation as NavigationOptions;

          navigation.nextEl = nextEl.current;
          navigation.prevEl = prevEl.current;
        }}
        className="slider"
        spaceBetween={120}
        slidesPerView={width > 430 ? 3 : 2}
        speed={500}
      >
        {slides}
      </Swiper>
      {width > 430 && (
        <>
          <Button
            cssButton={"navigation next"}
            cssArrow={"nav-arrow"}
            src={arrow}
            alt={"next"}
            nodeRef={nextEl}
          />
          <Button
            cssButton={"navigation prev"}
            cssArrow={"nav-arrow"}
            src={arrow}
            alt={"prev"}
            nodeRef={prevEl}
          />
        </>
      )}
    </>
  );
};
