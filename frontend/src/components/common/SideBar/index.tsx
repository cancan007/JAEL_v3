import { Box, Icon, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdGroups } from "react-icons/md";

interface SideBarProps {
  isDrawer?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isDrawer }) => {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      h={"100vh"}
      w={"254px"}
      borderRight={isDrawer ? "none" : "1px solid #736666"}
    >
      <Image
        alt={"logo"}
        src={
          "https://res.cloudinary.com/dbfpsigax/image/upload/v1718449492/jael/JAEL_lxmbat.png"
        }
        w={"105px"}
        my={"35px"}
        cursor={"pointer"}
        onClick={() => router.push("/")}
      />
      <Box display={"flex"} flexDir={"column"} w={"100%"} px={"16px"}>
        <Link href="/lessons">
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            gap={"24px"}
            px={"16px"}
            py={"8px"}
            rounded={"16px"}
            border={
              router.pathname.includes("lesson") ? "1px solid #5792D7" : ""
            }
            bg={
              router.pathname.includes("lesson")
                ? "rgba(87, 146, 215, 0.1)"
                : ""
            }
          >
            <Icon
              as={AiOutlineHome}
              width={"36px"}
              height={"36px"}
              color="red"
            />
            <Text fontSize={"20px"} color={"white"}>
              Lesson
            </Text>
          </Box>
        </Link>
        <Link href="/dao">
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            gap={"24px"}
            px={"16px"}
            py={"8px"}
            rounded={"16px"}
            border={router.pathname.includes("dao") ? "1px solid #5792D7" : ""}
            bg={
              router.pathname.includes("dao") ? "rgba(87, 146, 215, 0.1)" : ""
            }
          >
            <Icon as={MdGroups} width={"36px"} height={"36px"} color="blue" />
            <Text fontSize={"20px"} color={"white"}>
              DAO
            </Text>
          </Box>
        </Link>
        <Link href={`/profile`}>
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            gap={"24px"}
            px={"16px"}
            py={"8px"}
            rounded={"16px"}
            border={
              router.pathname.includes("profile") ? "1px solid #5792D7" : ""
            }
            bg={
              router.pathname.includes("profile")
                ? "rgba(87, 146, 215, 0.1)"
                : ""
            }
          >
            <Icon
              as={CgProfile}
              width={"36px"}
              height={"36px"}
              color={"#C333C6"}
            />
            <Text fontSize={"20px"} color={"white"}>
              Profile
            </Text>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default SideBar;
