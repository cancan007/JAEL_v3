import { ProposalState } from "../../types/types";

interface DaoStateSelectorRes {
  color: string;
  text: string;
}

export const daoStateSelector = (state: bigint): DaoStateSelectorRes => {
  switch (Number(state)) {
    case ProposalState.Pending:
      return {
        color: "#EB9C02",
        text: "Pending",
      };
    case ProposalState.Active:
      return {
        color: "#84C19D",
        text: "Open",
      };
    case ProposalState.Canceled:
      return {
        color: "#000824", //todo: change
        text: "Cancelled",
      };
    case ProposalState.Defeated:
      return {
        color: "#EA2C65",
        text: "Rejected",
      };
    case ProposalState.Succeeded:
      return {
        color: "#CF84DB",
        text: "Succeeded",
      };
    case ProposalState.Queued:
      return {
        color: "#CF84DB", // todo: change
        text: "Queued",
      };
    case ProposalState.Expired:
      return {
        color: "#EA2C65", // todo: change
        text: "Expired",
      };
    case ProposalState.Executed:
      return {
        color: "#666666", // todo: change
        text: "Executed",
      };
    default:
      return {
        color: "",
        text: "",
      };
  }
};
