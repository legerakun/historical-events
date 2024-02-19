import { useEffect, useReducer } from "react";
import { StateContext, reducer } from "@/libs/reducer";

import { Layout } from "@/components/Layout";
import { Slider } from "@/components/Slider";
import { Navigation } from "@/components/Navigation";

import dates from "@/data/dates.json";

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    years: "",
    events: {},
    blockNumber: 0,
    blockCount: 0,
  });

  useEffect(() => {
    dispatch({
      type: "INIT",
      years: Object.keys(dates)[0],
      events: Object.values(dates)[0],
      blockCount: Object.keys(dates).length,
    });
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Layout />
      <Slider />
      <Navigation />
    </StateContext.Provider>
  );
};
