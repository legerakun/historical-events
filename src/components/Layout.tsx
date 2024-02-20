import gsap from "gsap";
import { useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { StateContext } from "@/libs/reducer";
import { useWindowDimensions } from "@/libs/utils";

import { Years } from "@/components/Years";

import "@/components/Layout.css";

const Button = ({ number }: { number: number }) => {
  const { state, dispatch } = useContext(StateContext);
  const arrow = useRef(null);
  const button = useRef(null);

  const cssName =
    state.blockNumber === number ? "nav-button-active" : "nav-button";

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
        duration: 0,
      });
    },
    { dependencies: [state.blockNumber], scope: arrow }
  );

  return (
    <div className="arrow" ref={arrow}>
      <button
        className={cssName}
        ref={button}
        onClick={() =>
          dispatch({
            type: "SET_YEAR",
            blockNumber: number,
          })
        }
      >
        {number + 1}
      </button>
    </div>
  );
};

export const Layout = () => {
  const { state } = useContext(StateContext);

  const { width } = useWindowDimensions();
  const buttons = [];

  for (let i = 0; i < state.blockCount!; i++) {
    buttons.push(<Button number={i} key={"nav-button " + i} />);
  }

  return (
    <>
      {width > 900 ? (
        <div className="layout">
          {width > 1440 && 
            <>
              <hr className="middle" />
              <hr className="horizontal" />
            </>
          }
          <div className="circle">
            <Years />
            {buttons}
          </div>
          <hr className="gradient" />
          <p className="dates">Historical Events</p>
        </div>
      ) : (
        <>
          <Years />
          <hr className="horizontal" />
          <p className="dates">Historical Events</p>
        </>
      )}
    </>
  );
};
