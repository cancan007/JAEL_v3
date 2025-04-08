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

const Lesson1: React.FC = () => {
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
                【Planet 1】<Text>Adjective Basics</Text>
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
                  What is adjective?
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked2}>
                  Difference between i-adjectives and na-adjectives
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked3}>
                  Basic usage of adjective
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
                  【Planet 1】 Adjective Basics
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
                    Adjectives are important elements that detail the properties
                    and status of nouns. Learning the basics will make your
                    daily conversation and writing richer and more expressive.
                    When you are able to use adjectives correctly, you will be
                    able to accurately convey your feelings and thoughts, and
                    your understanding of Japanese and your communication skills
                    will improve dramatically.
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
                    <Text fontSize={"20px"}>1. What is adjective?</Text>
                    <Text fontSize={"20px"}>
                      2. Difference between i-adjectives and na-adjectives
                    </Text>
                    <Text fontSize={"20px"}>3. Basic usage of adjective</Text>
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
                      What is adjective?
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Adjectives are words that modify a noun to describe its
                    nature or condition. They are placed before a noun to
                    indicate specifically what the noun is about.
                  </Text>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          高い
                        </Box>
                        山
                      </Text>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          美しい
                        </Box>
                        花
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
                      Difference between i-adjectives and na-adjectives
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    This is the difficult part, the u-verbs must be further
                    classified into four categories. The classification is based
                    on the letter at the end of the u-verb.
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
                        i-adjective
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      An adjective ending in ”い”. Can stand on its own and come
                      at the end of a sentence.
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
                        na-adjective
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      An adjective ending in ”な”. It is necessary to add ”な”
                      when coming before a noun. (Some na-adjectives also end in
                      ”い”, but most of them are written entirely in kanji.
                      exception: 嫌い)
                    </Text>
                  </Box>

                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        高
                        <Box as={"span"} color={"#D271E1"}>
                          い
                        </Box>
                        ➡️ ending in ”い” ➡️
                        <Box as={"span"} color={"#D271E1"}>
                          i-adjective
                        </Box>
                      </Text>
                      <Text>
                        静か
                        <Box as={"span"} color={"#D271E1"}>
                          な
                        </Box>
                        ➡️ ending in ”な” ➡️
                        <Box as={"span"} color={"#D271E1"}>
                          na-adjective
                        </Box>
                      </Text>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          綺麗
                        </Box>{" "}
                        ➡️ ending in ”い”, but written in kanji ➡️
                        <Box as={"span"} color={"#D271E1"}>
                          na-adjective
                        </Box>{" "}
                      </Text>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          いい
                        </Box>{" "}
                        ➡️ exception: conjugation is completely different from
                        others
                      </Text>
                    </Box>
                  </Box>
                  <TableContainer maxH={"350px"} overflowY={"scroll"}>
                    <Table variant={"simple"}>
                      <Thead position="sticky" top={0} zIndex="docked">
                        <Tr>
                          <Th>i-adjective</Th>
                          <Th>na-adjective</Th>
                          <Th>exception</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>大きい</Td>
                          <Td>綺麗な</Td>
                          <Td>いい</Td>
                        </Tr>
                        <Tr>
                          <Td>小さい</Td>
                          <Td>有名な</Td>
                          <Td>かっこいい</Td>
                        </Tr>
                        <Tr>
                          <Td>新しい</Td>
                          <Td>便利な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>古い</Td>
                          <Td>元気な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>悪い</Td>
                          <Td>好きな</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>高い</Td>
                          <Td>静かな</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>低い</Td>
                          <Td>親切な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>暑い</Td>
                          <Td>簡単な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>寒い</Td>
                          <Td>大切な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>面白い</Td>
                          <Td>安全な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>つまらない</Td>
                          <Td>嫌いな</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>楽しい</Td>
                          <Td>丁寧な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>難しい</Td>
                          <Td>有能な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>優しい</Td>
                          <Td>必要な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>忙しい</Td>
                          <Td>上手な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>暖かい</Td>
                          <Td>下手な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>涼しい</Td>
                          <Td>有用な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>強い</Td>
                          <Td>快適な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>弱い</Td>
                          <Td>独特な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>速い</Td>
                          <Td>穏やかな</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>遅い</Td>
                          <Td>重要な</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>美しい</Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>汚い</Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td>厳しい</Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
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
                      Basic usage of adjective
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    An adjective directly modifies a noun immediately before it,
                    but a clause of a sentence can also be thought of as a
                    single noun.
                  </Text>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          暖かい
                        </Box>
                        気候
                      </Text>
                      <Text>
                        <Box as={"span"} color={"#D271E1"}>
                          大きい
                        </Box>
                        駅前にあるビル
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
                query: { section: LessonSection.adjective, unit: 1 },
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

export default Lesson1;
