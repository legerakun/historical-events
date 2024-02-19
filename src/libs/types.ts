export interface StateProps {
  state: State;
  dispatch: Function;
}

export interface State {
  years?: string;
  events?: Record<string, string>;
  blockNumber?: number;
  blockCount?: number;
}

export interface Action {
  type: string;
  item?: string;
  years?: string;
  events?: Record<string, string>;
  blockCount?: number;
  blockNumber?: number;
}
