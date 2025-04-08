import { AnyAction } from "redux";

type GovernorContractType = {
  contract?: Object;
  reward?: number;
  transaction: {
    isSuccessful: boolean;
  };
  allProposals: {
    // ProposalCreated
    /*
        event ProposalCreated(
            uint256 proposalId,
            address proposer,
            address[] targets,
            uint256[] values,
            string[] signatures,
            bytes[] calldatas,
            uint256 voteStart,
            uint256 voteEnd,
            string description
    );
      */
    // ProposalQueued
    // ProposalExecuted
    loaded: boolean;
    data?: Array<any>;
  };
  queuedProposals: {
    loaded: boolean;
    data?: Array<any>;
  };
  executedProposals: {
    loaded: boolean;
    data?: Array<any>;
  };
};

const DEFAULT_GC_STATE = {
  transaction: {
    isSuccessful: false,
  },
  allProposals: {
    loaded: false,
  },
  queuedProposals: {
    loaded: false,
  },
  executedProposals: {
    loaded: false,
  },
};

export const governorContractReducer = (
  state: GovernorContractType = DEFAULT_GC_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case "GC_LOADED":
      return {
        ...state,
        contract: action.contract,
      };
    case "REWARD_LOADED":
      return {
        ...state,
        reward: action.reward,
      };
    case "PROPOSALS_LOADED":
      return {
        ...state,
        allProposals: {
          loaded: true,
          data: action.proposals,
        },
      };
    case "QUEUED_PROPOSALS_LOADED":
      return {
        ...state,
        queuedProposals: {
          loaded: true,
          data: action.proposals,
        },
      };
    case "NEW_PROPOSAL_SUCCESS":
      if (state.allProposals.data) {
        return {
          ...state,
          allProposals: {
            ...state.allProposals,
            data: [...state.allProposals.data, action.proposal],
          },
        };
      } else {
        return {
          ...state,
          allProposals: {
            ...state.allProposals,
            data: [action.proposal],
          },
        };
      }
    case "QUEUED_PROPOSAL_SUCCESS":
      if (state.queuedProposals.data) {
        return {
          ...state,
          queuedProposals: {
            ...state.queuedProposals,
            data: [...state.queuedProposals.data, action.proposal],
          },
        };
      } else {
        return {
          ...state,
          queuedProposals: {
            ...state.queuedProposals,
            data: [action.proposal],
          },
        };
      }
    case "EXECUTED_PROPOSAL_SUCCESS":
      if (state.executedProposals.data) {
        return {
          ...state,
          executedProposals: {
            ...state.executedProposals,
            data: [...state.executedProposals.data, action.proposal],
          },
        };
      } else {
        return {
          ...state,
          executedProposals: {
            ...state.executedProposals,
            data: [action.proposal],
          },
        };
      }
    default:
      return state;
  }
};
