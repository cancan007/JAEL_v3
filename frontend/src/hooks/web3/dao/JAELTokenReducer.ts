import { AnyAction } from "redux";

type JAELTokenType = {
  loaded: boolean;
  contract?: Object;
  address?: string;
  balance?: number;
  decimal?: number;
  //rate?: number;
  //depositedBalance?: number;
  symbol?: string;
};

export const jaelTokenReducer = (
  state: JAELTokenType = { loaded: false },
  action: AnyAction
) => {
  switch (action.type) {
    case "JAEL_TOKEN_LOADED":
      return {
        ...state,
        loaded: true,
        contract: action.contract,
        address: action.address,
        symbol: action.symbol,
        decimal: action.decimal,
      };
    case "JAEL_TOKEN_BALANCE":
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};
