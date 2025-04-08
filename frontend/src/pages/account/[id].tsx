import { Box, Container, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import WholeBasicLayout from "../../components/layout/WholeLayout";
import { useAPIGetUserById } from "../../hooks/api/user/useAPIGetUserById";

const Account: React.FC = () => {
  const router = useRouter();
  const { id: userId } = router.query as { id: string };
  const { data: user } = useAPIGetUserById(userId);
  const formattedBirthDate = useMemo(() => {
    if (!user?.birthDate) return "";
    const date = new Date(user?.birthDate);
    return `${date.getFullYear()} / ${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    } / ${date.getDay()}`;
  }, [user?.birthDate]);
  return (
    <WholeBasicLayout
      styles={{
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Container
        maxW={"768px"}
        mt={"64px"}
        mx={"0px"}
        px={"0px"}
        display={"flex"}
        flexDir={"column"}
        gap={"16px"}
      >
        <Box
          mt={"48px"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          gap={"12px"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"flex-start"}
            flex={1}
          >
            <Text fontSize={"16px"} lineHeight={"none"}>
              first name
            </Text>
            <Box
              mt={"4px"}
              w={"100%"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#767676"}>
                {user?.firstName}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"flex-start"}
            flex={1}
          >
            <Text fontSize={"16px"} lineHeight={"none"}>
              last name
            </Text>
            <Box
              mt={"4px"}
              w={"100%"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#767676"}>
                {user?.lastName}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"flex-start"}
          gap={"12px"}
        >
          <Box display={"flex"} flexDir={"column"} alignItems={"flex-start"}>
            <Text fontSize={"16px"} lineHeight={"none"}>
              gender
            </Text>
            <Box
              mt={"4px"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#767676"}>
                {user?.gender}
              </Text>
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"column"} alignItems={"flex-start"}>
            <Text fontSize={"16px"} lineHeight={"none"}>
              date of birth
            </Text>
            <Box
              mt={"4px"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#767676"}>
                {formattedBirthDate}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <Text fontSize={"16px"} lineHeight={"none"}>
            username
          </Text>
          <Box
            mt={"4px"}
            w={"100%"}
            rounded={"10px"}
            borderColor={"#BBBBBB"}
            borderWidth={"1px"}
            px={"16px"}
            py={"8px"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} lineHeight={"none"} color={"#767676"}>
              {user?.username}
            </Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <Text fontSize={"16px"} lineHeight={"none"}>
            introduction
          </Text>
          <Box
            mt={"4px"}
            w={"100%"}
            rounded={"10px"}
            borderColor={"#BBBBBB"}
            borderWidth={"1px"}
            px={"16px"}
            py={"8px"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Text
              fontSize={"16px"}
              lineHeight={"150%"}
              color={"#767676"}
              w={"100%"}
              whiteSpace={"pre-wrap"}
              minH={"150px"}
            >
              {user?.introduction}
            </Text>
          </Box>
        </Box>
      </Container>
    </WholeBasicLayout>
  );
};

export default Account;
