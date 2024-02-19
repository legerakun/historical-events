import { createContext } from "react";
import { Action, State, StateProps } from "@/libs/types";

import dates from "@/data/dates.json";

export const StateContext = createContext<StateProps>({
  state: {},
  dispatch: () => {},
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        years: action.years,
        events: action.events,
        blockNumber: 0,
        blockCount: action.blockCount,
      };

    case "SET_YEAR":
      if (action.blockNumber === undefined) return state;

      return {
        ...state,
        blockNumber: action.blockNumber,
        years: Object.keys(dates)[action.blockNumber],
        events: Object.values(dates)[action.blockNumber],
      };

    case "DECREMENT_YEAR":
      const decrementedNumber = state.blockNumber! < 1 
        ? state.blockCount! - 1 
        : state.blockNumber! - 1;

      return {
        ...state,
        blockNumber: decrementedNumber,
        years: Object.keys(dates)[decrementedNumber],
        events: Object.values(dates)[decrementedNumber],
      };

    case "INCREMENT_YEAR":
      const incrementedNumber = state.blockNumber! >= state.blockCount! - 1
        ? 0
        : state.blockNumber! + 1;

      return {
        ...state,
        blockNumber: incrementedNumber,
        years: Object.keys(dates)[incrementedNumber],
        events: Object.values(dates)[incrementedNumber],
      };

    default:
      return {
        ...state,
      };
  }
};
