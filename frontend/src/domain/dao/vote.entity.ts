export class Vote {
  voter: string;
  proposalID: string;
  support: number;
  weight: number;
  constructor(
    voter: string,
    proposalID: string,
    support: number,
    weight: number
  ) {
    this.voter = voter;
    this.proposalID = proposalID;
    this.support = support;
    this.weight = weight;
  }
  public static toDomainModel(
    voter: string,
    proposalID: string,
    support: number,
    weight: number
  ): Vote {
    return new Vote(voter, proposalID, support, weight);
  }
}
