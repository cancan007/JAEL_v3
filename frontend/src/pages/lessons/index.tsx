import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../components/layout/WholeLayout";
import { useMemo } from "react";
import { SectionCard } from "../../components/Lesson/SectionCard";
import { useWindowSize } from "../../hooks/window/useWindow";
import { IoLanguage } from "react-icons/io5";
import vervTests from "../../utils/tests/verb-conjugation/tests";
import adTests from "../../utils/tests/adjective/tests";

const LessonList: React.FC = () => {
  const router = useRouter();

  const { width: windowWidth } = useWindowSize();

  const isSmallerThan578 = useMemo(() => {
    return windowWidth <= 578;
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
        p={0}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        w={"100%"}
        h={"100vh"}
        m={0}
        overflowY={"scroll"}
        //mt={"64px"}
      >
        {/*<Box
          mt={"12px"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          alignSelf={"center"}
        >
          <Text fontSize={"40px"} mr={"4px"}>
            Lesson
          </Text>
          {user?.role === "author" && (
            <Icon
              as={AiOutlinePlus}
              boxSize={"40px"}
              p={0}
              m={0}
              color={"blue.500"}
              _hover={{ opacity: 0.5 }}
              onClick={() => disclosure.onOpen()}
            />
          )}
          <Button
            rounded={"10px"}
            px={"16px"}
            py={"8px"}
            borderWidth={"1px"}
            borderColor={"red"}
            color={"red"}
            _hover={{ bg: "red", color: "white" }}
            onClick={() =>
              router.push({
                pathname: `/lessons/basic`,
                //query: { title: lesson?.title },
              })
            }
          >
            Basic
          </Button>
          </Box>*/}

        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          mt={"80px"}
          gap={"64px"}
          w={"100%"}
        >
          <SectionCard
            title={"Verb Conjugation"}
            introduce={
              "Learn the funcdamental and important part of Japanse grammer of verbs."
            }
            lessons={vervTests.length}
            completed={1}
            icon={IoLanguage}
            iconColor={"rgba(172, 255, 196, 0.6)"}
            onClick={() =>
              router.push({
                pathname: "/lessons/verb-conjugation",
              })
            }
          />
          <SectionCard
            title={"Adjective"}
            introduce={
              "Learn adjective that modify a noun to describe its nature or condition. Let's develop even richer expressive power!"
            }
            lessons={adTests.length}
            completed={1}
            icon={IoLanguage}
            iconColor={"rgba(172, 255, 196, 0.6)"}
            onClick={() =>
              router.push({
                pathname: "/lessons/adjective",
              })
            }
          />
        </Box>
      </Box>
    </WholeBasicLayout>
  );
};

export default LessonList;
