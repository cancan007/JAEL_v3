export const extractProposalCreated = (m: any) => {
  const {
    proposalId,
    proposer,
    targets,
    values,
    signatures,
    voteStart,
    voteEnd,
    description,
  } = m;
  return {
    proposalId,
    proposer,
    targets,
    values,
    signatures,
    voteStart,
    voteEnd,
    description,
  };
};

export const extractVoteCast = (m: any) => {
  const { voter, proposalId, support, weight } = m;
  return {
    voter,
    proposalId,
    support,
    weight,
  };
};

export const extractDelegateChanged = (m: any) => {
  const { delegator, fromDelegate, toDelegate } = m;
  return {
    delegator,
    fromDelegate,
    toDelegate,
  };
};
