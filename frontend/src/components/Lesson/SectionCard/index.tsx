import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { MdOutlineWavingHand } from "react-icons/md";
import { IoIosRocket } from "react-icons/io";
import { memo, useMemo } from "react";
import { useWindowSize } from "../../../hooks/window/useWindow";
import { IconType } from "react-icons";

interface SectionCardProps {
  title: String;
  introduce: String;
  lessons: number;
  completed: number;
  icon: IconType;
  iconColor: string;
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
export const SectionCard: React.FC<SectionCardProps> = memo(
  ({ title, introduce, lessons, completed, icon, iconColor, onClick }) => {
    const { width: windowWidth } = useWindowSize();
    const isSmallerThan768 = useMemo(() => {
      return windowWidth <= 768;
    }, [windowWidth]);
    const isSmallerThan912Larger768 = useMemo(() => {
      return windowWidth <= 912 && windowWidth > 768;
    }, [windowWidth]);
    return (
      <Box
        display={"flex"}
        flexDir={!isSmallerThan768 ? "row" : "column"}
        alignItems={"center"}
        p={"32px"}
        gap={"32px"}
        rounded={"16px"}
        w={!isSmallerThan768 ? "90%" : "80%"}
        border={"1px solid #5F5F5F"}
        bg={"rgba(84, 84, 84, 0.3)"}
      >
        {!isSmallerThan912Larger768 && (
          <Box
            w={"160px"}
            h={"160px"}
            rounded={100}
            bg={"rgba(172, 255, 196, 0.3)"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Icon as={icon} w={"70px"} h={"70px"} color={iconColor} />
          </Box>
        )}

        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={isSmallerThan768 ? "center" : "flex-start"}
          gap={"40px"}
          maxW={"520px"}
        >
          <Text fontSize={"20px"} color={"white"} fontWeight={"semibold"}>
            {title}
          </Text>
          <Text fontSize={"16px"} color={"white"} fontWeight={"normal"}>
            {introduce}
          </Text>
          <Box
            w={"264px"}
            h={"25px"}
            rounded={"16px"}
            bg={"#110F25"}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              rounded={"16px"}
              bg={"#FF5ED2"}
              position={"absolute"}
              left={0}
              w={`${264 * (completed / lessons)}px`}
              h={"25px"}
            ></Box>
            <Text
              fontSize={"14px"}
              fontWeight={"medium"}
              color={"white"}
              zIndex={1}
            >
              {`${completed} / ${lessons}`}
            </Text>
            <Icon
              as={IoIosRocket}
              w={"30px"}
              h={"30px"}
              color={"white"}
              position={"absolute"}
              right={-2}
            />
          </Box>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"flex-end"}
        >
          <Button
            w={"152px"}
            py={"16px"}
            color={"#53CAFD"}
            fontSize={"20px"}
            fontWeight={"semibold"}
            rounded={"16px"}
            border={"1px solid #5F5F5F"}
            bg={"transparent"}
            onClick={onClick && (() => onClick())}
          >
            Go
          </Button>
        </Box>
      </Box>
    );
  }
);
