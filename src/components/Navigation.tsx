import "@/components/Navigation.css";
import { Button } from "./utils/Button";

import arrow from "/arrow.svg";
import { useContext, useRef } from "react";
import { StateContext } from "@/libs/reducer";

export const Navigation = () => {
  const { state, dispatch } = useContext(StateContext);

  if (state.blockNumber === undefined) return;
  if (state.blockCount === undefined) return;

  const nextEl = useRef(null);
  const prevEl = useRef(null);

  return (
    <div className="navigation-container">
      <p className="block-number">
        {state.blockNumber + 1}/{state.blockCount}
      </p>
      <div className="navigation-flex">
        <Button
          cssButton={"navigation-button prev-year"}
          cssArrow={
            state.blockNumber === 0
              ? "navigation-arrow-disabled"
              : "navigation-arrow"
          }
          src={arrow}
          alt={"prevYear"}
          nodeRef={prevEl}
          action={() => {
            state.blockNumber !== 0 &&
              dispatch({
                type: "DECREMENT_YEAR",
              });
          }}
        />
        <Button
          cssButton={"navigation-button"}
          cssArrow={
            state.blockNumber + 1 === state.blockCount
              ? "navigation-arrow-disabled"
              : "navigation-arrow"
          }
          src={arrow}
          alt={"nextYear"}
          nodeRef={nextEl}
          action={() => {
            state.blockNumber! + 1 !== state.blockCount &&
              dispatch({
                type: "INCREMENT_YEAR",
              });
          }}
        />
      </div>
    </div>
  );
};
