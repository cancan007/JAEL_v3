import {
  Box,
  Button,
  Container,
  ContainerProps,
  Text,
  useToast,
  Image,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../common/Header";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../hooks/useGeneral";
import { deleteAuth } from "../../../hooks/authenticate/useAuthInteractions";
import { useState } from "react";
import SelectAlert from "../../common/SelectAlert";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import SideBar from "../../common/SideBar";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/router";

interface WholeLayoutProps {
  styles?: ContainerProps;
  sideBarIs?: boolean;
  headerIs?: boolean;
  //onOpenLogin?: () => void;
  children: React.ReactNode;
}

const WholeBasicLayout: React.FC<WholeLayoutProps> = ({
  styles,
  sideBarIs,
  headerIs,
  //onOpenLogin,
  children,
}) => {
  const [isLogoutAlert, setIsLogoutAlert] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const logout = () => {
    setIsLogoutAlert(false);
    deleteAuth(dispatch);
    toast({
      description: "You succeeded to logout.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const auth = useAppSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container
      padding={"0px"}
      margin={"0px"}
      minH={"100vh"}
      minW={"100vw"}
      bg={"#040D2E"} //basic.cssでhtml自体に背景を指定しないと、スクロール時に白色が出てくるバグあり
      display={"flex"}
      flexDir={sideBarIs === false ? "column" : "row"}
      pos={"relative"}
    >
      {headerIs && (
        <>
          <Header
            styles={{
              width: "100vw",
              position: "absolute",
              backgroundColor: "#040D2E",
              height: "70px",
              paddingX: "16px",
              display: "flex",
              flexDir: "row",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 2,
              borderBottom: "1px solid #736666",
            }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dbfpsigax/image/upload/v1718449492/jael/JAEL_lxmbat.png"
              }
              width={"90px"}
              cursor={"pointer"}
              onClick={() => router.push("/")}
            />
            <Icon
              as={IoMenu}
              w={"50px"}
              h={"35px"}
              color={"white"}
              onClick={onOpen}
            />
          </Header>
          <Drawer
            isOpen={isOpen}
            placement={"left"}
            onClose={onClose}
            // finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg={"#040D2E"} zIndex={-1}>
              <DrawerCloseButton />
              <DrawerBody>
                <SideBar isDrawer={true} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}

      {/*<Header styles={{ position: "absolute", top: 0 }}>
        {auth ? (
          <>
            <Link href="/">
              <Text className="cursor-pointer hover:text-blue-500">Home</Text>
            </Link>
            <Link href="/lessons">
              <Text className="cursor-pointer hover:text-blue-500">
                Lessons
              </Text>
            </Link>
            <Link href="/dictionary">
              <Text className="cursor-pointer hover:text-blue-500">
                dictionary
              </Text>
            </Link>
            <Link href={`/profile`}>
              <Text className="cursor-pointer hover:text-blue-500">
                {auth.firstName} {auth.lastName}
              </Text>
            </Link>
            <Text
              onClick={() => {
                setIsLogoutAlert(true);
              }}
              className="cursor-pointer hover:text-pink-500"
            >
              Logout
            </Text>
          </>
        ) : (
          <Text
            onClick={() => onOpenLogin && onOpenLogin()}
            className="cursor-pointer hover:text-pink-500"
          >
            Login
          </Text>
        )}
      </Header>
      {isLogoutAlert && (
        <SelectAlert status="warning" title={"You really want to logout?"}>
          <Button
            onClick={() => setIsLogoutAlert(false)}
            className="hover:text-blue-500"
          >
            Cancel
          </Button>
          <Button onClick={() => logout()} className="hover:text-pink-500">
            Logout
          </Button>
        </SelectAlert>
      )}*/}
      {sideBarIs === false ? <></> : <SideBar />}

      <Box {...styles}>{children}</Box>
    </Container>
  );
};

export default WholeBasicLayout;
