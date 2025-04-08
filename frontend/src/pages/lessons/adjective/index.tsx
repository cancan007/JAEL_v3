import { Box, Icon, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import WholeBasicLayout from "../../../components/layout/WholeLayout";
import { useMemo, useState } from "react";

import { useAppSelector } from "../../../hooks/useGeneral";
import { useWindowSize } from "../../../hooks/window/useWindow";
import Lottie from "react-lottie";
import activeLessonIconData from "../../../lotties/active-lesson-icon.json";
import { CircleImageIcon } from "../../../components/common/CircleImageIcon";
import { FaArrowLeftLong } from "react-icons/fa6";
import rocketData from "../../../lotties/rocket.json";

const AdjectiveRoad: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth);

  const { width: windowWidth } = useWindowSize();

  const isSmallerThan578 = useMemo(() => {
    return windowWidth <= 578;
  }, [windowWidth]);

  const isSmallerThan768 = useMemo(() => {
    return windowWidth <= 768;
  }, [windowWidth]);

  const activeIconOptions = {
    loop: true,
    autoplay: true,
    animationData: activeLessonIconData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rocketOptions = {
    loop: true,
    autoplay: true,
    animationData: rocketData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [completedId, setCompletedId] = useState<number>(3);

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
        alignItems={isSmallerThan768 ? "center" : "center"}
        w={"100%"}
        h={"100vh"}
        m={0}
        overflowY={"scroll"}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"32px"}
          mt={"96px"}
          w={"80%"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={"12px"}
            px={isSmallerThan578 ? "8px" : "16px"}
            py={isSmallerThan578 ? "12px" : "24px"}
            w={!isSmallerThan768 ? "80%" : "100%"}
            color={"white"}
            rounded={"16px"}
            bg={"#CF84DB"}
          >
            <Box
              display={"flex"}
              flexDir={"row"}
              alignItems={"center"}
              gap={"16px"}
            >
              <Icon
                as={FaArrowLeftLong}
                w={"30px"}
                onClick={() => router.back()}
                cursor={"pointer"}
              />
              <Text fontSize={"16px"}>Section: Adjective</Text>
            </Box>
            <Text fontSize={isSmallerThan768 ? "20px" : "32px"}>
              Learn adjective that modify a noun to describe its nature or
              condition. Let’s develop even richer expressive power!
            </Text>
          </Box>
          <Box display={"flex"} flexDir={"row"} w={"80%"}>
            <Box w={"150px"}></Box>
            <Box
              pos={"relative"}
              zIndex={2}
              onClick={() => {
                router.push("/lessons/adjective/1");
              }}
            >
              <Box pos="absolute" left={"-42px"} top={"-76px"} zIndex={1}>
                {completedId === 1 && (
                  <Lottie
                    options={activeIconOptions}
                    height={228.8}
                    width={160}
                  />
                )}
              </Box>
              <CircleImageIcon
                src={
                  "https://res.cloudinary.com/dbfpsigax/image/upload/v1712659184/jael/greet_nex4rz.jpg"
                }
                size={77}
              />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"row"} w={"80%"}>
            <Box w={"100px"}></Box>
            <Box
              pos={"relative"}
              zIndex={2}
              onClick={() => {
                if (completedId < 2) return;
                router.push("/lessons/adjective/2");
              }}
            >
              <Box
                pos={"absolute"}
                right={isSmallerThan578 ? "-40vw" : "-35vw"}
                zIndex={1}
              >
                <Lottie
                  options={rocketOptions}
                  height={isSmallerThan578 ? 200 : 250}
                />
              </Box>
              <Box pos="absolute" left={"-42px"} top={"-76px"} zIndex={1}>
                {completedId === 2 && (
                  <Lottie
                    options={activeIconOptions}
                    height={228.8}
                    width={160}
                  />
                )}
              </Box>
              <CircleImageIcon
                src={
                  "https://res.cloudinary.com/dbfpsigax/image/upload/v1712659184/jael/greet_nex4rz.jpg"
                }
                size={77}
                inActive={completedId < 2 ? true : false}
              />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"row"} w={"80%"}>
            <Box w={"75px"}></Box>
            <Box
              pos={"relative"}
              zIndex={2}
              onClick={() => {
                if (completedId < 3) return;
                router.push("/lessons/adjective/3");
              }}
            >
              <Box pos="absolute" left={"-42px"} top={"-76px"} zIndex={1}>
                {completedId === 3 && (
                  <Lottie
                    options={activeIconOptions}
                    height={228.8}
                    width={160}
                  />
                )}
              </Box>
              <CircleImageIcon
                src={
                  "https://res.cloudinary.com/dbfpsigax/image/upload/v1712659184/jael/greet_nex4rz.jpg"
                }
                size={77}
                inActive={completedId < 3 ? true : false}
              />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"row"} w={"80%"}>
            <Box w={"100px"}></Box>
            <Box pos={"relative"}>
              <CircleImageIcon
                src={
                  "https://res.cloudinary.com/dbfpsigax/image/upload/v1712659184/jael/greet_nex4rz.jpg"
                }
                size={77}
                inActive={true}
              />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"row"} w={"80%"}>
            <Box w={"150px"}></Box>
            <Box pos={"relative"}>
              <CircleImageIcon
                src={
                  "https://res.cloudinary.com/dbfpsigax/image/upload/v1712659184/jael/greet_nex4rz.jpg"
                }
                size={77}
                inActive={true}
              />
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"row"} w={"80%"}>
            <Box w={"200px"}></Box>
            <Box pos={"relative"}>
              <CircleImageIcon
                src={
                  "https://res.cloudinary.com/dbfpsigax/image/upload/v1712659184/jael/greet_nex4rz.jpg"
                }
                size={77}
                inActive={true}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        position={"fixed"}
        top={"50px"}
        right={"30px"}
        bg={"#9E83EB"}
        filter={"auto"}
        blur={"200px"}
        width={350}
        h={200}
        zIndex={0}
      ></Box>
      <Box
        position={"fixed"}
        bottom={"50px"}
        right={"30px"}
        //opacity={0.5}
        bg={"#BA8EBB"}
        filter={"auto"}
        blur={"200px"}
        width={350}
        h={200}
      ></Box>
    </WholeBasicLayout>
  );
};

export default AdjectiveRoad;
