import { Box, Button, Icon, Progress, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../hooks/useGeneral";
import { useWindowSize } from "../../../hooks/window/useWindow";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { arrayShuffle } from "../../../utils/arrayShuffle";
import { DroppableArea } from "../../../components/Lesson/DroppableArea";
import { FaCheck, FaRegCheckCircle } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragableWordTab } from "../../../components/Lesson/DragableWordTab";
import { IoClose } from "react-icons/io5";
import WholeBasicLayout from "../../layout/WholeLayout";
import { useAPIPostSendLessonTestResult } from "../../../hooks/api/lesson/v2/useAPIPostSendLessonTestResult";

interface VerificationTestPage {
  testInfos: LessonTest;
}

const TestPage: React.FC<VerificationTestPage> = ({ testInfos }) => {
  const router = useRouter();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth);

  const { width: windowWidth } = useWindowSize();
  const [testIndex, setTestIndex] = useState<number>(0);

  const tests = useMemo(() => testInfos?.questions || [], [testInfos]);

  const progressValue = useMemo(() => {
    if (!tests) return 0;
    return (testIndex / tests?.length) * 100;
  }, [testIndex]);

  const sitems = useMemo(() => {
    return arrayShuffle(tests[testIndex]?.datas).map((v, i) => ({
      ...v,
      id: "0" + i.toString(),
    }));
  }, [testIndex]);

  const [shuffledItems, setShuffledItems] = useState<Array<any>>(sitems);
  const [selectedItems, setSelectedItems] = useState<Array<any>>([]);
  const [answer, setAnswer] = useState<string>();
  const [activeId, setActiveId] = useState<string>();
  const [misses, setMisses] = useState<Array<number>>([]);

  const isSmallerThan578 = useMemo(() => {
    return windowWidth <= 578;
  }, [windowWidth]);
  const isSmallerThan768 = useMemo(() => {
    return windowWidth <= 768;
  }, [windowWidth]);
  const isSmallerThan912Larger768 = useMemo(() => {
    return windowWidth <= 912 && windowWidth > 768;
  }, [windowWidth]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const { mutate: mutateSendTestResult } = useAPIPostSendLessonTestResult();

  const clickNext = () => {
    const isMissed =
      answer && tests[testIndex] && answer != tests[testIndex].answer;
    const score = (tests.length - misses.length) / tests.length;
    if (!tests) return 0;
    if (testIndex + 1 === tests?.length) {
      setIsFinished(true);
      mutateSendTestResult({
        section: testInfos.section,
        unit: testInfos.unit,
        score: isMissed ? (score - 1) * 100 : score * 100,
        misses: isMissed ? [...misses, tests[testIndex].id] : misses,
      });
      return;
    }
    if (isMissed) {
      setMisses((v) => [...v, tests[testIndex].id]);
    }
    setAnswer("");
    setTestIndex((state) => state + 1);
    setSelectedItems([]);
  };

  useEffect(() => {
    setShuffledItems(sitems);
  }, [sitems]);

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
      <Box
        p={0}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        w={"100vw"}
        mt={"80px"}
        color={"white"}
      >
        {isFinished ? (
          <Box
            pos={"fixed"}
            top={"35vh"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            gap={"16px"}
          >
            <Icon
              as={FaRegCheckCircle}
              w={"150px"}
              h={"150px"}
              color={"#FF5ED2"}
            ></Icon>
            <Text fontSize={"28px"} fontWeight={"semibold"} color={"#FF5ED2"}>
              Test Complete!
            </Text>
          </Box>
        ) : (
          <>
            <Progress
              hasStripe
              colorScheme={"pink"}
              value={progressValue}
              h={"25px"}
              w={"60vw"}
              rounded={"16px"}
            />
            <Text fontSize={"32px"} fontWeight={"semibold"} mt={"108px"}>
              {tests[testIndex]?.orderText
                ? tests[testIndex]?.orderText
                : "Please write this in Japanese"}
            </Text>
            <Box
              my={"64px"}
              rounded={"16px"}
              bg={"rgba(88, 88, 88, 0.5)"}
              p={"16px"}
              fontSize={"24px"}
            >
              {tests[testIndex]?.question}
            </Box>

            <DragDropContext
              //collisionDetection={closestCenter}
              onDragStart={(event) => {
                // ドラッグ中のIDを保存する
                setActiveId(event.draggableId);
              }}
              onDragEnd={(event) => {
                console.log(event);
                const { source, destination, draggableId } = event;
                if (
                  (!destination || destination.droppableId === "source") &&
                  source.droppableId === "droppable"
                ) {
                  setSelectedItems((state) =>
                    state.filter((s) => s.id !== draggableId)
                  );
                  setShuffledItems((state) => {
                    return [...state, sitems.find((s) => s.id === draggableId)];
                  });
                  return;
                } else if (
                  destination?.droppableId === "droppable" &&
                  source.droppableId === "source"
                ) {
                  setShuffledItems((state) =>
                    state.filter((s) => s.id !== draggableId)
                  );
                  setSelectedItems((state) => {
                    return [...state, sitems.find((s) => s.id === draggableId)];
                  });
                }
                if (
                  source.droppableId === "droppable" &&
                  destination?.droppableId === "droppable"
                ) {
                  const oldIndex = selectedItems.findIndex(
                    (item) => item.id === "0" + source.index.toString()
                  );
                  const newIndex = selectedItems.findIndex(
                    (item) => item.id === "0" + destination.index.toString()
                  );
                  const newItems = arrayMove(selectedItems, oldIndex, newIndex);
                  setSelectedItems(newItems);
                }
              }}
            >
              <DroppableArea
                children1={selectedItems}
                children2={[]}
              ></DroppableArea>

              {/*<SortableContext items={shuffledItems}>
            <Box
              mt={"40px"}
              display={"flex"}
              flexDir={"row"}
              gap={"8px"}
              flexWrap={"wrap"}
              maxW={"500px"}
              justifyContent={"space-evenly"}
            >
              {shuffledItems.map((v, i) => {
                return (
                  <SortableWordTab
                    key={i}
                    id={v.id.toString()}
                    word={v.data.word}
                    hidden={v.data.hidden}
                  />
                );
              })}
            </Box>
            </SortableContext>*/}
              <Droppable droppableId="source" direction="horizontal">
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    mt={"40px"}
                    display={"flex"}
                    flexDir={"row"}
                    gap={"8px"}
                    flexWrap={"wrap"}
                    maxW={"500px"}
                    justifyContent={"space-evenly"}
                  >
                    {shuffledItems.map((v, i) => {
                      return (
                        <DragableWordTab
                          key={v.id}
                          id={v.id}
                          index={i}
                          word={v.data.word}
                          hidden={v.data.hidden}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}

        {!answer ? (
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            borderTop={"1.5px solid #5D5353"}
            mt={"40px"}
            w={"100vw"}
            h={"147px"}
          >
            <Button
              py={"16px"}
              w={"160px"}
              rounded={"16px"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              border={"2px solid #5F5F5F"}
              color={"#5F5F5F"}
              bg={"transparent"}
            >
              Skip
            </Button>

            <Button
              py={"16px"}
              w={"160px"}
              rounded={"16px"}
              bg={"#FF5ED2"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"#040D2E"}
              onClick={() => {
                const res = selectedItems.map((s) => s.data.word).join("");
                setAnswer(res);
              }}
            >
              Send
            </Button>
          </Box>
        ) : isFinished ? (
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            borderTop={"1.5px solid #5D5353"}
            mt={"40px"}
            w={"100vw"}
            h={"147px"}
            pos={"fixed"}
            bottom={"0px"}
          >
            <Button
              py={"16px"}
              w={"160px"}
              rounded={"16px"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              border={"2px solid #5F5F5F"}
              color={"#5F5F5F"}
              bg={"transparent"}
            >
              Review
            </Button>

            <Button
              py={"16px"}
              w={"160px"}
              rounded={"16px"}
              bg={"#FF5ED2"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"#040D2E"}
              onClick={() => {
                router.push(`/lessons/${testInfos.section}`);
              }}
            >
              Continue
            </Button>
          </Box>
        ) : answer === tests[testIndex].answer ? (
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            bg={"#1A223F"}
            color={"white"}
            mt={"40px"}
            w={"100vw"}
            h={"147px"}
          >
            <Box display={"flex"} flexDir={"row"} gap={"16px"}>
              <Box
                display={"flex"}
                flexDir={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                rounded={100}
                w={"90px"}
                h={"90px"}
                bg={"#040D2E"}
              >
                <Icon as={FaCheck} w={"50px"} h={"38px"} color={"#FF5ED2"} />
              </Box>
              <Text fontSize={"24px"} fontWeight={"semibold"} color={"#D77FBF"}>
                Amazing! Keep it up!!
              </Text>
            </Box>

            <Button
              py={"16px"}
              w={"160px"}
              rounded={"16px"}
              bg={"#FF5ED2"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"#040D2E"}
              onClick={() => clickNext()}
            >
              Continue
            </Button>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            bg={"#1A223F"}
            color={"white"}
            mt={"40px"}
            w={"100vw"}
            h={"147px"}
          >
            <Box display={"flex"} flexDir={"row"} gap={"16px"}>
              <Box
                display={"flex"}
                flexDir={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                rounded={100}
                w={"90px"}
                h={"90px"}
                bg={"#040D2E"}
              >
                <Icon as={IoClose} w={"50px"} h={"38px"} color={"#FF4E4E"} />
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                gap={"4px"}
                color={"#FF4E4E"}
              >
                <Text fontSize={"24px"} fontWeight={"semibold"}>
                  Answer :
                </Text>
                <Text fontSize={"16px"} fontWeight={"semibold"}>
                  {tests[testIndex].answerForView || tests[testIndex].answer}
                </Text>
              </Box>
            </Box>

            <Button
              py={"16px"}
              w={"160px"}
              rounded={"16px"}
              bg={"#FF4E4E"}
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"#040D2E"}
              onClick={() => clickNext()}
            >
              Continue
            </Button>
          </Box>
        )}
      </Box>
    </WholeBasicLayout>
  );
};

export default TestPage;
