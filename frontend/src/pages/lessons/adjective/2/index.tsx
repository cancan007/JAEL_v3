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
                【Planet 2】<Text>Conjugation of Adjectives</Text>
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
                  Conjugation of i-adjectives
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked2}>
                  Conjugation of na-adjectives
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked3}>
                  Advanced conjugation
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
                  【Planet 2】 Conjugation of Adjectives
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
                    You will learn the basic conjugated forms of adjectives.
                    There are four main forms of adjective conjugation: present
                    tense, past tense, negative tense, and negative past tense.
                    Each conjugated form is used in different situations and
                    serves to enrich the nuances of writing and speaking.
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
                      1. Conjugation of i-adjectives
                    </Text>
                    <Text fontSize={"20px"}>
                      2. Conjugation of na-adjectives
                    </Text>
                    <Text fontSize={"20px"}>3. Advanced conjugation</Text>
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
                      Conjugation of i-adjectives
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Learn the basic conjugated forms of i-adjectives.
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
                        Present tense(現在形): 〜い
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Keep the ”い” at the end of the word.
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
                        Past tense(過去形): 〜かった
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”い” at the end of a word and add ”かった”.
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
                        Negative tense(否定形): 〜くない
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”い” at the end of a word and add ”くない”.
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
                        Negative past tense(過去否定形): 〜くなかった
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”い” at the end of a word and add ”くなかった”.
                    </Text>
                  </Box>

                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
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
                      Conjugation of na-adjectives
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Learn the basic conjugated forms of na-adjectives.
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
                        Present tense(現在形): 〜だ / 〜です
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”な” at the end of a word and add ”だ” or
                      ”です”.
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
                        Past tense(過去形): 〜だった / 〜でした
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”な” at the end of a word and add ”だった” or
                      ”でした”.
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
                        Negative tense(否定形): 〜ではない / 〜じゃない
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”な” at the end of a word and add ”ではない” or
                      ”じゃない”.
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
                        Negative past tense(過去否定形): 〜ではなかった /
                        〜じゃなかった
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Remove the ”な” at the end of a word and add
                      ”ではなかった” / ”じゃなかった”.
                    </Text>
                  </Box>

                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        静か
                        <Box as={"span"} color={"#D271E1"}>
                          だ
                        </Box>
                      </Text>
                      <Text>
                        静か
                        <Box as={"span"} color={"#D271E1"}>
                          だった
                        </Box>
                      </Text>
                      <Text>
                        静か
                        <Box as={"span"} color={"#D271E1"}>
                          ではない
                        </Box>
                      </Text>
                      <Text>
                        静か
                        <Box as={"span"} color={"#D271E1"}>
                          ではなかった
                        </Box>
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
                      Advanced conjugation
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    You will learn attributive form(連体形) and conjucative
                    form(連用形) of adjectives.
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
                        Attributive form(連体形)
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      This form is used when an adjective modifies a noun.
                      Understanding the conjunctive forms of i-adjectives and
                      na-adjectives will help you to create sentences that
                      describe nouns in detail and allow you to be more
                      specific.
                      <Box as={"span"} color={"#D271E1"}>
                        {" "}
                        It has the same form as the basic adjective form{" "}
                      </Box>
                      and is used directly before the noun.
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
                        Conjucative form(連用形)
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      They are used to link verbs, other adjectives, and adverbs
                      to expand their role in a sentence. The use of the
                      conjunctive form allows adjectives to be more expressive
                      and to compose more complex sentences and conversations.
                      In i-adjectives, change the ending of
                      <Box as={"span"} color={"#D271E1"}>
                        {" "}
                        ”い” to ”く”{" "}
                      </Box>
                      . In na-adjectives, change the ending of{" "}
                      <Box as={"span"} color={"#D271E1"}>
                        {" "}
                        ”な” to ”に”{" "}
                      </Box>
                      .
                    </Text>
                  </Box>

                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
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
                query: { section: LessonSection.adjective, unit: 2 },
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
