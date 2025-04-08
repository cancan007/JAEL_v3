import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../../../components/layout/WholeLayout";
import { useMemo, useState } from "react";
import { useWindowSize } from "../../../../hooks/window/useWindow";
import { MdSunny } from "react-icons/md";
import { IoLanguage, IoPlanet } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { LessonSection } from "../../../../types/types";

const LessonList: React.FC = () => {
  const router = useRouter();

  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [isChecked3, setIsChecked3] = useState<boolean>(false);

  const percentageOfChecked = useMemo(() => {
    return Math.round(
      ((Number(isChecked1) + Number(isChecked2) + Number(isChecked3)) / 3) * 100
    );
  }, [isChecked1, isChecked2, isChecked3]);

  const isCompleted = useMemo(() => {
    return isChecked1 && isChecked2 && isChecked3;
  }, [isChecked1, isChecked2, isChecked3]);

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
      sideBarIs={false}
      headerIs={false}
    >
      <Box p={0} display={"flex"} flexDir={"column"} w={"100%"}>
        <Box p={0} display={"flex"} flexDir={"row"} w={"100%"} gap={"32px"}>
          {!isSmallerThan912 && (
            <Box
              display={"flex"}
              flexDir={"column"}
              ml={"64px"}
              mt={"80px"}
              w={"323px"}
              h={"641px"}
              border={"1px solid #5F5F5F"}
              bg={"rgba(84, 84, 84, 0.3)"}
              color={"white"}
              p={"32px"}
              gap={"8px"}
              rounded={"16px"}
            >
              <Box
                py={"32px"}
                fontSize={"20px"}
                fontWeight={"semibold"}
                borderBottom={"1px solid #736666"}
              >
                【Planet 1】
                <Text>Classification and Negative conjugation of verb</Text>
              </Box>
              <Box alignSelf={"center"} py={"32px"}>
                <CircularProgress
                  size={"200px"}
                  value={percentageOfChecked}
                  color="green.400"
                >
                  <CircularProgressLabel>{`${percentageOfChecked}%`}</CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"flex-end"}
                w={"100%"}
                flex={1}
                borderTop={"1px solid #736666"}
                py={"32px"}
              >
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked1}>
                  What is the role of verb?
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked2}>
                  Classification of verbs
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked3}>
                  Conjugation of negative verbs
                </Checkbox>
              </Box>
            </Box>
          )}
          <Box
            p={0}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            w={!isSmallerThan912 ? "60%" : "100%"}
            h={"120vh"}
            m={0}
            overflowY={"scroll"}
            //mt={"64px"}
          >
            <Box
              display={"flex"}
              flexDir={"column"}
              mt={"80px"}
              w={!isSmallerThan768 ? "100%" : "80%"}
              border={"1px solid #5F5F5F"}
              bg={"rgba(84, 84, 84, 0.3)"}
              color={"white"}
              p={"32px"}
              gap={"32px"}
              rounded={"16px"}
            >
              <Box
                display={"flex"}
                flexDir={!isSmallerThan768 ? "row" : "column"}
                alignItems={"center"}
                gap={"32px"}
              >
                <Box
                  w={"160px"}
                  h={"160px"}
                  rounded={100}
                  bg={"rgba(172, 255, 196, 0.3)"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Icon
                    as={IoLanguage}
                    w={"70px"}
                    h={"70px"}
                    color={"rgba(172, 255, 196, 0.6)"}
                  />
                </Box>

                <Text fontSize={"36px"} fontWeight={"semibold"}>
                  【Planet 1】 Classification and Negative conjugation of verb
                </Text>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                w={"100%"}
                rounded={"16px"}
                border={"3px solid #84C19D"}
                p={"32px"}
                gap={"32px"}
              >
                <Box display={"flex"} flexDir={"column"} gap={"16px"}>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"8px"}
                    color={"#84C19D"}
                  >
                    <Icon as={IoIosRocket} w={"35px"} h={"35px"} />
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Why should you adventure on this planet?
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Verbs are important words that tell us exactly what
                    movements and actions happen at various times. And when the
                    subject and verb match, your sentences will be much easier
                    to understand. Remember this, and you will be able to speak
                    better!
                  </Text>
                </Box>
                <Box display={"flex"} flexDir={"column"} gap={"16px"}>
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"8px"}
                    color={"#84C19D"}
                  >
                    <Icon as={IoPlanet} w={"35px"} h={"35px"} />
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      What will you learn on this planet?
                    </Text>
                  </Box>
                  <Box display={"flex"} flexDir={"column"}>
                    <Text fontSize={"20px"}>1. What is the role of verb?</Text>
                    <Text fontSize={"20px"}>2. Classification of verbs</Text>
                    <Text fontSize={"20px"}>
                      3. Conjugation of negative verbs
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box border={"1px solid #736666"} mt={"32px"}></Box>
              <Box display={"flex"} flexDir={"column"} gap={"64px"}>
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  py={"32px"}
                  gap={"48px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"16px"}
                  >
                    <Icon
                      as={MdSunny}
                      w={"32px"}
                      h={"32px"}
                      color={"#84C19D"}
                    />
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      What is the role of verb?
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    The verb always comes at the end of the clause.
                    Grammatically, a verb or state of being is necessary to form
                    a complete sentence. Conversely, a verb alone can form a
                    sentence.
                  </Text>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        私は魚を
                        <Box as={"span"} color={"#D271E1"}>
                          食べる
                        </Box>
                        。
                      </Text>
                      <Text>
                        あなたは
                        <Box as={"span"} color={"#D271E1"}>
                          医者です
                        </Box>
                        。
                      </Text>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          買った
                        </Box>
                        。
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={!isSmallerThan578 ? "row" : "column"}
                  alignItems={"center"}
                  rounded={"16px"}
                  bg={"#050E2F"}
                  p={"32px"}
                  gap={"40px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    flex={1}
                    borderRight={
                      !isSmallerThan578 ? "1px solid #736666" : "none"
                    }
                  >
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Confirmation of understanding
                    </Text>
                    <Text fontSize={"20px"}>
                      If you understand this content well, click check button.
                    </Text>
                  </Box>

                  <Button
                    fontSize={"20px"}
                    fontWeight={"semibold"}
                    px={"40px"}
                    py={"12px"}
                    rounded={"16px"}
                    color={isChecked1 ? "#1C2239" : "#84C19D"}
                    border={"3px solid #84C19D"}
                    bg={isChecked1 ? "#84C19D" : "#1C2239"}
                    onClick={() => setIsChecked1(!isChecked1)}
                  >
                    Check
                  </Button>
                </Box>
              </Box>
              <Box border={"1px solid #736666"} mt={"32px"}></Box>
              <Box display={"flex"} flexDir={"column"} gap={"64px"}>
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  py={"32px"}
                  gap={"48px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"16px"}
                  >
                    <Icon
                      as={MdSunny}
                      w={"32px"}
                      h={"32px"}
                      color={"#84C19D"}
                    />
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Classification into ru-verb and u-verb
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    All ru-verbs end in “る”. And all u-verbs end with the u
                    vowel (including “ru”). Therefore, verbs ending in “ru” are
                    classified as u-verbs when the vowel before the ending is
                    “a, u, o” and as r-verbs when the vowel before the ending is
                    “i, e”.
                  </Text>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        投
                        <Box as={"span"} color={"#D271E1"}>
                          げ
                        </Box>
                        る ➡️ げ is a “e” vowel so it's a ru-verb.
                      </Text>
                      <Text>
                        分
                        <Box as={"span"} color={"#D271E1"}>
                          か
                        </Box>
                        る ➡️ か is "a" vowel so it is a u-verb.
                      </Text>
                      <Text>
                        書
                        <Box as={"span"} color={"#D271E1"}>
                          く
                        </Box>{" "}
                        ➡️ end in く, it is not る. so it is a u-verb.
                      </Text>
                    </Box>
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>ru-verb</Th>
                            <Th>u-verb</Th>
                            <Th>exception</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>食べる</Td>
                            <Td>触る</Td>
                            <Td>する</Td>
                          </Tr>
                          <Tr>
                            <Td>考える</Td>
                            <Td>貸す</Td>
                            <Td>来る</Td>
                          </Tr>
                          <Tr>
                            <Td>起きる</Td>
                            <Td>泳ぐ</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>着る</Td>
                            <Td>話す</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>いる</Td>
                            <Td>買う</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>出る</Td>
                            <Td>飲む</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>教える</Td>
                            <Td>遊ぶ</Td>
                            <Td></Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={!isSmallerThan578 ? "row" : "column"}
                  alignItems={"center"}
                  rounded={"16px"}
                  bg={"#050E2F"}
                  p={"32px"}
                  gap={"40px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    flex={1}
                    borderRight={
                      !isSmallerThan578 ? "1px solid #736666" : "none"
                    }
                  >
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Confirmation of understanding
                    </Text>
                    <Text fontSize={"20px"}>
                      If you understand this content well, click check button.
                    </Text>
                  </Box>

                  <Button
                    fontSize={"20px"}
                    fontWeight={"semibold"}
                    px={"40px"}
                    py={"12px"}
                    rounded={"16px"}
                    color={isChecked2 ? "#1C2239" : "#84C19D"}
                    border={"3px solid #84C19D"}
                    bg={isChecked2 ? "#84C19D" : "#1C2239"}
                    onClick={() => setIsChecked2(!isChecked2)}
                  >
                    Check
                  </Button>
                </Box>
              </Box>
              <Box border={"1px solid #736666"} mt={"32px"}></Box>
              <Box display={"flex"} flexDir={"column"} gap={"64px"}>
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  py={"32px"}
                  gap={"48px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"16px"}
                  >
                    <Icon
                      as={MdSunny}
                      w={"32px"}
                      h={"32px"}
                      color={"#84C19D"}
                    />
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Conjugation of negative verbs
                    </Text>
                  </Box>
                  <UnorderedList fontSize={"20px"}>
                    <ListItem>
                      ru-verb: Remove the ending る and add ない.
                    </ListItem>
                    <ListItem>
                      u-verb(ending う): Remove the う at the end of a word and
                      add わない.
                    </ListItem>
                    <ListItem>
                      u-verb(other than above): Change the u vowel at the end of
                      a word to an a vowel and add ない.
                    </ListItem>
                  </UnorderedList>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>ru-verb</Th>
                            <Th>u-verb</Th>
                            <Th>exception</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>食べる ➡️ 食べない</Td>
                            <Td>触る ➡️ 触らない</Td>
                            <Td>する ➡️ しない</Td>
                          </Tr>
                          <Tr>
                            <Td>考える ➡️ 考えない</Td>
                            <Td>貸す ➡️ 貸さない</Td>
                            <Td>来る ➡️ こない</Td>
                          </Tr>
                          <Tr>
                            <Td>起きる ➡️ 起きない</Td>
                            <Td>泳ぐ ➡️ 泳がない</Td>
                            <Td>ある ➡️ ない</Td>
                          </Tr>
                          <Tr>
                            <Td>着る ➡️ 着ない</Td>
                            <Td>話す ➡️ 話さない</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>いる ➡️ いない</Td>
                            <Td>買う ➡️ 買わない</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>出る ➡️ 出ない</Td>
                            <Td>飲む ➡️ 飲まない</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>教える ➡️ 教えない</Td>
                            <Td>遊ぶ ➡️ 遊ばない</Td>
                            <Td></Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        サムは食べ
                        <Box as={"span"} color={"#D271E1"}>
                          ない
                        </Box>
                        。
                      </Text>
                      <Text>
                        ジョーは泳
                        <Box as={"span"} color={"#D271E1"}>
                          がない
                        </Box>
                        。
                      </Text>
                      <Text>
                        算数を教え
                        <Box as={"span"} color={"#D271E1"}>
                          ない
                        </Box>
                        。
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDir={!isSmallerThan578 ? "row" : "column"}
                  alignItems={"center"}
                  rounded={"16px"}
                  bg={"#050E2F"}
                  p={"32px"}
                  gap={"40px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    flex={1}
                    borderRight={
                      !isSmallerThan578 ? "1px solid #736666" : "none"
                    }
                  >
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Confirmation of understanding
                    </Text>
                    <Text fontSize={"20px"}>
                      If you understand this content well, click check button.
                    </Text>
                  </Box>

                  <Button
                    fontSize={"20px"}
                    fontWeight={"semibold"}
                    px={"40px"}
                    py={"12px"}
                    rounded={"16px"}
                    color={isChecked3 ? "#1C2239" : "#84C19D"}
                    border={"3px solid #84C19D"}
                    bg={isChecked3 ? "#84C19D" : "#1C2239"}
                    onClick={() => setIsChecked3(!isChecked3)}
                  >
                    Check
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          my={"64px"}
          display={"flex"}
          flexDir={"column"}
          alignSelf={"center"}
          alignItems={"center"}
          rounded={"16px"}
          border={"1px solid #5F5F5F"}
          bg={"rgba(84, 84, 84, 0.3)"}
          color={"white"}
          w={"80%"}
          py={"48px"}
          gap={"48px"}
        >
          <Text fontSize={"24px"}>
            Thank you for your hard work! Take the confirmation test at the end!
          </Text>
          <Box
            as={"button"}
            fontSize={"20px"}
            fontWeight={"semibold"}
            disabled={!isCompleted}
            _disabled={{
              bg: "#6f6a6a",
              border: "3px solid #6f6a6a",
              color: "#313131",
              cursor: "default",
            }}
            cursor={"pointer"}
            px={"80px"}
            py={"12px"}
            rounded={"16px"}
            color={"#84C19D"}
            border={"3px solid #84C19D"}
            bg={"#1C2239"}
            onClick={() => {
              router.push({
                pathname: "/lessons/test",
                query: { section: LessonSection.verbConjugation, unit: 1 },
              });
            }}
          >
            Start Test
          </Box>
        </Box>
      </Box>
    </WholeBasicLayout>
  );
};

export default LessonList;
