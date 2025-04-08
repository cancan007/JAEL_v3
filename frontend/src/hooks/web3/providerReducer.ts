import { AnyAction } from "redux";

type providerType = {
  connection?: Object;
  chainId?: number;
  account?: string;
  balance?: number;
};

export const providerReducer = (
  state: providerType = {},
  action: AnyAction
) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      };
    case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "ACCOUNT_LOADED":
      return {
        ...state,
        account: action.account,
      };
    case "BALANCE_LOADED":
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};
