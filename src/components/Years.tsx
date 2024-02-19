import { useContext, useEffect, useState } from "react";
import { StateContext } from "@/libs/reducer";

import "@/components/Years.css";

interface CounterProps {
  date: number;
  second?: boolean;
}

const Counter = ({ date, second = false }: CounterProps) => {
  const [counter, setCounter] = useState(0);

  const start = date - 5;
  const className = second ? "end" : "start";

  useEffect(() => {
    let timeout = 0;

    for (let i = start; i <= date; i++) {
      setTimeout(() => setCounter(i), timeout);

      timeout += 100;
    }
  }, [date]);

  return <p className={className}>{counter}</p>;
};

export const Years = () => {
  const { state } = useContext(StateContext);

  if (state.years === "" || state.years === undefined) return;

  const first = Number(state.years.substring(0, 4));
  const second = Number(state.years.substring(5, 9));

  return (
    <>
      <Counter date={first} />
      <Counter date={second} second={true} />
    </>
  );
};
