import { useContext, useRef } from "react";
import { StateContext } from "@/libs/reducer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Years } from "./Years";

import "@/components/Layout.css";
import { useWindowDimensions } from "@/libs/utils";

const Button = ({ number }: { number: number }) => {
  const { state, dispatch } = useContext(StateContext);
  const arrow = useRef(null);
  const button = useRef(null);

  const cssName = state.blockNumber === number 
    ? "nav-button-active" 
    : "nav-button";

  if (state.blockCount === undefined) return;
  if (state.blockNumber === undefined) return;

  const baseTheta = (2 * Math.PI * number) / state.blockCount;
  const rotation = (2 * Math.PI * state.blockNumber) / state.blockCount;
  const increment = (30 * Math.PI) / 180;

  const theta = baseTheta - rotation + increment;

  useGSAP(
    () => {
      gsap.to(arrow.current, {
        rotate: (theta * 180) / Math.PI,
      });

      gsap.to(button.current, {
        rotate: (-theta * 180) / Math.PI,
      });
    },
    { dependencies: [state.blockNumber], scope: arrow }
  );

  return (
    <div className="arrow" ref={arrow}>
      <button
        className={cssName}
        ref={button}
        onClick={() => dispatch({ 
          type: "SET_YEAR", 
          blockNumber: number 
        })}
      >
        {number + 1}
      </button>
    </div>
  );
};

export const Layout = () => {
  const { state } = useContext(StateContext);
  const buttons = [];
  const { width } = useWindowDimensions();

  for (let i = 0; i < state.blockCount!; i++) {
    buttons.push(<Button number={i} key={"nav-button " + i} />);
  }

  return (
    <>
      {width > 430 && <hr className="gradient" />}
      <p className="dates">Historical Events</p>
      <Years />
      {width > 430 ? (
        <div className="layout">
          <hr className="middle" />
          <hr className="horizontal" />
          <div className="circle">{buttons}</div>
        </div>
      ) : (
        <hr className="horizontal" />
      )}
    </>
  );
};
