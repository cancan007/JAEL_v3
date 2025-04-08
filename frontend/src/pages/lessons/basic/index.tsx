import {
  Box,
  Button,
  Container,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import WholeBasicLayout from "../../../components/layout/WholeLayout";
import { alphabetColor, hiragana, katakana } from "../../../utils/alphabets";
const { useSpeechSynthesis } = require("react-speech-kit");
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BsSkipStartCircle, BsStopCircle } from "react-icons/bs";
import { BasicLessonTestModal } from "../../../components/modal/BasicLessonTestModal";

const BasicLesson: React.FC = () => {
  const [alphabetType, setAlphabetType] = useState<"hiragana" | "katakana">(
    "hiragana"
  );
  const [windowWidth, setWindowWidth] = useState<number>(900);
  const [count, setCount] = useState<number>(-1);
  const { speak } = useSpeechSynthesis();
  const alphabet: any = useMemo(() => {
    return alphabetType === "hiragana" ? hiragana : katakana;
  }, [alphabetType]);

  const boxSize = useMemo(() => {
    if (windowWidth > 768) {
      const widthWithoutSpace = windowWidth - (8 + 6) * 9;
      const boxWidth = widthWithoutSpace / 10;
      return boxWidth > 72 ? 72 : boxWidth;
    }
    const widthWithoutSpace = windowWidth - (4 + 6) * 9;
    const boxWidth = widthWithoutSpace / 10;
    return boxWidth;
  }, [windowWidth]);

  const allAlphabetArray = useMemo(() => {
    let res: any[] = [];
    Object.keys(alphabet).map((key) => {
      res = [...res, ...alphabet[key]];
    });
    return res;
  }, [alphabet]);

  const activeLetter = useMemo(() => {
    if (count < 0) {
      return undefined;
    }
    return allAlphabetArray[count];
  }, [count, allAlphabetArray]);

  const intervalRef = useRef<any>(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((pre) => pre + 1);
    }, 1200);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(-1);
  }, []);

  const disclosureForTestModal = useDisclosure();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (count < 0) {
      return;
    }
    speak({ text: allAlphabetArray[count] });
    if (count === allAlphabetArray.length - 1) {
      setCount(-1);
    }
  }, [count]);
  return (
    <WholeBasicLayout
      styles={{
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <BasicLessonTestModal
        disclosure={disclosureForTestModal}
        alphabetType={alphabetType}
      />
      <Container maxW={"6xl"} mt={"64px"} mx={"0px"} px={"0px"}>
        <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
          <Box
            display={"flex"}
            flexDir={"row"}
            alignSelf={"flex-end"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            my={"12px"}
          >
            <Button
              justifySelf={"flex-start"}
              rounded={"10px"}
              px={"16px"}
              py={"8px"}
              borderWidth={"1px"}
              borderColor={"blue"}
              color={"blue"}
              _hover={{ bg: "blue", color: "white" }}
              onClick={() => disclosureForTestModal.onOpen()}
            >
              Test
            </Button>
            {!activeLetter && (
              <Icon
                mx={"8px"}
                as={BsSkipStartCircle}
                boxSize={"24px"}
                color={"red.400"}
                onClick={() => start()}
                _hover={{ color: "red.700" }}
              />
            )}
            {activeLetter && (
              <Icon
                mx={"8px"}
                as={BsStopCircle}
                boxSize={"24px"}
                color={"red.400"}
                onClick={() => stop()}
                _hover={{ color: "red.700" }}
              />
            )}
            <Select
              placeholder="Select option"
              w={"150px"}
              ml={"8px"}
              onChange={(e: any) => setAlphabetType(e.target.value)}
            >
              <option value="hiragana">Hiragana</option>
              <option value="katakana">Katakana</option>
            </Select>
          </Box>

          <SimpleGrid columns={10} spacing={"8px"}>
            {Object.keys(alphabet).map((key, index) => (
              <Box
                key={index}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                gap={windowWidth > 768 ? "8px" : "4px"}
              >
                {alphabet[key].map((v: string, i: number) => (
                  <Box
                    key={i}
                    p={`${boxSize * (16 / 72)}px`}
                    bg={alphabetColor[key]}
                    rounded={"4px"}
                    _hover={{ opacity: 0.5 }}
                    onClick={() => speak({ text: v })}
                    borderWidth={"3px"}
                    borderColor={activeLetter === v ? "blue.300" : "white"}
                  >
                    <Text fontSize={`${boxSize * (40 / 72)}px`}>{v}</Text>
                  </Box>
                ))}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </WholeBasicLayout>
  );
};

export default BasicLesson;
