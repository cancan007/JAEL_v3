import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Icon,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../components/layout/WholeLayout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/useGeneral";
import { useWindowSize } from "../../hooks/window/useWindow";
import { CircleImageIcon } from "../../components/common/CircleImageIcon";
import Blockies from "react-blockies";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { arweaveBaseUrl } from "../../utils/url/web3.url";
import { uniqueArray } from "../../utils/uniqueArray";
import { daoStateSelector } from "../../utils/web3/daoStateSelector";
import moment from "moment";
import { useGetCastVotesHistory } from "../../hooks/api/web3/dao/useGetCastVotesHistory";
import { usePostCastVote } from "../../hooks/api/web3/dao/usePostCastVote";
import { useGetProposalVotes } from "../../hooks/api/web3/dao/useGetProposalVotes";
import { useGetHasVoted } from "../../hooks/api/web3/dao/useGetHasVoted";
import { CastSupport, ProposalState } from "../../types/types";
import { putUnitToBigNum } from "../../utils/putUnitToBiigNum";
import { ethers } from "ethers";
import { subscribeToDAOEvents } from "../../hooks/api/web3/dao/subscriveToDAOEvents";
import { useGetJAELDelegatee } from "../../hooks/api/web3/dao/useGetJAELDelegatee";
import { usePostDelegate } from "../../hooks/api/web3/dao/usePostDelegate";

const DaoProposalDetail: React.FC = () => {
  const router = useRouter();
  const { id: proposalId } = router.query as { id: string };
  const toast = useToast();
  const user = useAppSelector((state) => state.auth);
  const provider = useAppSelector((state) => state.provider);
  const jt = useAppSelector((state) => state.jt);
  const gc = useAppSelector((state) => state.gc);
  const [votes, setVotes] = useState<Array<any>>([]);
  const [proposalVotes, setProposalVotes] = useState<any>();
  const [hasVoted, setHasVoted] = useState<boolean>();
  const [delegatee, setDelegatee] = useState<string>("");
  const proposal = useMemo(() => {
    //console.log(gc.allProposals.data[0].proposalId, proposalId);
    return gc.allProposals.data?.find(
      (d: any) => d.proposalId.toString() === proposalId
    );
  }, [gc.allProposals.data]);

  const { width: windowWidth } = useWindowSize();

  const {} = useGetCastVotesHistory(
    provider.connection,
    gc.contract,
    proposalId,
    {
      onSuccess: (res) => {
        if (!res) return;
        console.log(res);
        setVotes(res);
      },
    }
  );

  const { refetch: refetchForProposalVotes } = useGetProposalVotes(
    gc.contract,
    proposalId,
    {
      onSuccess: (res) => {
        if (!res) return;
        setProposalVotes(res);
      },
    }
  );

  const { refetch: refectchHasVoted } = useGetHasVoted(
    gc.contract,
    proposalId,
    provider.account,
    {
      onSuccess: (res) => {
        setHasVoted(res);
      },
    }
  );

  const { refetch: refetchForDelegatee } = useGetJAELDelegatee(
    jt.contract,
    provider.account,
    {
      onSuccess: (res) => {
        if (!res) return;
        setDelegatee(res);
      },
    }
  );

  const { mutate: mutateDelegate, isLoading: isDelegating } = usePostDelegate({
    onSuccess: (res) => {
      toast({
        description: `Succeeded to delegate.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetchForDelegatee();
    },
  });

  const { mutate: mutateCastVote, isLoading: isVoting } = usePostCastVote({
    onSuccess: (res) => {
      toast({
        description: `Succeeded to cast vote.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetchForProposalVotes();
      refectchHasVoted();
    },
  });

  const castVote = useCallback(
    (support: CastSupport) =>
      mutateCastVote({
        connection: provider.connection,
        governor: gc.contract,
        proposalId,
        support,
      }),
    [gc.contract, mutateCastVote, proposalId, provider.connection]
  );

  useEffect(() => {
    subscribeToDAOEvents({
      governor: gc.contract,
      proposalId,
      setNewCastVoteSuccess: (res) => setVotes((state) => [...state, res]),
    });
  }, [gc.contract, proposalId]);

  const isSmallerThan578 = useMemo(() => {
    return windowWidth <= 578;
  }, [windowWidth]);
  const isSmallerThan768 = useMemo(() => {
    return windowWidth <= 768;
  }, [windowWidth]);
  const isSmallerThan912 = useMemo(() => {
    return windowWidth <= 912;
  }, [windowWidth]);
  const isSmallerThan912Larger768 = useMemo(() => {
    return windowWidth <= 912 && windowWidth > 768;
  }, [windowWidth]);

  return (
    <WholeBasicLayout
      styles={{
        display: "flex",
        flexDir: "column",
        //alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        margin: "0px",
      }}
      sideBarIs={!isSmallerThan578}
      headerIs={isSmallerThan578}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"32px"}
        px={"32px"}
        mt={!isSmallerThan578 ? "32px" : "64px"}
        color={"white"}
        h={"90vh"}
      >
        {/*<Box
          // display={"block"} // blockにすると親要素いっぱいに広がる
          display={"flex"}
          fontSize={"40px"}
          fontWeight={"semibold"}
          borderBottom={"1px solid #5F5F5F"}
          color={"white"}
          pb={"8px"}
        >
          <Text>{proposal.title}</Text>
    </Box>*/}
        <Box
          display={"flex"}
          flexDir={!isSmallerThan768 ? "row" : "column"}
          alignItems={!isSmallerThan768 ? "flex-start" : "center"}
          gap={"24px"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            maxW={"550px"}
            maxH={"100vh"}
            overflowY={"scroll"}
            mx={"auto"}
            flex={"1"}
            gap={"8px"}
          >
            <ReactMarkdown
              className={"markdown"} //TailWindCSSでスタイルがおかしくなるので、basic.cssでmarkdownクラスでは全てrevertされるようにした
              remarkPlugins={[remarkGfm]}
            >
              {proposal?.detail}
            </ReactMarkdown>
            {provider.account != delegatee ? (
              !isDelegating ? (
                <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                  <Text fontSize={"20px"} fontWeight={"semibold"}>
                    Vote form
                  </Text>
                  <Text
                    fontSize={"12px"}
                    fontWeight={"medium"}
                    color={"#C2C2C2"}
                  >
                    You want to vote? Before vote, you have to delegate yourself
                  </Text>
                  <Button
                    border={"1px solid #1893ff"}
                    bg={"transparent"}
                    color={"#1893ff"}
                    display={"block"}
                    onClick={() =>
                      mutateDelegate({
                        connection: provider.connection,
                        token: jt.contract,
                        account: provider.account,
                      })
                    }
                  >
                    Delegate
                  </Button>
                </Box>
              ) : (
                <Box mx={"auto"}>
                  <CircularProgress isIndeterminate color="green.300" />
                </Box>
              )
            ) : !hasVoted && Number(proposal?.state) == ProposalState.Active ? (
              !isVoting ? (
                <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                  <Text fontSize={"20px"} fontWeight={"semibold"}>
                    Vote form
                  </Text>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"32px"}
                  >
                    <Button
                      border={"1px solid #fe177f"}
                      bg={"transparent"}
                      color={"#fe177f"}
                      flex={1}
                      onClick={() => castVote(CastSupport.Against)}
                    >
                      Against
                    </Button>
                    <Button
                      border={"1px solid #00c314"}
                      bg={"transparent"}
                      color={"#00c314"}
                      flex={1}
                      onClick={() => castVote(CastSupport.For)}
                    >
                      Agree
                    </Button>
                    <Button
                      border={"1px solid #666666"}
                      bg={"transparent"}
                      color={"#666666"}
                      flex={1}
                      onClick={() => castVote(CastSupport.Abstain)}
                    >
                      Abstain
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box mx={"auto"}>
                  <CircularProgress isIndeterminate color="green.300" />
                </Box>
              )
            ) : (
              <></>
            )}

            <Box
              my={"16px"}
              display={"flex"}
              flexDir={"column"}
              w={"100%"}
              p={"16px"}
              borderRadius={"16px"}
              border={"0.5px solid #5F5F5F"}
              bg={"rgba(5, 14, 47, 0.4)"}
              overflowY={"auto"}
              flexShrink={0} // 潰れないように(デフォルトは1)
              maxH={"75vh"}
              mx={"auto"}
              gap={"12px"}
            >
              <Box
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                gap={"12px"}
                mb={"16px"}
              >
                <Text fontSize={"20px"} fontWeight={"medium"}>
                  Votes
                </Text>
                <Box
                  borderRadius={"16px"}
                  p={"4px"}
                  bg={"#737373"}
                  fontSize={"14px"}
                  fontWeight={"medium"}
                >
                  {votes.length}
                </Box>
              </Box>
              {uniqueArray(votes).map((v, i) => (
                <Box
                  key={i}
                  display={"flex"}
                  flexDir={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    gap={"8px"}
                    alignItems={"center"}
                    fontSize={"14px"}
                    fontWeight={"medium"}
                  >
                    <Blockies
                      seed={v.voter || "nfjablf"}
                      size={10}
                      scale={3}
                      color="#2187D0"
                      bgColor="#F1F2F9"
                      spotColor="#767F92"
                      className="identicon"
                    />
                    <Text color={"#C2C2C2"}>
                      {v.voter?.slice(0, 6) + "..." + v.voter?.slice(38, 42)}
                    </Text>
                  </Box>
                  <Text>
                    100% for{" "}
                    {v.support == CastSupport.Against
                      ? "No"
                      : v.support == CastSupport.For
                      ? `Yes`
                      : v.support == CastSupport.Abstain
                      ? "Abstain"
                      : ""}
                  </Text>
                  <Text>{putUnitToBigNum(v.weight)} VP</Text>
                </Box>
              ))}
              <Box
                w={"100%"}
                borderRadius={"16px"}
                py={"8px"}
                textAlign={"center"}
                border={"0.5px solid #5F5F5F"}
                _hover={{ opacity: 0.5 }}
                cursor={"pointer"}
                mt={"auto"}
              >
                <Icon
                  as={IoIosArrowDown}
                  w={"52px"}
                  h={"32px"}
                  color={"#C2C2C2"}
                />
              </Box>
            </Box>
          </Box>

          <Box display={"flex"} flexDir={"column"} gap={"16px"} pos={"sticky"}>
            <Box
              p={"24px"}
              borderRadius={"16px"}
              border={"0.5px solid #5F5F5F"}
              bg={"rgba(5, 14, 47, 0.4)"}
              w={"323px"}
              display={"flex"}
              flexDir={"column"}
              gap={"16px"}
            >
              <Text fontSize={"24px"} fontWeight={"bold"}>
                Info
              </Text>
              <Box display={"flex"} flexDir={"column"} gap={"8px"} w={"100%"}>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  fontSize={"16px"}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"semibold"} color={"#666666"}>
                    Voting system
                  </Text>
                  <Text fontWeight={"medium"} color={"#C2C2C2"}>
                    Weighted voting
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  fontSize={"16px"}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"semibold"} color={"#666666"}>
                    Status
                  </Text>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    gap={"8px"}
                    alignItems={"center"}
                  >
                    <Box
                      w={"12px"}
                      h={"12px"}
                      borderRadius={100}
                      bg={daoStateSelector(proposal?.state).color || "#84C19D"}
                    ></Box>
                    <Text fontWeight={"medium"} color={"#C2C2C2"}>
                      {daoStateSelector(proposal?.state).text === "Open"
                        ? "Ongoing"
                        : daoStateSelector(proposal?.state).text}
                    </Text>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  fontSize={"16px"}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"semibold"} color={"#666666"}>
                    Arweave
                  </Text>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    gap={"8px"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"medium"} color={"#C2C2C2"}>
                      {"#" +
                        proposal?.description
                          .replace(arweaveBaseUrl + "/", "")
                          ?.slice(0, 6) +
                        "..." +
                        proposal?.description
                          .replace(arweaveBaseUrl + "/", "")
                          ?.slice(39, 43)}
                    </Text>
                    <a
                      href={proposal?.description}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <Icon
                        as={BsBoxArrowUpRight}
                        w={"18px"}
                        h={"14px"}
                        color={"#C2C2C2"}
                        cursor={"pointer"}
                        _hover={{ opacity: 0.5 }}
                      />
                    </a>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  fontSize={"16px"}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"semibold"} color={"#666666"}>
                    Start date
                  </Text>
                  <Text fontWeight={"medium"} color={"#C2C2C2"}>
                    {moment
                      .unix(Number(proposal?.startedAt))
                      .format("h:mm:ssa d MMM D")}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  fontSize={"16px"}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"semibold"} color={"#666666"}>
                    End date
                  </Text>
                  <Text fontWeight={"medium"} color={"#C2C2C2"}>
                    {moment
                      .unix(Number(proposal?.endedAt))
                      .format("h:mm:ssa d MMM D")}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  fontSize={"16px"}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"semibold"} color={"#666666"}>
                    Block number
                  </Text>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    gap={"8px"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"medium"} color={"#C2C2C2"}>
                      {proposal?.blockNumber}
                    </Text>
                    <Icon
                      as={BsBoxArrowUpRight}
                      w={"18px"}
                      h={"14px"}
                      color={"#C2C2C2"}
                      cursor={"pointer"}
                      _hover={{ opacity: 0.5 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              p={"24px"}
              borderRadius={"16px"}
              border={"0.5px solid #5F5F5F"}
              bg={"rgba(5, 14, 47, 0.4)"}
              w={"323px"}
              display={"flex"}
              flexDir={"column"}
              gap={"16px"}
            >
              <Text fontSize={"24px"} fontWeight={"bold"}>
                Stats
              </Text>
              <Box display={"flex"} flexDir={"column"} gap={"8px"} w={"100%"}>
                <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    fontSize={"16px"}
                    fontWeight={"semibold"}
                    justifyContent={"space-between"}
                  >
                    <Text>Yes</Text>
                    <Text>
                      {putUnitToBigNum(proposalVotes?.forVotes)} VP{" "}
                      {(
                        (proposalVotes?.forVotes / proposalVotes?.total) *
                        100
                      ).toFixed(2)}
                      %
                    </Text>
                  </Box>
                  <Progress
                    value={
                      (proposalVotes?.forVotes / proposalVotes?.total) * 100
                    }
                    borderRadius={"8px"}
                    bg={"#363636"}
                  />
                </Box>
                <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    fontSize={"16px"}
                    fontWeight={"semibold"}
                    justifyContent={"space-between"}
                  >
                    <Text>Abstain</Text>
                    <Text>
                      {putUnitToBigNum(proposalVotes?.abstainVotes)} VP{" "}
                      {(
                        (proposalVotes?.abstainVotes / proposalVotes?.total) *
                        100
                      ).toFixed(2)}
                      %
                    </Text>
                  </Box>
                  <Progress
                    value={
                      (proposalVotes?.abstainVotes / proposalVotes?.total) * 100
                    }
                    borderRadius={"8px"}
                    bg={"#363636"}
                  />
                </Box>
                <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    fontSize={"16px"}
                    fontWeight={"semibold"}
                    justifyContent={"space-between"}
                  >
                    <Text>No</Text>
                    <Text>
                      {putUnitToBigNum(proposalVotes?.againstVotes)} VP{" "}
                      {(
                        (proposalVotes?.againstVotes / proposalVotes?.total) *
                        100
                      ).toFixed(2)}
                      %
                    </Text>
                  </Box>
                  <Progress
                    value={
                      (proposalVotes?.againstVotes / proposalVotes?.total) * 100
                    }
                    borderRadius={"8px"}
                    bg={"#363636"}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        position={"fixed"}
        bottom={"50px"}
        left={"30px"}
        bg={"#9E83EB"}
        filter={"auto"}
        blur={"150px"}
        width={200}
        h={150}
      ></Box>
    </WholeBasicLayout>
  );
};

export default DaoProposalDetail;
