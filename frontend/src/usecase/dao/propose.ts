import { ProposalRepository } from "src/domain/dao/proposal.entity";
import { CustomFile, FileRepository } from "src/domain/file.entity";

export type ProposeUsecaseCmd = {
  title: string;
  detail: string;
  target: string;
  value: number;
  calldata: string;
  //description: string; //NOTE: Markdown porposal detail file URL
};

export class proposeUsecase {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly proposalRepository: ProposalRepository
  ) {}

  async execute(cmd: ProposeUsecaseCmd): Promise<void> {
    const jsonString = JSON.stringify({ title: cmd.title, detail: cmd.detail });
    const jsonFile = CustomFile.toJSONFile(jsonString);
    const { cid } = await this.fileRepository.upload(jsonFile);
    const url = await this.fileRepository.getFileURLByCID(cid);
    await this.proposalRepository.propose(
      cmd.target,
      cmd.value,
      cmd.calldata,
      url
    );
  }
}
