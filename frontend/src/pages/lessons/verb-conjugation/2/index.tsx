import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../../../components/layout/WholeLayout";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../../../hooks/useGeneral";
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
                【Planet 2】<Text>Past tense conjugation of verb</Text>
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
                  Past tense of ru-verbs
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked2}>
                  Past tense of u-verbs
                </Checkbox>
                <Checkbox colorScheme="green" isReadOnly isChecked={isChecked3}>
                  Past tense of the negative verbs
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
                  【Planet 2】 Past tense conjugation of verb
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
                    The past tense conjugation of verbs studied here is the most
                    difficult part of the Japanese language. It is explained for
                    each verb category.
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
                    <Text fontSize={"20px"}>1. Past tense of ru-verbs</Text>
                    <Text fontSize={"20px"}>2. Past tense of u-verbs</Text>
                    <Text fontSize={"20px"}>
                      3. Past tense of the negative verbs
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
                      Past tense of ru-verbs
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    Just keep this one thing in your mind. Change the ending
                    ”る” to ”た”
                  </Text>
                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        出
                        <Box as={"span"} color={"#D271E1"}>
                          る
                        </Box>
                        ➡️ 出
                        <Box as={"span"} color={"#D271E1"}>
                          た
                        </Box>
                      </Text>
                      <Text>
                        まね
                        <Box as={"span"} color={"#D271E1"}>
                          る
                        </Box>
                        ➡️ まね
                        <Box as={"span"} color={"#D271E1"}>
                          た
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
                      Past tense of u-verbs
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
                        When the ending is ”す”
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Change ”す” to ”した”
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
                        When the ending is ”く”,”ぐ”
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Change ”く” to ”いた” and ”ぐ” to ”いだ”
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
                        When the ending is ”む”,”ぶ”or ”ぬ”
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Change the ending to ”んだ”
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
                        When the word ends in ”る”,”う” or ”つ”
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      Change the ending to ”った”
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
                        Exceptions
                      </Text>
                    </Box>
                    <Text fontSize={"20px"} pl={"36px"}>
                      する➡️した, くる➡️きた, 行く➡️行った
                    </Text>
                  </Box>

                  <Box display={"flex"} flexDir={"column"} gap={"8px"}>
                    <Text fontSize={"24px"} fontWeight={"semibold"}>
                      Example:
                    </Text>
                    <Box display={"flex"} flexDir={"column"} fontSize={"20px"}>
                      <Text>
                        貸
                        <Box as={"span"} color={"#D271E1"}>
                          す
                        </Box>
                        ➡️ 貸
                        <Box as={"span"} color={"#D271E1"}>
                          した
                        </Box>
                      </Text>
                      <Text>
                        書
                        <Box as={"span"} color={"#D271E1"}>
                          く
                        </Box>
                        ➡️ 書
                        <Box as={"span"} color={"#D271E1"}>
                          いた
                        </Box>
                      </Text>
                      <Text>
                        飲
                        <Box as={"span"} color={"#D271E1"}>
                          む
                        </Box>{" "}
                        ➡️ 飲
                        <Box as={"span"} color={"#D271E1"}>
                          んだ
                        </Box>{" "}
                      </Text>
                      <Text>
                        刷
                        <Box as={"span"} color={"#D271E1"}>
                          る
                        </Box>{" "}
                        ➡️ 擦
                        <Box as={"span"} color={"#D271E1"}>
                          った
                        </Box>{" "}
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
                            <Td>食べる ➡️ 食べた</Td>
                            <Td>触る ➡️ 触った</Td>
                            <Td>する ➡️ した</Td>
                          </Tr>
                          <Tr>
                            <Td>考える ➡️ 考えた</Td>
                            <Td>貸す ➡️ 貸した</Td>
                            <Td>来る ➡️ 来た</Td>
                          </Tr>
                          <Tr>
                            <Td>起きる ➡️ 起きた</Td>
                            <Td>泳ぐ ➡️ 泳いだ</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>着る ➡️ 着た</Td>
                            <Td>話す ➡️ 話した</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>いる ➡️ いた</Td>
                            <Td>買う ➡️ 買った</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>出る ➡️ 出た</Td>
                            <Td>飲む ➡️ 飲んだ</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>教える ➡️ 教えた</Td>
                            <Td>遊ぶ ➡️ 遊んだ</Td>
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
                      Past tense of the negative verbs
                    </Text>
                  </Box>
                  <Text fontSize={"20px"}>
                    First, change the verb to the negative form (ending in
                    ”ない”) and change ”い” to ”かった”.
                  </Text>
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
                            <Td>食べる ➡️ 食べなかった</Td>
                            <Td>触る ➡️ 触らなかった</Td>
                            <Td>する ➡️ しなかった</Td>
                          </Tr>
                          <Tr>
                            <Td>考える ➡️ 考えなかった</Td>
                            <Td>貸す ➡️ 貸さなかった</Td>
                            <Td>来る ➡️ こなかった</Td>
                          </Tr>
                          <Tr>
                            <Td>起きる ➡️ 起きなかった</Td>
                            <Td>泳ぐ ➡️ 泳がなかった</Td>
                            <Td>ある ➡️ なかった</Td>
                          </Tr>
                          <Tr>
                            <Td>着る ➡️ 着なかった</Td>
                            <Td>話す ➡️ 話さなかった</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>いる ➡️ いなかった</Td>
                            <Td>買う ➡️ 買わなかった</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>出る ➡️ 出なかった</Td>
                            <Td>飲む ➡️ 飲まなかった</Td>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td>教える ➡️ 教えなかった</Td>
                            <Td>遊ぶ ➡️ 遊ばなかった</Td>
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
                query: { section: LessonSection.verbConjugation, unit: 2 },
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
