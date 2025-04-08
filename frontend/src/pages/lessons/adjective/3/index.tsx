import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Container,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../../../components/layout/WholeLayout";
import { useMemo, useState } from "react";
import {
  CreateLessonProps,
  useAPIPostCreateLesson,
} from "../../../../hooks/api/lesson/useAPIPostCreateLesson";
import { useAppSelector } from "../../../../hooks/useGeneral";
import { useAPIGetLessons } from "../../../../hooks/api/lesson/useAPIGetLessons";
import { useAPIPostUpdateLesson } from "../../../../hooks/api/lesson/useAPIPostUpdateLesson";
import { useWindowSize } from "../../../../hooks/window/useWindow";
import { MdOutlineStar, MdSunny } from "react-icons/md";
import { IoLanguage, IoPlanet } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { LessonSection } from "../../../../types/types";

const Lesson2: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth);

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
              //h={"641px"}
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
                【Planet 3】
                <Text>
                  Comparative and superlative adjectives(形容詞の比較級と最上級)
                </Text>
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
                  Differences in the use of comparatives and superlatives
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked2}>
                  Basic of comparatives
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked3}>
                  Basic of superlatives
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
                  【Planet 3】 Comparative and superlative
                  adjectives(形容詞の比較級と最上級)
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
                    By using these expressions, you can compare things or
                    people, or emphasize that a particular thing is superior to
                    the rest. In this course, you will learn more about the
                    comparative and superlative classes of a-adjectives and
                    na-adjectives, and learn how to use them practically.
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
                    <Text fontSize={"20px"}>
                      1. Differences in the use of comparatives(比較級) and
                      superlatives(最上級)
                    </Text>
                    <Text fontSize={"20px"}>2. Basic of comparatives</Text>
                    <Text fontSize={"20px"}>3. Basic of superlatives</Text>
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
                      Differences in the use of comparatives and superlatives
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Learn the difference between the use of comparatives and
                    superlatives.
                  </Text>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        Comparatives(比較級)
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Used to compare two things or people.
                    </Text>
                  </Box>

                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        Superlatives(最上級)
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      It represents the best of three or more things or people.
                    </Text>
                  </Box>

                  {/*<Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        遠
                        <Box as={"span"} color={"#D271E1"}>
                          い
                        </Box>
                      </Text>
                      <Text>
                        遠
                        <Box as={"span"} color={"#D271E1"}>
                          かった
                        </Box>
                      </Text>
                      <Text>
                        遠
                        <Box as={"span"} color={"#D271E1"}>
                          くない
                        </Box>
                      </Text>
                      <Text>
                        遠
                        <Box as={"span"} color={"#D271E1"}>
                          くなかった
                        </Box>
                      </Text>
                    </Box>
        </Box>*/}
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
                      Basic of comparatives(比較級)
                    </Text>
                  </Box>

                  <Text fontSize={"20px"}>
                    Learn the basic formation of comparatives and how to use
                    them.
                    <Text>{` `}</Text>
                    <Box as={"span"} color={"#D271E1"}>
                      Basic meaning is `A is ~ than B`.
                    </Box>
                    <Text>{` `}</Text>
                    And in japanse, we often use
                    <Box as={"span"} color={"#D271E1"}>
                      `より` or `比べて` as `more`.
                    </Box>
                    <Text>{` `}</Text>
                    And, when you ask comparative question. We often say{" "}
                    <Box as={"span"} color={"#D271E1"}>
                      `どっちの方が〜`.
                    </Box>
                    <Text>{` `}</Text>
                    The basic japanese comparatives formats are below.
                  </Text>

                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        AはBより〜です
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Ex: 富士山は筑波山より高いです
                    </Text>
                  </Box>

                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        AよりBの方が〜です
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Ex: 筑波山より富士山の方が高いです
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        AはBと比べて〜です
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Ex: 富士山は筑波山と比べて高いです
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        どっちの方が〜ですか？(Question form)
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Ex: どっちの山の方が高いですか？ ➡️ 富士山の方が高いです
                    </Text>
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
                      Basic of superlatives(最上級)
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Learn the basic formation of superlatives and how to use
                    them.
                    <Text>{` `}</Text>
                    <Box as={"span"} color={"#D271E1"}>
                      Basic meaning is `A is the most ~ in B`.
                    </Box>
                    <Text>{` `}</Text>
                    And in japanse, we often use
                    <Box as={"span"} color={"#D271E1"}>
                      `一番` or `最も` as `the most`.
                    </Box>
                    <Text>{` `}</Text>
                    The basic japanese comparatives formats are below.
                  </Text>

                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        AはBで一番〜です
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Ex: 富士山は全ての山で一番高いです
                    </Text>
                  </Box>

                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        AはBで最も〜です
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      富士山は全ての山で最も高いです
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    //gap={"8px"}
                    pl={"16px"}
                  >
                    <Box
                      display={"flex"}
                      flexDir={"row"}
                      alignItems={"center"}
                      gap={"8px"}
                    >
                      <Icon
                        as={MdOutlineStar}
                        w={"24px"}
                        h={"24px"}
                        color={"#84C19D"}
                      ></Icon>
                      <Text fontWeight={"semibold"} fontSize={"20px"}>
                        最も〜なのは何ですか？(Question form)
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Ex: 最も高いのはどの山ですか？ ➡️ 富士山が最も高いです
                    </Text>
                  </Box>

                  {/*<Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          高い
                        </Box>
                        山 ➡️ 連体形(i-adjective)
                      </Text>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          静かな
                        </Box>
                        海 ➡️ 連体形(na-adjective)
                      </Text>
                      <Text>
                        早
                        <Box as={"span"} color={"#D271E1"}>
                          く
                        </Box>
                        起きる ➡️ 連用形(i-adjective)
                      </Text>
                      <Text>
                        簡単
                        <Box as={"span"} color={"#D271E1"}>
                          に
                        </Box>
                        作る ➡️ 連用形(na-adjective)
                      </Text>
                    </Box>
                  </Box>*/}
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
                query: { section: LessonSection.adjective, unit: 3 },
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

export default Lesson2;
