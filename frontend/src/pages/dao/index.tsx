import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../components/layout/WholeLayout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useGeneral";
import { useWindowSize } from "../../hooks/window/useWindow";
import { CircleImageIcon } from "../../components/common/CircleImageIcon";
import Blockies from "react-blockies";
import { IoIosArrowForward } from "react-icons/io";
import { CreateNewProposalModal } from "../../components/modal/web3/CreateNewProposalModal";
import { useFormik } from "formik";
import { createProposalSchema } from "../../utils/validation/schema";
import { useGetAccount } from "../../hooks/api/web3/useGetAccount";
import { useGetProvider } from "../../hooks/api/web3/useGetProvider";
import { useAPIGetNetwork } from "../../hooks/api/web3/useGetNetwork";
import { useGetJAELToken } from "../../hooks/api/web3/dao/useGetJAELToken";
import { useGetJAELBalance } from "../../hooks/api/web3/dao/useGetJAELBalance";
import { useGetGovernorContract } from "../../hooks/api/web3/dao/useGetGovernanceContract";
import { useGetAllProposals } from "../../hooks/api/web3/dao/useGetAllProposals";
import { usePostPropose } from "../../hooks/api/web3/dao/usePostPropose";
import { useAPIUploadNoteToArweave } from "../../hooks/api/web3/arweave/useAPIUploadNoteToArweave";
import { randomCharacters } from "../../utils/randomCharacters";
import { formikErrorMsgFactory } from "../../utils/factory/formikErrorMsgFactory";
import axios from "axios";
import { ProposalState } from "../../types/types";
import { daoStateSelector } from "../../utils/web3/daoStateSelector";
import moment from "moment";
import { useGetDelegateChanged } from "../../hooks/api/web3/dao/useGetDelegateChanged";
import getElapsedDateTime from "../../utils/getElapsedDateTime";
import { useGetCastVotesHistory } from "../../hooks/api/web3/dao/useGetCastVotesHistory";

const DaoProposalList: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const provider = useAppSelector((state) => state.provider);
  const jt = useAppSelector((state) => state.jt);
  const gc = useAppSelector((state) => state.gc);
  const [delegateChanges, setDelegateChanges] = useState<Array<any>>([]);
  const [voteCasts, setVoteCasts] = useState<Array<any>>([]);
  const disclosureForNewProposal = useDisclosure();

  const { width: windowWidth } = useWindowSize();

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

  const changeBlockchainNet = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          //chainId: "0xaa36a7", //'0xa' ネットのoptimism
          chainId: "0xa", //"0xaa36a7" sepolia
        },
      ],
    });
  };

  const {} = useGetProvider({
    onSuccess: (connection) => {
      dispatch({ type: "PROVIDER_LOADED", connection });
    },
  });

  const {} = useAPIGetNetwork(provider.connection, {
    onSuccess: (chainId) => {
      if (!chainId) return;
      dispatch({ type: "NETWORK_LOADED", chainId });
    },
  });

  const { refetch: refetchGetAccountAndBalance } = useGetAccount(
    provider.connection,
    {
      onSuccess: (res) => {
        if (!res) return;
        dispatch({ type: "ACCOUNT_LOADED", account: res.account });
        dispatch({ type: "BALANCE_LOADED", balance: res.balance });
      },
    }
  );

  const {} = useGetJAELToken(provider.connection, provider.chainId, {
    onSuccess: (res) => {
      if (!res) return;
      dispatch({
        type: "JAEL_TOKEN_LOADED",
        contract: res.contract,
        address: res.address,
        symbol: res.symbol,
        decimal: res.decimal,
      });
    },
  });

  const {} = useGetJAELBalance(jt.contract, provider.account, {
    onSuccess: (balance) => {
      if (!balance) return;
      dispatch({
        type: "JAEL_TOKEN_BALANCE",
        balance,
      });
    },
  });

  const {} = useGetGovernorContract(provider.connection, provider.chainId, {
    onSuccess: (res) => {
      if (!res) return;
      dispatch({
        type: "GC_LOADED",
        contract: res,
      });
    },
  });

  const { refetch: refetchAllPrposals } = useGetAllProposals(
    provider.connection,
    gc.contract,
    {
      onSuccess: async (res) => {
        if (!res) return;
        res = await Promise.all(
          res.map(async (v: any) => {
            let hasVoted =
              (await gc.contract?.hasVoted(v.proposalId, provider.account)) ||
              false;
            let state = await gc.contract.state(v.proposalId);
            console.log(
              state === BigInt(ProposalState.Defeated),
              state,
              ProposalState.Defeated,
              Number(state)
            );
            let proposedAt = (
              await provider.connection.getBlock(BigInt(v.blockNumber))
            ).timestamp;
            let preStartedAt = await provider.connection.getBlock(v.voteStart);
            let startedAt =
              preStartedAt?.timestamp ||
              ((Number(v.voteStart) - v.blockNumber) / 30) * 60 + proposedAt;
            //((Number(v.voteStart) - v.blockNumber) / 5) * 60 + proposedAt;
            // 実際に計測するとOptimismでは50400ブロックでちょうど28h ➡️ 1800ブロック/h
            let preEndedAt = await provider.connection.getBlock(v.voteEnd);
            let endedAt =
              preEndedAt?.timestamp ||
              ((Number(v.voteEnd) - v.blockNumber) / 30) * 60 + proposedAt;
            //console.log(startedAt, endedAt);
            let r = { data: { title: "", detail: "" } };
            try {
              r = await axios.get(v.description);
            } catch (e) {
              r.data.title = `...still loading`;
              r.data.detail = `...still loading`;
            }
            return {
              ...v,
              ...r.data,
              hasVoted,
              state,
              startedAt,
              endedAt,
              proposedAt,
            };
          })
        );
        console.log(res);
        dispatch({
          type: "PROPOSALS_LOADED",
          proposals: res,
        });
      },
    }
  );

  const {} = useGetDelegateChanged(provider.connection, jt.contract, {
    onSuccess: (res) => {
      if (!res) return;
      console.log(res);
      setDelegateChanges(res);
    },
  });

  const {} = useGetCastVotesHistory(provider.connection, gc.contract, "", {
    onSuccess: (res) => {
      if (!res) return;
      console.log(res);
      setVoteCasts(res);
    },
  });

  const txs = useMemo(() => {
    const proposals = gc.allProposals?.data?.length
      ? gc.allProposals?.data
      : [];
    return (
      [...voteCasts, ...proposals].sort(
        (a, b) => b.blockNumber - a.blockNumber
      ) || []
    );
  }, [gc.allProposals.data, voteCasts]);

  const stateNums = useMemo(() => {
    const proposals = gc.allProposals?.data?.length
      ? gc.allProposals?.data
      : [];
    return {
      open: proposals.filter(
        (p: any) => Number(p?.state) == ProposalState.Active
      ).length,
      pending: proposals.filter(
        (p: any) => Number(p?.state) == ProposalState.Pending
      ).length,
      rejected: proposals.filter(
        (p: any) =>
          Number(p?.state) == (ProposalState.Defeated || ProposalState.Canceled)
      ).length,
      succeeded: proposals.filter(
        (p: any) =>
          Number(p?.state) == (ProposalState.Succeeded || ProposalState.Queued)
      ).length,
      closed: proposals.filter(
        (p: any) => Number(p?.state) == ProposalState.Executed
      ).length,
    };
  }, [gc.allProposals.data]);

  /*const current = async () => {
    const res = await provider.connection.getBlockNumber();
    console.log(res);
    return res;
  };
  current();*/

  const { mutate: mutatePropose, isLoading: isProposing } = usePostPropose({
    onSuccess: (res) => {
      if (res) {
        toast({
          description: `Succeeded to creating proposals.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        resetFormForPropose();
        disclosureForNewProposal.onClose();
        refetchAllPrposals();
      }
    },
    onError: (err: any) => {
      toast({
        description: `Occured Error. \nDetail:${err.error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const uploadJsonToArweave = useAPIUploadNoteToArweave();
  const isProposalSubmitting = useMemo(() => {
    return isProposing || uploadJsonToArweave.isLoading;
  }, [isProposing, uploadJsonToArweave.isLoading]);

  const initialProposalValues = {
    title: "",
    detail: "",
    target: "0x0000000000000000000000000000000000000000",
    value: 0,
    calldata: "0x",
  };

  const {
    values: proposalInfo,
    setValues: setProposalInfo,
    handleSubmit: handleSubmitForPropose,
    resetForm: resetFormForPropose,
    errors: errorsForPropose,
    validateForm: validateFormForPropose,
  } = useFormik<any>({
    initialValues: initialProposalValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: createProposalSchema,
    onSubmit: async (value) => {
      //mutateLogin(loginInfo);
      const json = JSON.stringify({ title: value.title, detail: value.detail });
      uploadJsonToArweave.mutate(
        { json, name: randomCharacters(7) },
        {
          onSuccess: (uri) => {
            if (!uri) {
              toast({
                description: "Error occured.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              throw new Error();
            }
            mutatePropose({
              connection: provider.connection,
              governor: gc.contract,
              target: value.target,
              value: value.value,
              calldata: value.calldata,
              description: uri,
            });
          },
        }
      );
    },
  });

  const checkValidateErrors = useCallback(async () => {
    const errors = await validateFormForPropose();
    const messages = formikErrorMsgFactory(errors);
    if (messages) {
      return;
    } else {
      handleSubmitForPropose();
    }
  }, [handleSubmitForPropose, validateFormForPropose]);

  const connectHandler = () => {
    refetchGetAccountAndBalance();
  };

  useEffect(() => {
    changeBlockchainNet();

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", () => {
      refetchGetAccountAndBalance();
    });
  }, []);

  /*useEffect(() => {
    console.log(777);
    refetchAllPrposals();
  }, [gc?.contract, provider.connection, refetchAllPrposals]);*/

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
      sideBarIs={!isSmallerThan768}
      headerIs={isSmallerThan768}
    >
      <CreateNewProposalModal
        value={proposalInfo}
        errors={errorsForPropose}
        setForm={setProposalInfo}
        onSubmit={checkValidateErrors}
        disclosure={disclosureForNewProposal}
        isLoading={isProposalSubmitting}
      ></CreateNewProposalModal>
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"32px"}
        px={"32px"}
        mt={"32px"}
        color={"white"}
        h={"100vh"}
      >
        <Box
          // display={"block"} // blockにすると親要素いっぱいに広がる
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"40px"}
          fontWeight={"semibold"}
          borderBottom={"1px solid #5F5F5F"}
          pb={"8px"}
          mt={isSmallerThan768 ? "50px" : "0px"}
        >
          {!isSmallerThan768 && <Text>JAEL DAO Community</Text>}

          <Box
            ml={"auto"}
            display={"flex"}
            flexDir={"row"}
            h={"64px"}
            rounded={"16px"}
            bg={"#0d0c32"}
          >
            <Box
              flex={1}
              p={"auto"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"white"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"16px"}
              px={"24px"}
            >
              <Text fontSize={"12px"} color={"#747474"}>
                Balance
              </Text>
              <Text>
                {provider.balance ? Number(provider.balance).toFixed(4) : "..."}
              </Text>
            </Box>
            <Box
              flex={1}
              display={"flex"}
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"16px"}
              bg={"#858585"}
              rounded={"16px"}
              px={!isSmallerThan578 ? "24px" : "16px"}
              fontSize={!isSmallerThan578 ? "20px" : "14px"}
            >
              {provider.account ? (
                <Box fontWeight={"semibold"} color={"white"}>
                  {provider.account?.slice(0, 6) +
                    "..." +
                    provider.account?.slice(38, 42)}
                </Box>
              ) : (
                <Box
                  cursor={"pointer"}
                  fontWeight={"semibold"}
                  color={"white"}
                  rounded={"16px"}
                  _hover={{ color: "pink" }}
                  onClick={() => connectHandler()}
                >
                  Connect
                </Box>
              )}
              <Blockies
                seed={provider.account || "nfjablf"}
                size={!isSmallerThan578 ? 10 : 7}
                scale={3}
                color="#2187D0"
                bgColor="#F1F2F9"
                spotColor="#767F92"
                className="identicon"
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={!isSmallerThan768 ? "row" : "column"}
          alignItems={!isSmallerThan768 ? "flex-start" : "center"}
          gap={"24px"}
        >
          <Box display={"flex"} flexDir={"column"} flex={"1"} gap={"8px"}>
            <Box
              display={"flex"}
              flexDir={!isSmallerThan578 ? "row" : "column"}
              gap={"8px"}
            >
              <Button
                mr={"auto"}
                bg={"#7e6bff"}
                px={"8px"}
                py={"4px"}
                flexShrink={0}
                onClick={() => disclosureForNewProposal.onOpen()}
              >
                Propose
              </Button>
              <Box
                display={"flex"}
                flexDir={"row"}
                gap={"8px"}
                flexWrap={"wrap"}
              >
                <Box
                  px={"8px"}
                  py={"4px"}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={"12px"}
                  borderRadius={"8px"}
                  border={"0.3px solid #5F5F5F"}
                  bg={"#030C2A"}
                >
                  <Box
                    p={"4px"}
                    border={"0.2px solid #5F5F5F"}
                    borderRadius={"4px"}
                    fontSize={"10px"}
                    bg={"#000824"}
                  >
                    {stateNums.pending || 0}
                  </Box>
                  <Text fontSize={"12px"} color={"#EB9C02"}>
                    Pending
                  </Text>
                </Box>
                <Box
                  px={"8px"}
                  py={"4px"}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={"12px"}
                  borderRadius={"8px"}
                  border={"0.3px solid #5F5F5F"}
                  bg={"#030C2A"}
                >
                  <Box
                    p={"4px"}
                    border={"0.2px solid #5F5F5F"}
                    borderRadius={"4px"}
                    fontSize={"10px"}
                    bg={"#000824"}
                  >
                    {stateNums.open || 0}
                  </Box>
                  <Text fontSize={"12px"} color={"#84C19D"}>
                    Open
                  </Text>
                </Box>
                <Box
                  px={"8px"}
                  py={"4px"}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={"12px"}
                  borderRadius={"8px"}
                  border={"0.3px solid #5F5F5F"}
                  bg={"#030C2A"}
                >
                  <Box
                    p={"4px"}
                    border={"0.2px solid #5F5F5F"}
                    borderRadius={"4px"}
                    fontSize={"10px"}
                    bg={"#000824"}
                  >
                    {stateNums.rejected || 0}
                  </Box>
                  <Text fontSize={"12px"} color={"#EA2C65"}>
                    Rejected
                  </Text>
                </Box>
                <Box
                  px={"8px"}
                  py={"4px"}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={"12px"}
                  borderRadius={"8px"}
                  border={"0.3px solid #5F5F5F"}
                  bg={"#030C2A"}
                >
                  <Box
                    p={"4px"}
                    border={"0.2px solid #5F5F5F"}
                    borderRadius={"4px"}
                    fontSize={"10px"}
                    bg={"#000824"}
                  >
                    {stateNums.succeeded || 0}
                  </Box>
                  <Text fontSize={"12px"} color={"#CF84DB"}>
                    Succeeded
                  </Text>
                </Box>
                <Box
                  px={"8px"}
                  py={"4px"}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={"12px"}
                  borderRadius={"8px"}
                  border={"0.3px solid #5F5F5F"}
                  bg={"#030C2A"}
                >
                  <Box
                    p={"4px"}
                    border={"0.2px solid #5F5F5F"}
                    borderRadius={"4px"}
                    fontSize={"10px"}
                    bg={"#000824"}
                  >
                    {stateNums.closed || 0}
                  </Box>
                  <Text fontSize={"12px"} color={"#666666"}>
                    Close
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDir={"column"}
              overflowY={"auto"}
              h={"75vh"}
            >
              {gc.allProposals.data?.length &&
                gc.allProposals.data.map((v: any, i: number) => (
                  <Box
                    key={i}
                    display={"flex"}
                    flexDir={"column"}
                    p={"12px"}
                    gap={!isSmallerThan768 ? "16px" : "4px"}
                    borderBottom={"1px solid #5F5F5F"}
                    width={"100%"}
                    cursor={"pointer"}
                    onClick={() => router.push(`/dao/${v.proposalId}`)}
                  >
                    <Text fontSize={"20px"} fontWeight={"bold"} color={"white"}>
                      {v.title}
                    </Text>
                    <Box
                      display={"flex"}
                      flexDir={!isSmallerThan768 ? "row" : "column"}
                      alignItems={!isSmallerThan768 ? "center" : "flex-start"}
                      gap={"16px"}
                    >
                      <Box
                        display={"flex"}
                        flexDir={"row"}
                        alignItems={"center"}
                        gap={"16px"}
                      >
                        <Box
                          px={"8px"}
                          py={"4px"}
                          border={`2px solid ${
                            daoStateSelector(v.state).color
                          }`}
                          fontSize={"12px"}
                          fontWeight={"semibold"}
                          color={daoStateSelector(v.state).color}
                          borderRadius={"8px"}
                        >
                          {daoStateSelector(v.state).text}
                        </Box>

                        <Text
                          fontSize={"12px"}
                          color={"#C2C2C2"}
                          fontWeight={"medium"}
                        >
                          Proposer :
                        </Text>
                        <Box
                          display={"flex"}
                          flexDir={"row"}
                          gap={"8px"}
                          alignItems={"center"}
                        >
                          <Blockies
                            seed={v.proposer || "nfjablf"}
                            size={10}
                            scale={3}
                            color="#2187D0"
                            bgColor="#F1F2F9"
                            spotColor="#767F92"
                            className="identicon"
                          />
                          <Text
                            fontSize={"12px"}
                            fontWeight={"medium"}
                            color={"#C2C2C2"}
                          >
                            {!isSmallerThan768
                              ? v.proposer
                              : v.proposer.slice(0, 6) +
                                "..." +
                                v.proposer.slice(38, 42)}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        flexDir={"row"}
                        alignItems={"center"}
                        gap={"8px"}
                        ml={!isSmallerThan768 ? "auto" : "unset"}
                      >
                        <Text
                          fontSize={"12px"}
                          fontWeight={"medium"}
                          color={"#C2C2C2"}
                        >
                          End Date :
                        </Text>
                        <Text
                          fontSize={"12px"}
                          fontWeight={"medium"}
                          color={"#C2C2C2"}
                        >
                          {moment
                            .unix(Number(v.endedAt))
                            .format("h:mm:ssa d MMM D")}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box
            p={"24px"}
            borderRadius={"16px"}
            border={"1px solid #5F5F5F"}
            bg={"rgba(5, 14, 47, 0.4)"}
            w={"366px"}
            display={"flex"}
            flexDir={"column"}
            gap={"32px"}
          >
            <Box display={"flex"} flexDir={"column"} gap={"16px"}>
              <Box
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                w={"100%"}
                gap={"16px"}
              >
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  New members
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"} color={"#666666"}>
                  {delegateChanges.length}
                </Text>
                <Box ml={"auto"}>
                  <Icon
                    as={IoIosArrowForward}
                    w={"40px"}
                    h={"24px"}
                    color={"#BABABA"}
                    cursor={"pointer"}
                    _hover={{ opacity: 0.5 }}
                  />
                </Box>
              </Box>
              {delegateChanges[0]?.toDelegate && (
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  gap={"16px"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Blockies
                    seed={delegateChanges[0]?.toDelegate || "nfjablf"}
                    size={14}
                    scale={3}
                    color="#2187D0"
                    bgColor="#F1F2F9"
                    spotColor="#767F92"
                    className="identicon"
                  />
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    gap={"4px"}
                    mr={"auto"}
                  >
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {delegateChanges[0]?.toDelegate?.slice(0, 6) +
                        "..." +
                        delegateChanges[0]?.toDelegate?.slice(38, 42)}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      Delegated
                    </Text>
                  </Box>
                  <Box display={"flex"} flexDir={"column"} gap={"4px"}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {delegateChanges[0]?.delegatedAt &&
                        getElapsedDateTime(
                          new Date(delegateChanges[0]?.delegatedAt * 1000)
                        )}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                      textAlign={"end"}
                    >
                      {delegateChanges[0]?.delegatedAt &&
                        moment(
                          new Date(delegateChanges[0]?.delegatedAt * 1000)
                        ).format("hh:mm A")}
                    </Text>
                  </Box>
                </Box>
              )}
              {delegateChanges[1]?.toDelegate && (
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  gap={"16px"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Blockies
                    seed={delegateChanges[1]?.toDelegate || "nfjablf"}
                    size={14}
                    scale={3}
                    color="#2187D0"
                    bgColor="#F1F2F9"
                    spotColor="#767F92"
                    className="identicon"
                  />
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    gap={"4px"}
                    mr={"auto"}
                  >
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {delegateChanges[1]?.toDelegate?.slice(0, 6) +
                        "..." +
                        delegateChanges[1]?.toDelegate?.slice(38, 42)}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      Delegated
                    </Text>
                  </Box>
                  <Box display={"flex"} flexDir={"column"} gap={"4px"}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {getElapsedDateTime(
                        new Date(delegateChanges[1]?.delegatedAt * 1000)
                      )}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      {moment(
                        new Date(delegateChanges[1]?.delegatedAt * 1000)
                      ).format("hh:mm A")}
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>

            <Box display={"flex"} flexDir={"column"} gap={"16px"}>
              <Box
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                w={"100%"}
                gap={"16px"}
              >
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  New transactions
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"} color={"#666666"}>
                  {txs.length}
                </Text>
                <Box ml={"auto"}>
                  <Icon
                    as={IoIosArrowForward}
                    w={"40px"}
                    h={"24px"}
                    color={"#BABABA"}
                    cursor={"pointer"}
                    _hover={{ opacity: 0.5 }}
                  />
                </Box>
              </Box>
              {txs[0] && (
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  gap={"16px"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Blockies
                    seed={txs[0].proposer || txs[0].voter || "nfjablf"}
                    size={14}
                    scale={3}
                    color="#2187D0"
                    bgColor="#F1F2F9"
                    spotColor="#767F92"
                    className="identicon"
                  />
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    gap={"4px"}
                    mr={"auto"}
                  >
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {(txs[0].proposer || txs[0].voter)?.slice(0, 6) +
                        "..." +
                        (txs[0].proposer || txs[0].voter)?.slice(38, 42)}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      {txs[0].proposer ? "Proposed" : "Voted"}
                    </Text>
                  </Box>
                  <Box display={"flex"} flexDir={"column"} gap={"4px"}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {getElapsedDateTime(
                        new Date((txs[0]?.proposedAt || txs[0]?.votedAt) * 1000)
                      )}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      {moment(
                        new Date((txs[0]?.proposedAt || txs[0]?.votedAt) * 1000)
                      ).format("hh:mm A")}
                    </Text>
                  </Box>
                </Box>
              )}

              {txs[1] && (
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  gap={"16px"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Blockies
                    seed={txs[1].proposer || txs[1].voter || "nfjablf"}
                    size={14}
                    scale={3}
                    color="#2187D0"
                    bgColor="#F1F2F9"
                    spotColor="#767F92"
                    className="identicon"
                  />
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    gap={"4px"}
                    mr={"auto"}
                  >
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {(txs[1].proposer || txs[1].voter)?.slice(0, 6) +
                        "..." +
                        (txs[1].proposer || txs[1].voter)?.slice(38, 42)}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      {txs[1].proposer ? "Proposed" : "Voted"}
                    </Text>
                  </Box>
                  <Box display={"flex"} flexDir={"column"} gap={"4px"}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#C2C2C2"}
                    >
                      {getElapsedDateTime(
                        new Date((txs[1]?.proposedAt || txs[1]?.votedAt) * 1000)
                      )}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"#666666"}
                    >
                      {moment(
                        new Date((txs[1]?.proposedAt || txs[1]?.votedAt) * 1000)
                      ).format("hh:mm A")}
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>

            <Box display={"flex"} flexDir={"column"} gap={"16px"}>
              <Box
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                w={"100%"}
                gap={"16px"}
              >
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  Top GT holders
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"} color={"#666666"}>
                  12
                </Text>
                <Box ml={"auto"}>
                  <Icon
                    as={IoIosArrowForward}
                    w={"40px"}
                    h={"24px"}
                    color={"#BABABA"}
                    cursor={"pointer"}
                    _hover={{ opacity: 0.5 }}
                  />
                </Box>
              </Box>
              <Grid templateColumns="repeat(4, 2fr)" gap={"8px"} w={"100%"}>
                {[...Array(8)].map((v, i) => (
                  <GridItem key={v}>
                    <Box
                      display={"flex"}
                      flexDir={"column"}
                      gap={"4px"}
                      alignItems={"center"}
                    >
                      <Blockies
                        seed={"nfjablf"}
                        size={14}
                        scale={3}
                        color="#2187D0"
                        bgColor="#F1F2F9"
                        spotColor="#767F92"
                        className="identicon"
                      />
                      <Text
                        fontSize={"12px"}
                        fontWeight={"medium"}
                        color={"#666666"}
                      >
                        0xaa...bben
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
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

export default DaoProposalList;
